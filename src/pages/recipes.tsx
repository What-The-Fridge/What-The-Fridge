import { Text } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Layout } from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';

interface RecipeProps {}

export const Recipes: React.FC<RecipeProps> = ({}) => {
	return (
		<Layout path={'/recipes'}>
			<Center>
				<Text>In development . . .</Text>
			</Center>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(Recipes);
