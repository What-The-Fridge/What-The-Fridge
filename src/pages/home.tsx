import { Box, Text } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from '../utils/createUrqlClient';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
	return (
		<Box>
			<Text>hello world</Text>
		</Box>
	);
};

export default withUrqlClient(createUrqlClient)(Home);
