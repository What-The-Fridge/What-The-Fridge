import React, { useEffect, useState } from 'react';
import { Center, Text } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../components/Firebase';
import { Wrapper } from '../../components/Wrapper';

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
			fullLabel: 'Sign up with Google',
		},
	],
};

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		const timeId = setTimeout(() => {
			// After 3 seconds set the submitted value to false
			setSubmitted(false);
		}, 3000);

		return () => {
			clearTimeout(timeId);
		};
	}, [submitted]);

	return (
		<Center>
			<Wrapper variant="small">
				<Text>Register your account using:</Text>
				<StyledFirebaseAuth
					uiConfig={uiConfig}
					firebaseAuth={firebase.auth()}
				/>
			</Wrapper>
		</Center>
	);
};

export default withUrqlClient(createUrqlClient)(Register);
