// code snippet from React-Table package. minor modification has been done
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { Box, Button, Center, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { EditIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const Styles = styled.div`
	/* margin-top: 32px; */

	table {
		border-spacing: 0;
		border: 2px solid black;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}

		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 2px solid black;
			border-right: 2px solid black;

			:last-child {
				border-right: 0;
			}
		}
	}
`;

interface TableProps {
	columns: any;
	data: any;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
	// Use the state and functions returned from useTable to build your UI
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	// Render the UI for your table
	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, i) => {
					// console.log(row);
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								// console.log(cell);
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export interface TableData {
	img: null | undefined | string;
	name: string;
	quantity: number | string;
	unit?: string;
	daysLeftUntilExpiry?: number | string;
	id: number;
	infoId: number;
}

interface FridgeItemTableProps {
	data?: () => TableData[];
	rerenderTime: number;
	fridgeId: number;
}

const FridgeItemTable = (props: FridgeItemTableProps) => {
	const router = useRouter();

	const centeredText = (text: string) => {
		return (
			<div
				style={{
					textAlign: 'center',
				}}
			>
				{text}
			</div>
		);
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
						return (
							<div
								style={{
									textAlign: 'center',
								}}
							>
								<NextLink
									href={`/fridges/editFridgeItem?itemId=${props.row.original.id}&itemInfoId=${props.row.original.infoId}`}
									passHref
								>
									<Link>
										{props.row.original.name} <EditIcon />
									</Link>
								</NextLink>
							</div>
						);

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
			{
				Header: centeredText('Days left'),
				accessor: 'daysLeftUntilExpiry',
				Cell: (props: any) => {
					if (props.row.original.daysLeftUntilExpiry)
						return centeredText(props.row.original.daysLeftUntilExpiry);
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
			daysLeftUntilExpiry: 'N/A',
			id: 0,
			infoId: 0,
		},
	];

	const data = useMemo(props.data ? props.data : noData, []);

	useEffect(() => {}, []);
	return (
		<Box>
			<Center>
				<Box
					as="button"
					mr="8"
					mb="4"
					p="2"
					color="white"
					fontWeight="bold"
					borderRadius="md"
					bgGradient="linear(to-r, teal.500, green.500)"
					_hover={{
						bgGradient: 'linear(to-r, red.500, yellow.500)',
					}}
					onClick={() => {
						router.push({
							pathname: `/fridges/createFridgeItem`,
							query: { fridgeId: props.fridgeId },
						});
					}}
				>
					New Fridge Item
				</Box>

				<Box
					as="button"
					mr="8"
					mb="4"
					p="2"
					color="white"
					fontWeight="bold"
					borderRadius="md"
					bgGradient="linear(to-r, teal.500, green.500)"
					_hover={{
						bgGradient: 'linear(to-r, red.500, yellow.500)',
					}}
				>
					Delete Selected
				</Box>

				<Box
					as="button"
					mr="8"
					mb="4"
					p="2"
					color="white"
					fontWeight="bold"
					borderRadius="md"
					bgGradient="linear(to-r, teal.500, green.500)"
					_hover={{
						bgGradient: 'linear(to-r, red.500, yellow.500)',
					}}
				>
					Clear Fridge
				</Box>
			</Center>
			<Styles key={props.rerenderTime}>
				<Table columns={columns} data={data} key={props.rerenderTime} />
			</Styles>
		</Box>
	);
};

export default FridgeItemTable;
