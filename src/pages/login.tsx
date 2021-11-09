import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import {
	accessToken,
	getAccessToken,
	setAccessToken,
} from '../components/accessToken';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

export const Login: React.FC<registerProps> = ({}) => {
	const [, login] = useLoginMutation();

	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async values => {
					console.log(values);
					const response = await login({
						email: values.username,
						password: values.password,
					});
					console.log(response);

					if (response && response.data) {
						setAccessToken(response.data.login.accessToken);
					}
					console.log(getAccessToken());
				}}
			>
				{props => (
					<Form>
						<InputField
							name="username"
							placeholder="username"
							label="Username"
						></InputField>
						<Box>
							<InputField
								name="password"
								placeholder="password"
								label="Password"
								type="password"
							></InputField>
						</Box>
						<Button
							mt={4}
							isLoading={props.isSubmitting}
							type="submit"
							colorScheme="teal"
						>
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
