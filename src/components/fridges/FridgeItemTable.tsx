// code snippet from React-Table package. minor modification has been done
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';

const Styles = styled.div`
	padding: 1rem;

	table {
		border-spacing: 0;
		border: 1px solid black;

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
			border-bottom: 1px solid black;
			border-right: 1px solid black;

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
}

interface FridgeItemTableProps {
	data?: () => TableData[];
	rerenderTime: number;
}

const FridgeItemTable: React.FC<FridgeItemTableProps> = props => {
	const columns = useMemo(
		() => [
			{
				Header: 'Image',
				accessor: 'img',
				disableFilters: true,
				Cell: (props: any) => (
					<img src={props.row.original.img} width={100} alt="Player" />
				),
			},
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Quantity',
				accessor: 'quantity',
			},
			{
				Header: 'Unit',
				accessor: 'unit',
			},
			{
				Header: 'Days left',
				accessor: 'daysLeftUntilExpiry',
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
		},
	];

	const data = useMemo(props.data ? props.data : noData, []);

	useEffect(() => {}, []);
	return (
		<Styles key={props.rerenderTime}>
			<Table columns={columns} data={data} key={props.rerenderTime} />
		</Styles>
	);
};

export default FridgeItemTable;
