import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<Component {...pageProps}></Component>
		</ChakraProvider>
	);
}

export default MyApp;
