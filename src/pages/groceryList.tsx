import { Box, Text } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Layout } from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';

interface GroceryListProps {}

export const GroceryList: React.FC<GroceryListProps> = ({}) => {
	return (
		<Layout path={'/groceryList'}>
			<Box>
				<Text>Grocery List</Text>
			</Box>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(GroceryList);
