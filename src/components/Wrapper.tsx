import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
	variant?: 'small' | 'regular';
}

export const Wrapper: React.FC<WrapperProps> = ({
	children,
	variant = 'regular',
}) => {
	return (
		<Box
			mt={8}
			mx="auto"
			maxW={variant === 'regular' ? '800px' : '400px'}
			w="100%"
			textAlign="center"
		>
			{children}
		</Box>
	);
};
