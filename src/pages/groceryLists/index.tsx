import { Box, Text, Center } from '@chakra-ui/layout';
import { Button, Select } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import {
	useDeleteGroceryListMutation,
	useGetUserGroceryListsQuery,
} from '../../generated/graphql';
import { useAppContext } from '../../utils/context';
import { createUrqlClient } from '../../utils/createUrqlClient';

interface GroceryListProps {}

export const GroceryList: React.FC<GroceryListProps> = ({}) => {
	const [rerenderTable, setRerenderTable] = useState(0);
	const [selectedGroceryList, setSelectedGroceryList] = useState(0);
	const value = useAppContext();
	const router = useRouter();
	const [, deleteGroceryList] = useDeleteGroceryListMutation();

	// user grocery lists
	let [{ data: userGroceryLists, fetching: fetchingGroceryLists }] =
		useGetUserGroceryListsQuery({
			variables: {
				userId: value[0].id,
			},
		});

	let allGroceryLists = userGroceryLists?.getUserGroceryLists.groceryLists
		? userGroceryLists?.getUserGroceryLists.groceryLists
		: [{ id: -1 }];

	let groceryListId = allGroceryLists[selectedGroceryList]?.id;

	const renderUserGroceryLists = () => {
		if (!userGroceryLists && fetchingGroceryLists)
			return <Text>Loading...</Text>;
		if (!userGroceryLists && !fetchingGroceryLists)
			return <Text>Errors getting your grocery lists</Text>;

		// TODO: There are other errors even if its a successful fetch
		if (userGroceryLists?.getUserGroceryLists.groceryLists?.length === 0)
			return (
				<Box display={'flex'} flexDirection="column" alignItems="center">
					<Text>
						You have no grocery lists yet, please create one to get started!
					</Text>
					<Button
						mt={8}
						colorScheme="teal"
						onClick={() => {
							router.push({
								pathname: `/groceryLists/createGroceryList`,
							});
						}}
					>
						Create a new grocery list +
					</Button>
				</Box>
			);

		return (
			<Box display={'flex'} flexDirection="row" alignItems="center">
				<Select
					variant="filled"
					onChange={(event: any) => {
						if (
							event.target.selectedOptions[0].value != 'createNewGroceryList'
						) {
							setSelectedGroceryList(event.target.selectedOptions[0].value);
						} else {
							router.push('/groceryLists/createGroceryList');
							event.target.selectedOptions[0].value = 0;
						}
					}}
				>
					{userGroceryLists?.getUserGroceryLists.groceryLists?.map(
						(element, index) => {
							return (
								<option value={index} key={index} selected={index === 0}>
									{element.name}
								</option>
							);
						}
					)}
					<option value={'createNewGroceryList'}>
						Create a new grocery list +{' '}
					</option>
				</Select>
				<Box ml={8}>
					<Button
						variant="outline"
						colorScheme="red"
						border="2px"
						onClick={async () => {
							await deleteGroceryList({ groceryListId: groceryListId })
								.then(response => {
									if (response.data?.deleteGroceryList.errors) {
										alert('error deleting!');
									} else if (response.data?.deleteGroceryList.success) {
										// upon successful deleting a grocery list
										alert('successful!');
										// reload to show the user the latest changes
										router.reload();
									}
								})
								.catch(error => {
									alert('error!' + error.toString());
								});
						}}
					>
						Delete Grocery List
					</Button>
				</Box>
			</Box>
		);
	};

	return (
		<Layout path={'/groceryLists'}>
			<Center>{renderUserGroceryLists()}</Center>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(GroceryList);
