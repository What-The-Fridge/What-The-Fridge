import React, { useEffect, useMemo, useState } from 'react';
import {
	useTable,
	useRowSelect,
	useBlockLayout,
	usePagination,
	useSortBy,
} from 'react-table';
import {
	Box,
	Button,
	Center,
	HStack,
	Image,
	Input,
	Select,
	useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSticky } from 'react-table-sticky';
import { useDeleteFridgeItemMutation } from '../../../generated/graphql';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import {
	FiChevronLeft,
	FiChevronRight,
	FiChevronsLeft,
	FiChevronsRight,
} from 'react-icons/fi';
import { Styles } from './TableStyles';

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

		return <input type="checkbox" ref={resolvedRef} {...rest} />;
	}
);

interface TableProps {
	columns: any;
	data: any;
	setSelectedRows: Function;
}

export const Table: React.FC<TableProps> = ({
	columns,
	data,
	setSelectedRows,
}) => {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		selectedFlatRows,
		state: { pageIndex, pageSize, selectedRowIds },
	} = useTable(
		{
			columns,
			data,
		},
		useSortBy,
		usePagination,
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
		<>
			<div {...getTableProps()} className="table sticky">
				{/* set selected rows */}
				{setSelectedRows(selectedFlatRows)}
				<div className="header">
					{headerGroups.map(headerGroup => (
						<div {...headerGroup.getHeaderGroupProps()} className="tr">
							{headerGroup.headers.map(column => (
								<div
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className="th"
								>
									<Center>
										{column.render('Header')}
										{column.id !== 'img' ? (
											<span>
												{column.isSorted ? (
													column.isSortedDesc ? (
														<FaSortDown />
													) : (
														<FaSortUp />
													)
												) : column.id !== 'selection' ? (
													<FaSort />
												) : (
													''
												)}
											</span>
										) : null}
										{/* Add a sort direction indicator */}
									</Center>
								</div>
							))}
						</div>
					))}
				</div>
				<div {...getTableBodyProps()} className="body">
					{page.map((row, i) => {
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
			</div>
			{/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
			<Center mt={8 / 2}>
				<HStack className="pagination">
					<Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						<FiChevronsLeft />
					</Button>{' '}
					<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
						<FiChevronLeft />
					</Button>{' '}
					<Button onClick={() => nextPage()} disabled={!canNextPage}>
						<FiChevronRight />
					</Button>{' '}
					<Button
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						<FiChevronsRight />
					</Button>{' '}
					<Box>
						Page{' '}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>{' '}
					</Box>
					<Box>
						| Go to page:{' '}
						<Input
							type="number"
							defaultValue={pageIndex + 1}
							onChange={e => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: '60px' }}
						/>
					</Box>{' '}
					<Box width="110px">
						<Select
							value={pageSize}
							onChange={e => {
								setPageSize(Number(e.target.value));
							}}
						>
							{[5, 10, 20, 30, 40, 50].map(pageSize => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</Select>
					</Box>
				</HStack>
			</Center>
		</>
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
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [, deleteFridgeItem] = useDeleteFridgeItemMutation();
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
							pathname: `/fridges/createFridgeItem`,
							query: { fridgeId: props.fridgeId },
						});
					}}
				>
					Add fridge item
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
							'fridgeItem',
							JSON.stringify(selectedRows[0].original)
						);
						router.push({
							pathname: `/fridges/editFridgeItem`,
							query: {
								fridgeId: props.fridgeId,
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
							deleteFridgeItem({ itemId: element.original.id })
								.then(response => {
									if (response.data?.deleteFridgeItem.errors) {
										alert('error!');
									} else if (response.data?.deleteFridgeItem.success) {
										// upon successful creating a fridge
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

export default FridgeItemTable;
