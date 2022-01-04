import { Link } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useGetUserInfoQuery } from '../generated/graphql';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp } from '../components/Firebase';
import { useRouter } from 'next/router';
import { useAppContext } from '../utils/context';

const Index = () => {
	const router = useRouter();
	const value = useAppContext();
	const [user] = useAuthState(getAuth(firebaseApp));

	let [{ data, error: getUserInfoError }] = useGetUserInfoQuery({
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

	console.log(value[0]);

	return (
		<div>
			<Wrapper>
				<Link color="teal" href="/fridge/createFridge">
					Create a Fridge
				</Link>
			</Wrapper>
		</div>
	);
};

export default withUrqlClient(createUrqlClient)(Index);
