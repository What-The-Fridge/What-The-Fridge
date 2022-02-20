import { dedupExchange, cacheExchange, fetchExchange } from '@urql/core';

export const createUrqlClient = (ssrExchange: any) => ({
	url: process.env.NEXT_PUBLIC_API_URL,
	fetchOptions: {
		credentials: 'include' as const,
		headers: {
			authorization: `Bearer 123456`,
		},
	},
	exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
