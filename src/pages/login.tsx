import React from 'react';
import { Box } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../components/Firebase';

// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/fridge/createfridge',
	// We will display Google as auth providers.
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
	return (
		<Box>
			<h1>My App</h1>
			<p>Please login:</p>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</Box>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
