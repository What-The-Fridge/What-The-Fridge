import { withUrqlClient } from 'next-urql';
import React from 'react';
import { useByeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface byeProps {}

export const Bye: React.FC<byeProps> = ({}) => {
	const [{ data, fetching, error }] = useByeQuery();

	if (fetching) {
		return <div>loading...</div>;
	}

	if (error) {
		console.error(error);
		return <div>err</div>;
	}

	if (!data) {
		return <div>no data</div>;
	}

	return <div>{data}</div>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Bye);
