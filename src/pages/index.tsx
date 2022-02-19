import { Text } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';
import { useAppContext } from '../utils/context';

const Index = () => {
	const value = useAppContext();

	return (
		<Layout path={'/'}>
			<Center>
				<Text>Welcome to What The Fridge, {value[0].firstName}</Text>
			</Center>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(Index);
