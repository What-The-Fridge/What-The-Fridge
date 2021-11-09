import { Box, Link } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { getAccessToken } from '../components/accessToken';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => (
	<div>
		{console.log(getAccessToken())}
		<Wrapper>
			<Link color="teal" href="/register">
				Register Account
			</Link>
		</Wrapper>
		<Wrapper>
			<Link color="teal" href="/login">
				Login
			</Link>
		</Wrapper>
		<Wrapper>
			<Link color="teal" href="/bye">
				Bye
			</Link>
		</Wrapper>
	</div>
);

export default withUrqlClient(createUrqlClient)(Index);
