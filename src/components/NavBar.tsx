import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { DarkModeSwitch } from './DarkModeSwitch';
import { getAuth, signOut, User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp } from './Firebase';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

interface NavbarProps {
	path: string;
}

interface NavLinkProps {
	href: string;
	children: any;
	toggleOn?: boolean;
}

interface NavigationMenuProps {
	path: string;
	logout: React.MouseEventHandler<HTMLButtonElement>;
	user: User | null | undefined;
}

const NavLink: React.FC<NavLinkProps> = (props): JSX.Element => {
	return (
		<NextLink href={props.href} passHref>
			<Link
				borderRadius="5px"
				bg={props.toggleOn ? '#dab692' : undefined}
				color={props.toggleOn ? '#8f5b34' : undefined}
				p={1}
			>
				{props.children}
			</Link>
		</NextLink>
	);
};

const NavigationMenu: React.FC<NavigationMenuProps> = (props): JSX.Element => {
	const router = useRouter();
	return (
		<Menu autoSelect={false}>
			<MenuButton
				as={IconButton}
				aria-label="Options"
				icon={<HamburgerIcon />}
				variant="outline"
			/>
			<MenuList>
				<MenuItem onClick={() => router.push('/fridges')}>
					<NavLink href={'/fridges'} toggleOn={props.path === '/fridges'}>
						My fridges
					</NavLink>
				</MenuItem>
				<MenuItem onClick={() => router.push('/groceryLists')}>
					<NavLink
						href={'/groceryLists'}
						toggleOn={props.path === '/groceryLists'}
					>
						Grocery list
					</NavLink>
				</MenuItem>
				<MenuItem onClick={() => router.push('/recipes')}>
					<NavLink href={'/recipes'} toggleOn={props.path === '/recipes'}>
						Recipes
					</NavLink>
				</MenuItem>
				<MenuDivider />
				<MenuItem>
					{props.user ? (
						<Button colorScheme="orange" onClick={props.logout}>
							Logout
						</Button>
					) : (
						<Button variant="outline" colorScheme="teal" border="2px">
							<NextLink href={'/account/login'} passHref>
								<Link>Login</Link>
							</NextLink>
						</Button>
					)}
				</MenuItem>
				<MenuItem>
					<DarkModeSwitch />
				</MenuItem>
			</MenuList>
		</Menu>
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
			zIndex={2} // must be the highest z-index
			bg={useColorModeValue('#8d9b6a', '#2F6D80')}
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

				<Stack
					direction={{ base: 'column', md: 'row' }}
					display={{ base: 'none', md: 'flex' }}
					spacing="20px"
					alignItems="center"
				>
					<NavLink href={'/fridges'} toggleOn={props.path === '/fridges'}>
						My fridges
					</NavLink>
					<NavLink
						href={'/groceryLists'}
						toggleOn={props.path === '/groceryLists'}
					>
						Grocery list
					</NavLink>
					<NavLink href={'/recipes'} toggleOn={props.path === '/recipes'}>
						Recipes
					</NavLink>

					{user ? (
						<Button
							variant="outline"
							colorScheme="orange"
							border="2px"
							onClick={logout}
						>
							Logout
						</Button>
					) : (
						<Button variant="outline" colorScheme="teal" border="2px">
							<NextLink href={'/account/login'} passHref>
								<Link>Login</Link>
							</NextLink>
						</Button>
					)}
					<DarkModeSwitch />
				</Stack>

				<Box flex={1} align="right">
					<Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
						<NavigationMenu path={props.path} logout={logout} user={user} />
					</Box>
				</Box>
			</Container>
		</Box>
	);
};
