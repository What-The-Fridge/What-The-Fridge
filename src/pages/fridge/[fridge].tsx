import { Button, Text } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useCreateFridgeMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

interface CreateFridgeProps {}

export const CreateFridge: React.FC<CreateFridgeProps> = ({}) => {
	const [, createFridge] = useCreateFridgeMutation();

	return (
		<Wrapper>
			<Formik
				initialValues={{ fridgeName: "Hachi's Fridge" }}
				onSubmit={async () => {
					// make a new fridge aka send a request to our graphql Server

					await createFridge({
						ownerId: 1,
						name: "Hachi's Fridge 99999",
					});
				}}
			>
				{props => {
					return (
						<Form>
							<InputField
								name="fridge's name"
								placeholder="fridge's name"
								label="Fridge's Name"
							></InputField>
							<Button
								mt={4}
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
	);
};

export default withUrqlClient(createUrqlClient)(CreateFridge);
