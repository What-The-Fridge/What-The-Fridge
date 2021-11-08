import React from 'react';
import { useByeQuery } from '../generated/graphql';

interface byeProps {}

export const Bye: React.FC<byeProps> = ({}) => {
	const { data, error } = useByeQuery();

	return <div></div>;
};

export default Bye;
