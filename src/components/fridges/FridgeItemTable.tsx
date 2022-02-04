// code snippet from React-Table package. minor modification has been done
import React, { useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useTable, useRowSelect, useBlockLayout } from 'react-table';
import {
	Box,
	Button,
	Center,
	Container,
	Divider,
	Image,
	Link,
	useColorMode,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { EditIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useSticky } from 'react-table-sticky';

interface TableStyleProps {
	isDark: boolean;
}

const Styles = styled.div<TableStyleProps>`
	.table {
		border: 1px solid #ddd;

		.tr {
			:last-child {
				.td {
					border-bottom: 0;
				}
			}
		}

		.th,
		.td {
			padding: 5px;
			border-bottom: 1px solid #ddd;
			border-right: 1px solid #ddd;
			${({ isDark }) =>
				isDark &&
				css`
					background: #222a3a;
				`}

			${({ isDark }) =>
				!isDark &&
				css`
					background: #fff;
				`}
			overflow: hidden;

			:last-child {
				border-right: 0;
			}
		}

		&.sticky {
			overflow: auto;
			.header,
			.footer {
				position: sticky;
				z-index: 1;
				width: fit-content;
			}

			.header {
				top: 0;
				/* box-shadow: 0px 3px 3px #ccc; */
			}

			.footer {
				bottom: 0;
				box-shadow: 0px -3px 3px #ccc;
			}

			.body {
				position: relative;
				z-index: 0;
			}

			[data-sticky-td] {
				position: sticky;
			}

			[data-sticky-last-left-td] {
				box-shadow: 2px 0px 3px #ccc;
			}

			[data-sticky-first-right-td] {
				box-shadow: -2px 0px 3px #ccc;
			}
		}
	}
`;

interface Props {
	indeterminate?: boolean;
}

const IndeterminateCheckbox = React.forwardRef<HTMLInputElement, Props>(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef =
			React.useRef() as React.MutableRefObject<HTMLInputElement>;
		const resolvedRef = ref || defaultRef;

		React.useEffect(() => {
			if (typeof resolvedRef === 'object' && resolvedRef.current) {
				resolvedRef.current.indeterminate = Boolean(indeterminate);
			}
		}, [resolvedRef, indeterminate]);

		return (
			<>
				<input type="checkbox" ref={resolvedRef} {...rest} />
			</>
		);
	}
);

interface TableProps {
	columns: any;
	data: any;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		state: { selectedRowIds },
	} = useTable(
		{
			columns,
			data,
		},
		useBlockLayout,
		useSticky,
		useRowSelect,
		hooks => {
			hooks.visibleColumns.push(columns => [
				// Let's make a column for selection
				{
					id: 'selection',
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<Center style={{ height: '100%' }}>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</Center>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						<Center style={{ height: '100%' }}>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</Center>
					),
				},
				...columns,
			]);
		}
	);

	// Render the UI for your table
	return (
		<div {...getTableProps()} className="table sticky" style={{ height: 500 }}>
			<div className="header">
				{headerGroups.map(headerGroup => (
					<div {...headerGroup.getHeaderGroupProps()} className="tr">
						{headerGroup.headers.map(column => (
							<div {...column.getHeaderProps()} className="th">
								{column.render('Header')}
							</div>
						))}
					</div>
				))}
			</div>
			<div {...getTableBodyProps()} className="body">
				{rows.map(row => {
					prepareRow(row);
					return (
						<div {...row.getRowProps()} className="tr">
							{row.cells.map(cell => (
								<div {...cell.getCellProps()} className="td">
									{cell.render('Cell')}
								</div>
							))}
						</div>
					);
				})}
			</div>
			{/* <div className="footer">
				{footerGroups.map(footerGroup => (
					<div {...footerGroup.getHeaderGroupProps()} className="tr">
						{footerGroup.headers.map(column => (
							<div {...column.getHeaderProps()} className="td">
								{column.render('Footer')}
							</div>
						))}
					</div>
				))}
			</div> */}
			<p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
			<pre>
				<code>
					{JSON.stringify(
						{
							selectedRowIds: selectedRowIds,
							'selectedFlatRows[].original': selectedFlatRows.map(
								d => d.original
							),
						},
						null,
						2
					)}
				</code>
			</pre>
		</div>
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
	const { colorMode, toggleColorMode } = useColorMode();
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
						return (
							<Center style={{ height: '100%' }}>
								<NextLink
									href={`/fridges/editFridgeItem?itemId=${props.row.original.id}&itemInfoId=${props.row.original.infoId}`}
									passHref
								>
									<Link>
										{props.row.original.name} <EditIcon />
									</Link>
								</NextLink>
							</Center>
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
			<Center mt={4}>
				<Button
					mb={4}
					mr={4}
					colorScheme="teal"
					border="2px"
					onClick={() => {
						router.push({
							pathname: `/fridges/createFridgeItem`,
							query: { fridgeId: props.fridgeId },
						});
					}}
				>
					Add fridge item
				</Button>
				<Button
					mb={4}
					variant="outline"
					colorScheme="red"
					border="2px"
					onClick={() => {}}
				>
					Delete Selected
				</Button>
			</Center>
			<Center>
				<Styles isDark={isDark} key={props.rerenderTime}>
					<Table columns={columns} data={data} key={props.rerenderTime} />
				</Styles>
			</Center>
		</Box>
	);
};

export default FridgeItemTable;
