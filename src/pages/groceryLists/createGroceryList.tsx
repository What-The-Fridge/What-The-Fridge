import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useCreateGroceryListMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useAppContext } from '../../utils/context';
import { Layout } from '../../components/Layout';
import { toErrorMap } from '../../components/ToErrorMap';
import { useRouter } from 'next/router';

interface CreateGroceryListProps {}

export const CreateGroceryList: React.FC<CreateGroceryListProps> = ({}) => {
	const [, createGroceryList] = useCreateGroceryListMutation();
	const value = useAppContext();
	const router = useRouter();

	return (
		<Layout path={'/groceryLists/createGroceryList'}>
			<Wrapper>
				<Formik
					initialValues={{ groceryList: '' }}
					onSubmit={async (values, { setErrors }) => {
						await createGroceryList({
							ownerId: value[0].id,
							name: values.groceryList,
						})
							.then(response => {
								if (response.data?.createGroceryList.errors) {
									alert('error!');
									setErrors(toErrorMap(response.data.createGroceryList.errors));
								} else if (response.data?.createGroceryList.groceryList) {
									// upon successful creating a grocery list
									alert('successful!');
									router.push('/groceryLists');
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
									name="groceryList"
									placeholder="groceryList's name"
									label="Grocery List's Name"
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

export default withUrqlClient(createUrqlClient)(CreateGroceryList);
