import { dedupExchange, cacheExchange, fetchExchange } from '@urql/core';
import { getAccessToken } from '../components/accessToken';

export const createUrqlClient = (ssrExchange: any) => ({
	url: 'http://localhost:4000/graphql',
	fetchOptions: {
		credentials: 'include' as const,
		headers: {
			authorization: `Bearer 123456`,
		},
	},
	exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
