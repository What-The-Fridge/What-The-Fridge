import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import { AppWrapper } from '../utils/context';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<AppWrapper>
				<Component {...pageProps}></Component>
			</AppWrapper>
		</ChakraProvider>
	);
}

export default MyApp;
