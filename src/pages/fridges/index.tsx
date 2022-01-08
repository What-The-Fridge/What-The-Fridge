import { Box, Text, Link, Stack } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
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
import FridgeItemTable from '../../components/fridges/FridgeItemTable';

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
	const [selectedFridge, setSelectedFridge] = useState(0);
	const [tableData, setTableData] = useState(undefined);

	const value = useAppContext();
	let [{ data: userFridges, fetching: fetchingFridges }] =
		useGetUserFridgesQuery({
			variables: {
				userId: value[0].id,
			},
		});

	let allFridges = userFridges?.getUserFridges.fridges
		? userFridges?.getUserFridges.fridges
		: [{ id: -1 }];

	let [
		{
			data: fridgeItems,
			fetching: fetchingFridgeItems,
			error: fridgeItemsError,
		},
	] = useGetFridgeFridgeItemsQuery({
		variables: {
			fridgeId: allFridges[selectedFridge].id,
		},
	});

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
					console.log(event.target.selectedOptions[0].value);
					setSelectedFridge(event.target.selectedOptions[0].value);
				}}
			>
				{userFridges?.getUserFridges.fridges?.map((element, index) => {
					return (
						<option value={index} key={index}>
							{element.name}
						</option>
					);
				})}
			</Select>
		);
	};

	const renderFrigdeItems = () => {
		if (!fridgeItems && fetchingFridgeItems)
			return <Text>Loading fridge items...</Text>;
		if (!fridgeItems && !fetchingFridgeItems && fridgeItemsError)
			return <Text>Errors fridge items</Text>;

		// TODO: There are other errors even if its a successful fetch
		if (fridgeItems?.getFridgeFridgeItems.fridgeItems?.length === 0)
			return <Text>This fridge is empty</Text>;

		return (
			<Box>
				{fridgeItems?.getFridgeFridgeItems.fridgeItems?.map(element => {
					return <FridgeItem fridgeItem={element}></FridgeItem>;
				})}
			</Box>
		);
	};

	return (
		<Layout path={'/fridges'}>
			<Box display={'flex'} flexDirection="column" alignItems="center">
				{renderUserFridges()}
			</Box>
			<Box display={'flex'} flexDirection="column" alignItems="center">
				{renderFrigdeItems()}
			</Box>
			<Box display={'flex'} flexDirection="column" alignItems="center">
				<FridgeItemTable data={tableData} />
			</Box>
			<Wrapper>
				<Link color="teal" href="/fridges/createFridge">
					<Button colorScheme="teal" icon={<AddIcon />}>
						Create a Fridge +
					</Button>
				</Link>
			</Wrapper>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(Fridges);
