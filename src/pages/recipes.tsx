import { Box, Text } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Layout } from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';

interface RecipeProps {}

export const Recipes: React.FC<RecipeProps> = ({}) => {
	return (
		<Layout path={'/recipes'}>
			<Box>
				<Text>Recipes</Text>
			</Box>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(Recipes);
