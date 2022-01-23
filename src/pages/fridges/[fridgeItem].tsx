import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import {
	useCreateFridgeItemMutation,
	useDeleteFridgeItemMutation,
	useGetAllMeasurementTypesQuery,
} from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useAppContext } from '../../utils/context';
import { Layout } from '../../components/Layout';
import {
	Box,
	Button,
	Heading,
	HStack,
	Stack,
	StackDivider,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { FieldGroup } from '../../components/fridges/FieldGroup';
import { MeasurementUnitSelect } from '../../components/fridges/MeasurementUnitSelect';
import { Form, Formik } from 'formik';
import { InputField } from '../../components/InputField';
import { useRouter } from 'next/router';
import { FileUpload } from '../../components/FileUpload';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../../components/Firebase';
import { toErrorMap } from '../../components/ToErrorMap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled, { css, createGlobalStyle } from 'styled-components';

interface CreateFridgeItemProps {}

export const CreateFridgeItem: React.FC<CreateFridgeItemProps> = ({}) => {
	const [, createFridgeItem] = useCreateFridgeItemMutation();
	const [, deleteFridgeItem] = useDeleteFridgeItemMutation();
	const value = useAppContext();

	const router = useRouter();
	const isCreation = router.query.fridgeItem === 'createFridgeItem';
	console.log(isCreation);
	console.log(router.query);

	let [
		{
			data: measurementTypes,
			fetching: fetchingMeasurements,
			error: measurementTypesError,
		},
	] = useGetAllMeasurementTypesQuery({
		variables: {},
	});

	const renderUnits = () => {
		if (!measurementTypes && fetchingMeasurements)
			return <Text mt={8}>Loading available units...</Text>;
		if (!measurementTypes && !fetchingMeasurements && measurementTypesError)
			return <Text mt={8}>Error fetching units</Text>;

		// TODO: There are other errors even if its a successful fetch
		if (measurementTypes?.getAllMeasurementTypes.measurementTypes?.length === 0)
			return <Text mt={8}>There are no available measurement units👀</Text>;

		let measurements: {
			name: string;
			id: number;
		}[] = [];
		measurementTypes?.getAllMeasurementTypes.measurementTypes?.map(
			measurement => {
				measurements.push({
					name: measurement.measurementUnit,
					id: measurement.id,
				});
			}
		);

		return <MeasurementUnitSelect units={measurements} />;
	};

	const uploadFileToFirebase = async (file: File): Promise<null | string> => {
		let imgURL = null;
		if (!file) return imgURL;
		const userEmail = value[0].email;
		const currTime = Date.now();
		const storageRef = ref(
			storage,
			`fridgeItems/${userEmail}/${file.name}${currTime}`
		);
		const snapshot = await uploadBytes(storageRef, file);
		const downloadURL = await getDownloadURL(snapshot.ref);
		imgURL = downloadURL;
		return imgURL;
	};

	const handleSubmit = async (
		values: {
			name: string;
			quantity: string;
			unit: string;
			upc: string;
			file: string;
		},
		imgUrl: string | null,
		setErrors: any
	): Promise<void> => {
		await createFridgeItem({
			input: {
				fridgeId: parseInt(router.query.fridgeId as string),
				measurementTypeId: parseInt(values.unit),
				name: values.name,
				quantity: parseInt(values.quantity),
				userId: value[0].id,
				imgUrl: imgUrl,
				upc: values.upc == '' ? null : values.upc,
				expiryDate: null,
				purchasedDate: null,
			},
		}).then(response => {
			if (response.data?.createFridgeItem.errors) {
				alert('error!');
				setErrors(toErrorMap(response.data.createFridgeItem.errors));
			} else if (response.data?.createFridgeItem.detailedFridgeItem) {
				// upon successful creating an account
				alert('successful!');
			}
		});
	};

	const deleteFridgeItemSubmission = async () => {
		deleteFridgeItem({
			itemId: parseInt(router.query.itemId as string),
		}).then(response => {
			if (response.data?.deleteFridgeItem.errors) {
				alert('error deleting the item');
			} else if (response.data?.deleteFridgeItem.success) {
				alert('successfully deleted the item');
				router.push('/fridges');
			}
		});
	};

	const [startDate, setStartDate] = useState<Date | null>(new Date());

	const DatePickerWrapperStyles = createGlobalStyle`
		.colour-mode-style{
			color: black;
		}
	`;

	return (
		<Layout
			path={`/fridges/createFridgeItem`}
			fridgeId={parseInt(router.query.fridgeId as string)}
		>
			<Formik
				initialValues={{
					name: '',
					quantity: '1',
					unit: '1',
					upc: '',
					file: '',
				}}
				onSubmit={async (values, { setErrors }) => {
					// TODO: Validation for the users(Invalid inputs)
					let imgUrl = await uploadFileToFirebase(
						values.file as unknown as File
					);

					console.log('File available at', imgUrl);
					handleSubmit(values, imgUrl, setErrors);
				}}
			>
				{props => (
					<Form>
						<Stack spacing="4" divider={<StackDivider />}>
							<Box
								display="flex"
								flexDirection={'row'}
								justifyContent={'between'}
								width="full"
							>
								<Heading size="lg" as="h1" paddingBottom="4">
									{isCreation ? 'Create new fridge item' : 'Edit fridge item'}
								</Heading>
							</Box>
							<FieldGroup title="Required Info">
								<VStack width="full" spacing="6">
									<InputField
										name="name"
										placeholder="E.g. Eggs, milk, rice, etc."
										label="Item's Name"
									/>
									<InputField
										numberProps={{
											min: isCreation ? 1 : 0,
											max: 999,
										}}
										name="quantity"
										placeholder="E.g. 1"
										label="Quantity"
									/>
									{renderUnits()}
								</VStack>
							</FieldGroup>
							<FieldGroup title="Optional Info">
								<VStack direction="row" spacing="6" align="center" width="full">
									<InputField
										InfoPopOver={{
											header: 'Warning',
											body: 'Barcode is unique. Two items with the same barcode will share the same info!',
										}}
										name="upc"
										placeholder="E.g. 056920124845"
										label="Barcode"
										maxLength={13}
									/>

									<Box>
										<HStack spacing="5">
											<FileUpload
												name="file"
												label="Image upload:"
												accept="image/png, image/jpeg, image/gif"
												setFieldValue={props.setFieldValue}
											/>
										</HStack>
										<Text
											fontSize="sm"
											mt="3"
											color={useColorModeValue('gray.500', 'whiteAlpha.600')}
										>
											.jpg, .gif, or .png. Max file size 2MiB.
										</Text>
									</Box>

									<DatePicker
										className="colour-mode-style"
										selected={startDate}
										onChange={date => {
											setStartDate(date);
											console.log(date);
										}}
									/>
									<DatePickerWrapperStyles />
								</VStack>
							</FieldGroup>
						</Stack>
						<FieldGroup mt="8">
							<HStack width="full">
								<Button
									type="submit"
									colorScheme="teal"
									isLoading={props.isSubmitting}
								>
									{isCreation ? 'Submit' : 'Update'}
								</Button>
								{!isCreation ? (
									<Button
										onClick={() => {
											deleteFridgeItemSubmission();
										}}
										variant="outline"
										colorScheme="red"
										border="2px"
									>
										Delete
									</Button>
								) : null}
								<Button
									variant="outline"
									colorScheme="orange"
									border="2px"
									onClick={() => {
										router.push('/fridges');
									}}
								>
									Cancel
								</Button>
							</HStack>
						</FieldGroup>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(CreateFridgeItem);
