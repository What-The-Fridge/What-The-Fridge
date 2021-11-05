import React from 'react';
import { Form, Formik } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
	const [, register] = useRegisterMutation();
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async values => {
					console.log(values);
					const response = await register({
						email: values.username,
						password: values.password,
					});
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
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
