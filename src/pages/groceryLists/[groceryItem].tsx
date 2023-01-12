import { withUrqlClient } from 'next-urql';
import React, { useEffect, useState } from 'react';
import {
	useCreateGroceryItemMutation,
	useGetAllMeasurementTypesQuery,
	useGetGroceryItemByIdQuery,
	useUpdateGroceryItemMutation,
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
import { deleteImageByUrl } from '../../components/DeleteImageByUrl';

interface CreateGroceryItemProps {}
interface FormInitialValues {
	name: string;
	quantity: string;
	unit: string;
	upc: string;
	file: string;
}

export const CreateGroceryItem: React.FC<CreateGroceryItemProps> = ({}) => {
	const [, createGroceryItem] = useCreateGroceryItemMutation();
	const [, updateGroceryItem] = useUpdateGroceryItemMutation();
	const [rerenderForm, setRerenderForm] = useState(0);
	const [previousFileValue, setPreviousFileValue] = useState<string | null>(
		null
	);

	const [formInitialValues, setFormInitialValues] = useState<FormInitialValues>(
		{
			name: '',
			quantity: '1',
			unit: '1',
			upc: '',
			file: '',
		}
	);

	const value = useAppContext();
	const router = useRouter();
	const isCreation = router.query.groceryItem === 'createGroceryItem';

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
			data: groceryItemById,
			fetching: fetchingGroceryItemById,
			error: groceryItemByIdError,
		},
	] = useGetGroceryItemByIdQuery({
		variables: {
			getGroceryItemByIdId: router.query.itemId
				? parseInt(router.query.itemId as string)
				: 0,
		},
	});

	useEffect(() => {
		let detailedGroceryItem =
			groceryItemById?.getGroceryItemById.detailedGroceryItem;
		if (groceryItemById?.getGroceryItemById.errors === null) {
			setFormInitialValues({
				name: detailedGroceryItem?.name ? detailedGroceryItem?.name : '',
				quantity:
					detailedGroceryItem?.quantity !== undefined
						? detailedGroceryItem?.quantity.toString()
						: '1',
				unit:
					detailedGroceryItem?.measurementTypeId !== undefined
						? detailedGroceryItem?.measurementTypeId.toString()
						: '1',
				upc: detailedGroceryItem?.upc ? detailedGroceryItem?.upc : '',
				file: detailedGroceryItem?.imgUrl ? detailedGroceryItem?.imgUrl : '',
			});
			setRerenderForm(rerenderForm + 1);
			setPreviousFileValue(
				detailedGroceryItem?.imgUrl ? detailedGroceryItem?.imgUrl : null
			);
		}
	}, [groceryItemById, measurementTypes]);

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
			`groceryItems/${userEmail}/${file.name.replace(
				/[^a-zA-Z0-9]/g,
				''
			)}${currTime}`
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
		const groceryItemInput = {
			groceryListId: parseInt(router.query.groceryListId as string),
			measurementTypeId: parseInt(values.unit),
			name: values.name,
			quantity: parseInt(values.quantity),
			userId: value[0].id,
			imgUrl: imgUrl,
			upc: values.upc == '' ? null : values.upc,
		};

		// delete the previous image from firebase only if the image was updated
		if (!isCreation) await deleteImageByUrl(previousFileValue);

		// set the prev to the current image
		setPreviousFileValue(imgUrl);

		if (isCreation) {
			await createGroceryItem({
				input: groceryItemInput,
			}).then(response => {
				if (response.data?.createGroceryItem.errors) {
					alert('error!');
					setErrors(toErrorMap(response.data.createGroceryItem.errors));
				} else if (response.data?.createGroceryItem.groceryItem) {
					// upon successful creating an account
					alert('successful!');
				}
			});
		} else {
			await updateGroceryItem({
				input: groceryItemInput,
				// TODO: HANDLE CASES WHERE itemId is not passed
				groceryItemId: parseInt(router.query.itemId as string),
			}).then(response => {
				if (response.data?.updateGroceryItem.errors) {
					alert('error!');
					setErrors(toErrorMap(response.data.updateGroceryItem.errors));
				} else if (response.data?.updateGroceryItem.success) {
					// upon successful creating an account
					alert('successful!');
				}
			});
		}
	};

	// TODO: make this a loading component and reuse on other pages
	if (fetchingMeasurements && fetchingGroceryItemById) {
		return (
			<Layout path={`/groceryLists/createGroceryItem`}>
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
		<Layout path={`/groceryLists/createGroceryItem`}>
			<Center>
				{groceryItemByIdError && !isCreation ? (
					<Text>Error loading to-be-edited grocery item</Text>
				) : null}
			</Center>
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
									{isCreation ? 'Create new grocery item' : 'Edit grocery item'}
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
											.jpg, .gif, or .png. Max file size 10MiB.
										</Text>
									</Box>
								</VStack>
							</FieldGroup>
						</Stack>
						<FieldGroup mt="8">
							<HStack width="full">
								<Button
									type="submit"
									variant="outline"
									colorScheme="teal"
									border="2px"
									isLoading={props.isSubmitting}
								>
									{isCreation ? 'Submit' : 'Update'}
								</Button>
								<Button
									variant="outline"
									colorScheme="red"
									border="2px"
									onClick={() => {
										router.push('/groceryLists');
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

export default withUrqlClient(createUrqlClient)(CreateGroceryItem);
