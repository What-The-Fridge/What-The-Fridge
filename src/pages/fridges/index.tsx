import { Box, Text, Center } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useAppContext } from '../../utils/context';
import {
	useDeleteFridgeMutation,
	useGetFridgeFridgeItemsQuery,
	useGetUserFridgesQuery,
} from '../../generated/graphql';
import { Button, Select } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import FridgeItemTable, {
	TableData,
} from '../../components/fridges/FridgeItemTable';
import { useRouter } from 'next/router';

interface CreateFridgeProps {}

export const Fridges: React.FC<CreateFridgeProps> = ({}) => {
	const [rerenderTable, setRendererTable] = useState(0);
	const [selectedFridge, setSelectedFridge] = useState(0);
	const value = useAppContext();
	const router = useRouter();
	const [, deleteFridge] = useDeleteFridgeMutation();

	// user fridges
	let [{ data: userFridges, fetching: fetchingFridges }] =
		useGetUserFridgesQuery({
			variables: {
				userId: value[0].id,
			},
		});

	let allFridges = userFridges?.getUserFridges.fridges
		? userFridges?.getUserFridges.fridges
		: [{ id: -1 }];

	let fridgeId = allFridges[selectedFridge]?.id;

	// fridge items
	let [
		{
			data: fridgeItems,
			fetching: fetchingFridgeItems,
			error: fridgeItemsError,
		},
		executeQuery,
	] = useGetFridgeFridgeItemsQuery({
		variables: {
			fridgeId: fridgeId,
		},
	});

	// re-run getFridgeItems hook
	const refresh = () => {
		// Refetch the query and skip the cache
		executeQuery({ requestPolicy: 'network-only' });
	};

	useEffect(() => {
		setRendererTable(rerenderTable + 1);
	}, [fridgeItems]);

	const renderUserFridges = () => {
		if (!userFridges && fetchingFridges) return <Text>Loading...</Text>;
		if (!userFridges && !fetchingFridges)
			return <Text>Errors getting your list of fridges</Text>;

		// TODO: There are other errors even if its a successful fetch
		if (userFridges?.getUserFridges.fridges?.length === 0)
			return (
				<Box display={'flex'} flexDirection="column" alignItems="center">
					<Text>
						You have no fridges yet, please create one to get started!
					</Text>
					<Button
						mt={8}
						colorScheme="teal"
						icon={<AddIcon />}
						onClick={() => {
							router.push({
								pathname: `/fridges/createFridge`,
							});
						}}
					>
						Create a new fridge +
					</Button>
				</Box>
			);

		return (
			<Box display={'flex'} flexDirection="row" alignItems="center">
				<Select
					onChange={(event: any) => {
						if (event.target.selectedOptions[0].value != 'createNewFridge') {
							setSelectedFridge(event.target.selectedOptions[0].value);
							refresh();
						} else {
							router.push('/fridges/createFridge');
							event.target.selectedOptions[0].value = 0;
						}
					}}
				>
					{userFridges?.getUserFridges.fridges?.map((element, index) => {
						return (
							<option value={index} key={index} selected={index === 0}>
								{element.name}
							</option>
						);
					})}
					<option value={'createNewFridge'}>Create a new fridge + </option>
				</Select>
				<Box ml={8}>
					<Button
						variant="outline"
						colorScheme="red"
						border="2px"
						icon={<AddIcon />}
						onClick={() => {
							deleteFridge({ fridgeId: fridgeId });
						}}
					>
						Delete Fridge
					</Button>
				</Box>
			</Box>
		);
	};

	const formatTableData = () => {
		if (!fridgeItems && fetchingFridgeItems)
			return <Text>Loading fridge items...</Text>;
		if (!fridgeItems && !fetchingFridgeItems && fridgeItemsError)
			return <Text>Errors getting fridge items</Text>;

		// TODO: There are other errors even if its a successful fetch
		if (fridgeItems?.getFridgeFridgeItems.fridgeItems?.length === 0)
			return <Text>This fridge is empty👀</Text>;

		let fetchedTableData: TableData[] = [];
		fridgeItems?.getFridgeFridgeItems.fridgeItems?.map(element => {
			fetchedTableData.push({
				img: element.imgUrl,
				name: element.name,
				quantity: element.quantity,
				unit: element.measurementUnit,
				daysLeftUntilExpiry: 3,
				id: element.id,
				infoId: element.fridgeItemInfoId,
			});
		});

		console.log(fetchedTableData);

		return (
			<FridgeItemTable
				data={() => fetchedTableData}
				rerenderTime={selectedFridge}
				fridgeId={fridgeId}
			/>
		);
	};

	return (
		<Layout path={'/fridges'}>
			<Center>{renderUserFridges()}</Center>

			<Box
				mt={8}
				key={rerenderTable}
				display={'flex'}
				flexDirection="column"
				alignItems="center"
			>
				{userFridges?.getUserFridges.fridges?.length !== undefined &&
				userFridges?.getUserFridges.fridges?.length > 0
					? formatTableData()
					: null}
			</Box>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Fridges);
