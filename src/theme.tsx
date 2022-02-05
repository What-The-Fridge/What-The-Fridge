import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
	sm: '40em',
	md: '52em',
	lg: '64em',
	xl: '80em',
});

const styles = {
	global: (props: any) => ({
		body: {
			bg: mode('#f0e7db', '#1A202C')(props),
		},
	}),
};

const theme = extendTheme({
	colors: {
		black: '#16161D',
	},
	fonts,
	styles,
	breakpoints,
});

export default theme;
