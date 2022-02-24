import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useCreateFridgeMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useAppContext } from '../../utils/context';
import { Layout } from '../../components/Layout';
import { toErrorMap } from '../../components/ToErrorMap';
import { useRouter } from 'next/router';

interface CreateFridgeProps {}

export const CreateFridge: React.FC<CreateFridgeProps> = ({}) => {
	const [, createFridge] = useCreateFridgeMutation();
	const value = useAppContext();
	const router = useRouter();

	return (
		<Layout path={'/fridges/createFridge'}>
			<Wrapper>
				<Formik
					initialValues={{ fridgeName: '' }}
					onSubmit={async (values, { setErrors }) => {
						await createFridge({
							ownerId: value[0].id,
							name: values.fridgeName,
						})
							.then(response => {
								if (response.data?.createFridge.errors) {
									alert('error!');
									setErrors(toErrorMap(response.data.createFridge.errors));
								} else if (response.data?.createFridge.fridge) {
									// upon successful creating a fridge
									alert('successful!');
									router.push('/fridges');
								}
							})
							.catch(error => {
								alert('error!' + error.toString());
							});
					}}
				>
					{props => {
						return (
							<Form>
								<InputField
									name="fridgeName"
									placeholder="fridge's name"
									label="Fridge's Name"
								></InputField>
								<Button
									mt={8}
									isLoading={props.isSubmitting}
									type="submit"
									variant="outline"
									colorScheme="teal"
									border="2px"
								>
									Submit
								</Button>
							</Form>
						);
					}}
				</Formik>
			</Wrapper>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(CreateFridge);
