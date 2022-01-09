import { withUrqlClient } from 'next-urql';
import React from 'react';
import { useCreateFridgeItemMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useAppContext } from '../../utils/context';
import { Layout } from '../../components/Layout';
import {
	Box,
	Button,
	Heading,
	HStack,
	Image,
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

interface CreateFridgeItemProps {}

export const CreateFridgeItem: React.FC<CreateFridgeItemProps> = ({}) => {
	const [, createFridgeItem] = useCreateFridgeItemMutation();
	const value = useAppContext();
	const router = useRouter();

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
					// file: new FileList(),
				}}
				onSubmit={(values, actions) => {
					// TODO: Validation for the users(Invalid inputs)

					// console.log({
					// 	fileName: values.file.name,
					// 	type: values.file.type,
					// 	size: `${values.file.size} bytes`,
					// });

					createFridgeItem({
						input: {
							fridgeId: parseInt(router.query.fridgeId as string),
							measurementTypeId: parseInt(values.unit),
							name: values.name,
							quantity: parseInt(values.quantity),
							userId: value[0].id,
							imgUrl:
								'https://static.toiimg.com/thumb/75697881.cms?imgsize=2195010&width=800&height=800',
							upc: values.upc,
							expiryDate: null,
							purchasedDate: null,
						},
					}).then(response => {
						alert('submitted');
						if (response.data?.createFridgeItem.errors) {
							console.log(
								'error creating account',
								response.data?.createFridgeItem.errors[0]
							);
							alert('error!');
						} else if (response.data?.createFridgeItem.detailedFridgeItem) {
							console.log('here');
							// upon successful creating an account
							alert('successful!');
						}
					});
				}}
			>
				{props => (
					<Form>
						<Stack spacing="4" divider={<StackDivider />}>
							<Heading size="lg" as="h1" paddingBottom="4">
								Create new fridge item
							</Heading>
							<FieldGroup title="Required Info">
								<VStack width="full" spacing="6">
									<InputField
										name="name"
										placeholder="E.g. Eggs, milk, rice, etc."
										label="Item's Name"
									/>
									<InputField
										numberProps={{ min: 1, max: 999 }}
										name="quantity"
										placeholder="E.g. 1"
										label="Quantity"
										min={1}
										max={999}
									/>
									<MeasurementUnitSelect
										units={[
											{ name: 'Kg', id: 1 },
											{ name: 'L', id: 2 },
											{ name: 'N/A', id: 3 },
										]}
									/>
								</VStack>
							</FieldGroup>
							<FieldGroup title="Optional Info">
								<VStack direction="row" spacing="6" align="center" width="full">
									<InputField
										name="upc"
										placeholder="E.g. 056920124845"
										label="Barcode"
										maxLength={13}
									/>
									<Box>
										<HStack spacing="5">
											{/* <Button variant="ghost" colorScheme="red">
												Delete
											</Button> */}
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
								</VStack>
							</FieldGroup>
						</Stack>
						<FieldGroup mt="8">
							<HStack width="full">
								<Button type="submit" colorScheme="teal">
									Submit
								</Button>
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
