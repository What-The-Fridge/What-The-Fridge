import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Link,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { DarkModeSwitch } from './DarkModeSwitch';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp } from './Firebase';

interface NavbarProps {
	path: string;
}

interface NavLinkProps {
	href: string;
	children: any;
	toggleOn: boolean;
}

const NavLink: React.FC<NavLinkProps> = (props): JSX.Element => {
	return (
		<NextLink href={props.href} passHref>
			<Link
				bg={props.toggleOn ? '#dab692' : undefined}
				color={props.toggleOn ? '#8f5b34' : undefined}
				pt={2}
			>
				{props.children}
			</Link>
		</NextLink>
	);
};

export const Navbar: React.FC<NavbarProps> = (props): JSX.Element => {
	const [user] = useAuthState(getAuth(firebaseApp));

	const logout = () => {
		signOut(getAuth(firebaseApp));
	};

	return (
		<Box
			pos="fixed"
			as="nav"
			w="100%"
			zIndex={1}
			bg={useColorModeValue('#8d9b6a', '#8a9ea7')}
		>
			<Container
				maxW="2xl"
				display="flex"
				align="center"
				wrap="wrap"
				justify="space-between"
				p={2}
				zIndex={1}
			>
				<Flex align="center" mr={5}>
					<Link href="/">
						<Heading as="h1" size="md">
							What The Fridge
						</Heading>
					</Link>
				</Flex>
				<Stack spacing="24px" direction={['row']}>
					<NavLink href={'/fridge'} toggleOn={props.path === '/fridge'}>
						My fridge
					</NavLink>
					<NavLink
						href={'/groceryList'}
						toggleOn={props.path === '/groceryList'}
					>
						Grocery list
					</NavLink>

					<NavLink href={'/recipes'} toggleOn={props.path === '/recipes'}>
						Recipes
					</NavLink>
					{user ? (
						<Button colorScheme="orange" onClick={logout}>
							Log out
						</Button>
					) : (
						<Button colorScheme="teal">
							<NextLink href={'/login'} passHref>
								<Link>Login</Link>
							</NextLink>
						</Button>
					)}
					<DarkModeSwitch />
				</Stack>
			</Container>
		</Box>
	);
};
