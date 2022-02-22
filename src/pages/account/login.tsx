import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { firebaseApp } from '../../components/Firebase';
import { getAuth } from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Wrapper } from '../../components/Wrapper';
import { Form, Formik } from 'formik';
import { InputField } from '../../components/InputField';
import { Button } from '@chakra-ui/react';

// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/',
	// We will display Google as auth providers.
	signInOptions: [
		{
			provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			fullLabel: 'Sign in with Google',
		},
	],
};

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
	const router = useRouter();
	const [submitted, setSubmitted] = useState(false);
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(getAuth(firebaseApp));

	useEffect(() => {
		const timeId = setTimeout(() => {
			// After 3 seconds set the submitted value to false
			setSubmitted(false);
		}, 3000);

		return () => {
			clearTimeout(timeId);
		};
	}, [submitted]);

	if (user) {
		router.push('/');
	}

	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={async values => {
					signInWithEmailAndPassword(values.email, values.password);
					setSubmitted(true);
				}}
			>
				{props => (
					<Form>
						<InputField
							name="email"
							placeholder="email"
							label="Email"
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
							m={4}
							isLoading={props.isSubmitting}
							type="submit"
							colorScheme="teal"
						>
							Login
						</Button>
						{submitted && loading ? <p>Loading...</p> : null}
						{submitted && error ? <p>{error.message}</p> : null}
					</Form>
				)}
			</Formik>
			<hr />
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
