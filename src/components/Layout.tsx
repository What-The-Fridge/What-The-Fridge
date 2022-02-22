import { Box, Center, Container, Flex, Text } from '@chakra-ui/react';
import { Navbar } from './NavBar';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp } from './Firebase';
import { useGetUserInfoQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useAppContext } from '../utils/context';
import { CustomBreadcrumb } from './CustomBreadcrumb';
import { useEffect } from 'react';

interface LayoutProps {
	path: string;
	children: JSX.Element[] | JSX.Element;
	disableAuth?: boolean;
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
			// move to create account page
			router.push('/account/createAccount');
		}
	}

	useEffect(() => {
		// clear user info upon losing auth session
		if (user == null)
			value[1]({
				createdAt: '',
				email: '',
				firebaseUserUID: '',
				firstName: '',
				id: 0,
				imgUrl: '',
				lastName: '',
				tier: 0,
			});
	}, [user]);

	return (
		<Flex flexDirection="column">
			<Navbar path={paths ? `/${paths[0]}` : '/'} />
			<Box>
				{user || props.disableAuth ? (
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
