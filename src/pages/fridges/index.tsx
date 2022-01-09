import { Box, Text, Link, Stack } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Wrapper } from '../../components/Wrapper';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useAppContext } from '../../utils/context';
import {
	DetailedFridgeItem,
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

interface FridgeItemProps {
	fridgeItem: DetailedFridgeItem;
}

const FridgeItem: React.FC<FridgeItemProps> = (props): JSX.Element => {
	console.log(props.fridgeItem.expiryDate);
	return (
		<Stack
			direction={{ base: 'column', md: 'row' }}
			display={{ base: 'none', md: 'flex' }}
			spacing="20px"
			alignItems="center"
		>
			<Text>{props.fridgeItem.name}</Text>
			<Text>
				{props.fridgeItem.quantity} {props.fridgeItem.measurementUnit}
			</Text>
			<Text>
				{props.fridgeItem.expiryDate
					? new Date(Number(props.fridgeItem.expiryDate)).toDateString()
					: 'no expiry date'}
			</Text>
		</Stack>
	);
};

export const Fridges: React.FC<CreateFridgeProps> = ({}) => {
	const [rerenderTable, setRendererTable] = useState(0);
	const [selectedFridge, setSelectedFridge] = useState(0);
	const value = useAppContext();
	const router = useRouter();
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

	let fridgeId = allFridges[selectedFridge].id;

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
			return <Text>You have no fridges</Text>;

		return (
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
		);
	};

	const formatTableData = () => {
		if (!fridgeItems && fetchingFridgeItems)
			return <Text mt={8}>Loading fridge items...</Text>;
		if (!fridgeItems && !fetchingFridgeItems && fridgeItemsError)
			return <Text mt={8}>Errors fridge items</Text>;

		// TODO: There are other errors even if its a successful fetch
		if (fridgeItems?.getFridgeFridgeItems.fridgeItems?.length === 0)
			return <Text mt={8}>This fridge is empty👀</Text>;

		let fetchedTableData: TableData[] = [];
		fridgeItems?.getFridgeFridgeItems.fridgeItems?.map(element => {
			fetchedTableData.push({
				img: element.imgUrl,
				name: element.name,
				quantity: element.quantity,
				unit: element.measurementUnit,
				daysLeftUntilExpiry: 3,
			});
		});

		return (
			<FridgeItemTable
				data={() => fetchedTableData}
				rerenderTime={selectedFridge}
			/>
		);
	};

	return (
		<Layout path={'/fridges'}>
			<Box display={'flex'} flexDirection="column" alignItems="center">
				{renderUserFridges()}
				<Wrapper>
					<Button
						colorScheme="teal"
						icon={<AddIcon />}
						onClick={() => {
							router.push({
								pathname: `/fridges/createFridgeItem`,
								query: { fridgeId: fridgeId },
							});
						}}
					>
						New fridge item 🍔
					</Button>
				</Wrapper>
			</Box>

			<Box
				key={rerenderTable}
				display={'flex'}
				flexDirection="column"
				alignItems="center"
			>
				{formatTableData()}
			</Box>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Fridges);
