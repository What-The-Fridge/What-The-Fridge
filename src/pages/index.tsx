import { Box, Link } from '@chakra-ui/layout';
import { Wrapper } from '../components/Wrapper';

const Index = () => (
	<div>
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
	</div>
);

export default Index;
