import { Box, Center, Container, Flex, Text } from '@chakra-ui/react';
import { Navbar } from './NavBar';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp } from './Firebase';
import { useGetUserInfoQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useAppContext } from '../utils/context';

interface LayoutProps {
	path: string;
	children: JSX.Element[] | JSX.Element;
}

export const Layout: React.FC<LayoutProps> = (props): JSX.Element => {
	const router = useRouter();
	const value = useAppContext();
	const [user] = useAuthState(getAuth(firebaseApp));

	let [{ data }] = useGetUserInfoQuery({
		variables: {
			firebaseUserUid: user?.uid!,
		},
	});

	console.log(user);

	if (user && data) {
		console.log('here');
		if (data.getUserInfo.user) {
			// set global context
			value[1](data.getUserInfo.user);
		}

		if (data.getUserInfo.errors) {
			// move to home page
			router.push('/account/createAccount');
		}
	}

	return (
		<Flex flexDirection="column">
			<Navbar path={props.path} />
			<Box>
				{user ? (
					<Container maxW="container.sm" pt={20}>
						{props.children}
					</Container>
				) : (
					<Center pt={20}>
						<Text>You do not have permission to access this page.</Text>
					</Center>
				)}
			</Box>
		</Flex>
	);
};
