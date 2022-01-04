import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useCreateFridgeMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp } from '../../components/Firebase';
import { useAppContext } from '../../utils/context';

interface CreateFridgeProps {}

export const CreateFridge: React.FC<CreateFridgeProps> = ({}) => {
	const [, createFridge] = useCreateFridgeMutation();
	const [user, loading, error] = useAuthState(getAuth(firebaseApp));
	const value = useAppContext();

	console.log(value[0]);
	return (
		<Wrapper>
			<Formik
				initialValues={{ fridgeName: '' }}
				onSubmit={async values => {
					console.log(value[0].email);
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
