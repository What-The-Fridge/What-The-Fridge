import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Center, Image, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDeleteGroceryItemMutation } from '../../../generated/graphql';
import { Table } from '../../fridges/FridgeItemTable/FridgeItemTable';
import { Styles } from '../../fridges/FridgeItemTable/TableStyles';

export interface TableData {
	img: null | undefined | string;
	name: string;
	quantity: number | string;
	unit?: string;
	id: number;
}

interface GroceryItemTableProps {
	data?: () => TableData[];
	rerenderTime: number;
	groceryListId: number;
}

const GroceryItemTable = (props: GroceryItemTableProps) => {
	const router = useRouter();
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [, deleteGroceryItem] = useDeleteGroceryItemMutation();
	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';

	const centeredText = (text: string) => {
		return <Center style={{ height: '100%' }}>{text}</Center>;
	};

	const columns = useMemo(
		() => [
			{
				Header: centeredText('Image'),
				accessor: 'img',
				disableFilters: true,
				Cell: (props: any) => {
					if (props.row.original.img)
						return (
							<Center>
								<Image
									src={props.row.original.img}
									maxWidth="200"
									maxHeight="200"
									alt="Player"
								/>
							</Center>
						);

					return centeredText('-');
				},
			},
			{
				Header: centeredText('Name'),
				accessor: 'name',
				Cell: (props: any) => {
					if (props.row.original.name)
						return centeredText(props.row.original.name);
					return centeredText('-');
				},
			},
			{
				Header: centeredText('Quantity'),
				accessor: 'quantity',
				Cell: (props: any) => {
					if (props.row.original.quantity && props.row.original.unit)
						return centeredText(
							`${props.row.original.quantity} ${props.row.original.unit}`
						);
					return centeredText('-');
				},
			},
		],
		[]
	);

	const noData = () => [
		{
			img: 'N/A',
			name: 'N/A',
			quantity: 'N/A',
			unit: 'N/A',
			id: 0,
			infoId: 0,
		},
	];

	const data = useMemo(props.data ? props.data : noData, []);

	useEffect(() => {}, []);

	return (
		<Box>
			<Center>
				<Styles isDark={isDark} key={props.rerenderTime}>
					<Table
						columns={columns}
						data={data}
						setSelectedRows={setSelectedRows}
						key={props.rerenderTime}
					/>
				</Styles>
			</Center>
			<Center mt={8 / 2}>
				<Button
					mb={8 / 2}
					mr={8 / 2}
					colorScheme="teal"
					border="2px"
					onClick={() => {
						router.push({
							pathname: `/groceryLists/createGroceryItem`,
							query: { groceryListId: props.groceryListId },
						});
					}}
				>
					Add grocery list item
				</Button>
				<Button
					mb={8 / 2}
					mr={8 / 2}
					disabled={selectedRows.length != 1}
					variant="outline"
					colorScheme="orange"
					border="2px"
					onClick={() => {
						localStorage.setItem(
							'groceryItem',
							JSON.stringify(selectedRows[0].original)
						);
						router.push({
							pathname: `/groceryLists/editGroceryItem`,
							query: {
								groceryListId: props.groceryListId,
								itemId: selectedRows[0].original.id,
							},
						});
					}}
				>
					Edit Selected
				</Button>
				<Button
					mb={8 / 2}
					disabled={selectedRows.length == 0}
					variant="outline"
					colorScheme="red"
					border="2px"
					onClick={() => {
						selectedRows.forEach(element =>
							deleteGroceryItem({ groceryItemId: element.original.id })
								.then(response => {
									if (response.data?.deleteGroceryItem.errors) {
										alert('error!');
									} else if (response.data?.deleteGroceryItem.success) {
										// upon successful creating a grocery list
										alert('successful!');
										// reload to show the user the latest changes
										router.reload();
									}
								})
								.catch(error => {
									alert('error!' + error.toString());
								})
						);
					}}
				>
					Delete Selected
				</Button>
			</Center>
		</Box>
	);
};

export default GroceryItemTable;
