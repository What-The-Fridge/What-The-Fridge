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

interface CreateFridgeProps {}

export const CreateFridge: React.FC<CreateFridgeProps> = ({}) => {
	const [, createFridge] = useCreateFridgeMutation();
	const value = useAppContext();

	return (
		<Layout path={'/fridges/createFridge'}>
			<Wrapper>
				<Formik
					initialValues={{ fridgeName: '' }}
					onSubmit={async values => {
						await createFridge({
							ownerId: value[0].id,
							name: values.fridgeName,
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
									colorScheme="teal"
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
