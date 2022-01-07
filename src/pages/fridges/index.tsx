import { Box, Text, Link } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Wrapper } from '../../components/Wrapper';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useAppContext } from '../../utils/context';
import {
	useGetFridgeFridgeItemsQuery,
	useGetUserFridgesQuery,
} from '../../generated/graphql';
import { Button, Select } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface CreateFridgeProps {}

// const Fridge =

export const Fridges: React.FC<CreateFridgeProps> = ({}) => {
	const [selectedFridge, setSelectedFridge] = useState(0);
	const value = useAppContext();
	let [{ data: userFridges, fetching: fetchingFridges }] =
		useGetUserFridgesQuery({
			variables: {
				userId: value[0].id,
			},
		});

	// if (
	// 	userFridges?.getUserFridges.fridges !== undefined &&
	// 	userFridges?.getUserFridges.fridges !== null &&
	// 	userFridges?.getUserFridges.fridges[selectedFridge] !== undefined &&
	// 	userFridges?.getUserFridges.fridges[selectedFridge] !== null
	// ) {
	// 	let [{ data, fetching }] = useGetFridgeFridgeItemsQuery({
	// 		variables: {
	// 			fridgeId: userFridges?.getUserFridges.fridges[selectedFridge].id,
	// 		},
	// 	});
	// 	console.log(userFridges?.getUserFridges.fridges[selectedFridge].id);
	// 	console.log(data);
	// }

	const renderUserFridges = () => {
		if (!userFridges && fetchingFridges) return <Text>Loading...</Text>;
		if (!userFridges && !fetchingFridges)
			return <Text>Errors getting your list of fridges</Text>;
		if (userFridges?.getUserFridges.fridges?.length === 0)
			return <Text>You have no fridges</Text>;

		return (
			<Select
				onChange={(event: any) => {
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

	return (
		<Layout path={'/fridges'}>
			<Box display={'flex'} flexDirection="column" alignItems="center">
				{renderUserFridges()}
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
