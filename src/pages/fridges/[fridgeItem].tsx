import { withUrqlClient } from 'next-urql';
import React, { useEffect, useState } from 'react';
import {
	useCreateFridgeItemMutation,
	useGetAllMeasurementTypesQuery,
	useGetFridgeItemByIdQuery,
	useUpdateFridgeItemMutation,
} from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useAppContext } from '../../utils/context';
import { Layout } from '../../components/Layout';
import {
	Box,
	Button,
	Center,
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
import { CustomDatePicker } from '../../components/CustomDatePicker';

interface CreateFridgeItemProps {}
interface FormInitialValues {
	name: string;
	quantity: string;
	unit: string;
	upc: string;
	file: string;
	purchasedDate: string;
	expiryDate: string;
}

export const CreateFridgeItem: React.FC<CreateFridgeItemProps> = ({}) => {
	const [, createFridgeItem] = useCreateFridgeItemMutation();
	const [, updateFridgeItem] = useUpdateFridgeItemMutation();
	const [rerenderForm, setRerenderForm] = useState(0);

	const [formInitialValues, setFormInitialValues] = useState<FormInitialValues>(
		{
			name: '',
			quantity: '1',
			unit: '1',
			upc: '',
			file: '',
			purchasedDate: '',
			expiryDate: '',
		}
	);

	const value = useAppContext();
	const router = useRouter();
	const isCreation = router.query.fridgeItem === 'createFridgeItem';

	let [
		{
			data: measurementTypes,
			fetching: fetchingMeasurements,
			error: measurementTypesError,
		},
	] = useGetAllMeasurementTypesQuery({
		variables: {},
	});

	// TODO: shouldn't execute this if router.query.itemId is undefined
	let [
		{
			data: fridgeItemById,
			fetching: fetchingFridgeItemById,
			error: fridgeItemByIdError,
		},
	] = useGetFridgeItemByIdQuery({
		variables: {
			getFridgeItemByIdId: router.query.itemId
				? parseInt(router.query.itemId as string)
				: 0,
		},
	});

	useEffect(() => {
		let detailedFridgeItem =
			fridgeItemById?.getFridgeItemById.detailedFridgeItem;
		if (fridgeItemById?.getFridgeItemById.errors === null) {
			setFormInitialValues({
				name: detailedFridgeItem?.name ? detailedFridgeItem?.name : '',
				quantity:
					detailedFridgeItem?.quantity !== undefined
						? detailedFridgeItem?.quantity.toString()
						: '1',
				unit:
					detailedFridgeItem?.measurementTypeId !== undefined
						? detailedFridgeItem?.measurementTypeId.toString()
						: '1',
				upc: detailedFridgeItem?.upc ? detailedFridgeItem?.upc : '',
				file: detailedFridgeItem?.imgUrl ? detailedFridgeItem?.imgUrl : '',
				purchasedDate: detailedFridgeItem?.purchasedDate
					? detailedFridgeItem?.purchasedDate
					: '',
				expiryDate: detailedFridgeItem?.expiryDate
					? detailedFridgeItem?.expiryDate
					: '',
			});
			setRerenderForm(rerenderForm + 1);
		}
	}, [fridgeItemById, measurementTypes]);

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

		return (
			<MeasurementUnitSelect
				units={measurements}
				defaultOption={parseInt(formInitialValues.unit)}
			/>
		);
	};

	const uploadFileToFirebase = async (file: File): Promise<null | string> => {
		let imgURL = null;
		if (!file) return imgURL;
		// TODO: find a better filter, this is when the input is not a file
		if (!file.size) return file as unknown as string;
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
			purchasedDate: string;
			expiryDate: string;
		},
		imgUrl: string | null,
		setErrors: any
	): Promise<void> => {
		const fridgeItemInput = {
			fridgeId: parseInt(router.query.fridgeId as string),
			measurementTypeId: parseInt(values.unit),
			name: values.name,
			quantity: parseInt(values.quantity),
			userId: value[0].id,
			imgUrl: imgUrl,
			upc: values.upc == '' ? null : values.upc,
			purchasedDate: values.purchasedDate == '' ? null : values.purchasedDate,
			expiryDate: values.expiryDate == '' ? null : values.expiryDate,
		};

		if (isCreation) {
			await createFridgeItem({
				input: fridgeItemInput,
			}).then(response => {
				if (response.data?.createFridgeItem.errors) {
					alert('error!');
					setErrors(toErrorMap(response.data.createFridgeItem.errors));
				} else if (response.data?.createFridgeItem.detailedFridgeItem) {
					// upon successful creating an account
					alert('successful!');
				}
			});
		} else {
			await updateFridgeItem({
				input: fridgeItemInput,
				// TODO: HANDLE CASES WHERE itemId is not passed
				fridgeItemId: parseInt(router.query.itemId as string),
			}).then(response => {
				console.log(response);
				if (response.data?.updateFridgeItem.errors) {
					alert('error!');
					setErrors(toErrorMap(response.data.updateFridgeItem.errors));
				} else if (response.data?.updateFridgeItem.success) {
					// upon successful creating an account
					alert('successful!');
				}
			});
		}
	};

	// TODO: make this a loading component and reuse on other pages
	if (fetchingMeasurements && fetchingFridgeItemById) {
		return (
			<Layout
				path={`/fridges/createFridgeItem`}
				fridgeId={parseInt(router.query.fridgeId as string)}
			>
				<Center>
					<Button
						isLoading
						loadingText="Loading"
						colorScheme="teal"
						variant="outline"
						spinnerPlacement="start"
					/>
				</Center>
			</Layout>
		);
	}

	return (
		<Layout
			path={`/fridges/createFridgeItem`}
			fridgeId={parseInt(router.query.fridgeId as string)}
		>
			<Formik
				key={rerenderForm}
				initialValues={formInitialValues}
				onSubmit={async (values, { setErrors }) => {
					// TODO: Validation for the users(Invalid inputs)
					let imgUrl = await uploadFileToFirebase(
						values.file as unknown as File
					);

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

									<CustomDatePicker
										label="Purchased date"
										setFieldValue={props.setFieldValue}
										name="purchasedDate"
										value="purchasedDate"
										infoPopOver={{
											header: 'Warning',
											body: 'Default purchased date is set today',
										}}
										selectedDate={
											formInitialValues.purchasedDate !== ''
												? new Date(parseInt(formInitialValues.purchasedDate))
												: undefined
										}
									/>

									<CustomDatePicker
										label="Expiry date"
										setFieldValue={props.setFieldValue}
										name="expiryDate"
										value="expiryDate"
										infoPopOver={{
											header: 'Warning',
											body: 'Default expiry date is set to 7 days from now',
										}}
										selectedDate={
											formInitialValues.expiryDate !== ''
												? new Date(parseInt(formInitialValues.expiryDate))
												: undefined
										}
									/>

									<Box>
										<HStack spacing="5">
											<FileUpload
												name="file"
												label="Image upload"
												accept="image/png, image/jpeg, image/gif"
												setFieldValue={props.setFieldValue}
												thumbnail={formInitialValues.file}
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
								<Button
									variant="outline"
									colorScheme="red"
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
