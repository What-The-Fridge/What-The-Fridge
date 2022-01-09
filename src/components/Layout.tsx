import { Box, Center, Container, Flex, Text } from '@chakra-ui/react';
import { Navbar } from './NavBar';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp } from './Firebase';
import { useGetUserInfoQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useAppContext } from '../utils/context';
import { CustomBreadcrumb } from './CustomBreadcrumb';

interface LayoutProps {
	path: string;
	fridgeId?: number;
	children: JSX.Element[] | JSX.Element;
}

export const Layout: React.FC<LayoutProps> = (props): JSX.Element => {
	const router = useRouter();
	const value = useAppContext();
	const [user] = useAuthState(getAuth(firebaseApp));
	let paths: string[] | undefined = props.path.split('/').slice(1);

	if (paths.length === 1 && paths[0] === '') {
		paths = undefined;
	}

	let [{ data }] = useGetUserInfoQuery({
		variables: {
			firebaseUserUid: user?.uid!,
		},
	});

	if (user && data) {
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
			<Navbar path={paths ? `/${paths[0]}` : '/'} />
			<Box>
				{user ? (
					<Container maxW="container.sm" pt={16}>
						<CustomBreadcrumb paths={paths} />
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
