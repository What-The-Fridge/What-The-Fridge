import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	HStack,
	Link,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Navbar } from './NavBar';
import { getAuth } from 'firebase/auth';
import {
	useAuthState,
	useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { firebaseApp } from './Firebase';
import { useGetUserInfoQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useAppContext } from '../utils/context';
import { CustomBreadcrumb } from './CustomBreadcrumb';
import { useEffect } from 'react';
import NextLink from 'next/link';

interface LayoutProps {
	path: string;
	children: JSX.Element[] | JSX.Element;
	disableAuth?: boolean;
}

export const Layout: React.FC<LayoutProps> = (props): JSX.Element => {
	const router = useRouter();
	const value = useAppContext();
	const [user] = useAuthState(getAuth(firebaseApp));
	const [signInWithEmailAndPassword, _, loading] =
		useSignInWithEmailAndPassword(getAuth(firebaseApp));
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
						<VStack spacing={8}>
							<Text>You're currently not logged in!</Text>
							<Center>
								<HStack>
									<Button variant="outline" colorScheme="teal" border="2px">
										<NextLink href={'/account/login'} passHref>
											<Link>Login</Link>
										</NextLink>
									</Button>
									<Text>or</Text>
									<Button variant="outline" colorScheme="teal" border="2px">
										<NextLink href={'/account/login'} passHref>
											<Link>Sign up</Link>
										</NextLink>
									</Button>
								</HStack>
							</Center>
							<Button
								m={4}
								type="submit"
								variant="outline"
								colorScheme="teal"
								border="2px"
								isLoading={loading}
								onClick={async () => {
									signInWithEmailAndPassword(
										process.env.NEXT_PUBLIC_FREE_ACCOUNT!,
										process.env.NEXT_PUBLIC_FREE_ACCOUNT_PW!
									);
								}}
							>
								Try out for fun (no account required)
							</Button>
						</VStack>
					</Center>
				)}
			</Box>
		</Flex>
	);
};
