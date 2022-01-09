import { Button, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useCreateUserMutation, UserInput } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp } from '../../components/Firebase';
import { useRouter } from 'next/router';
import { useAppContext } from '../../utils/context';

interface CreateAccountProps {}

export const CreateAccount: React.FC<CreateAccountProps> = ({}) => {
	const router = useRouter();
	const [, createUser] = useCreateUserMutation();
	const [user, loading, error] = useAuthState(getAuth(firebaseApp));
	const value = useAppContext();

	return (
		<Wrapper>
			<Formik
				initialValues={{ firstName: '', lastName: '' }}
				onSubmit={async values => {
					if (user) {
						let input: UserInput = {
							firebaseUserUID: user.uid,
							firstName: values.firstName,
							lastName: values.lastName,
							email: user.email!,
							imgUrl: user.photoURL,
						};
						const response = await createUser({ input: input });

						if (response.data?.createUser.errors) {
							console.log(
								'error creating account',
								response.data?.createUser.errors[0]
							);
						} else if (response.data?.createUser.user) {
							// upon successful creating an account
							router.push('/');
						}
					}
				}}
			>
				{props => {
					return (
						<Form>
							<Text>Finish setting up your account:</Text>
							<InputField
								name="firstName"
								placeholder="first name"
								label="First Name"
							></InputField>
							<InputField
								name="lastName"
								placeholder="last name"
								label="Last Name"
							></InputField>
							<Button
								mt={8}
								isLoading={props.isSubmitting}
								type="submit"
								colorScheme="teal"
							>
								Create Account
							</Button>
						</Form>
					);
				}}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(CreateAccount);
