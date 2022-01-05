import { Box, Text, Link } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Layout } from '../../components/Layout';
import { Wrapper } from '../../components/Wrapper';
import { createUrqlClient } from '../../utils/createUrqlClient';

interface CreateFridgeProps {}

export const CreateFridge: React.FC<CreateFridgeProps> = ({}) => {
	return (
		<Layout path={'/fridge'}>
			<Box>
				<Text>Fridges</Text>
			</Box>
			<Wrapper>
				<Link color="teal" href="/fridge/createFridge">
					Create a Fridge
				</Link>
			</Wrapper>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(CreateFridge);
