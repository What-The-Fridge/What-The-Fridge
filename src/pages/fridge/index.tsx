import { Box, Text } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from '../../utils/createUrqlClient';

interface CreateFridgeProps {}

export const CreateFridge: React.FC<CreateFridgeProps> = ({}) => {
	return (
		<Box>
			<Text>this is base</Text>
		</Box>
	);
};

export default withUrqlClient(createUrqlClient)(CreateFridge);
