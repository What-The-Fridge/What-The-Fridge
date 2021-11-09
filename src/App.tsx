import Router, { route } from 'next/dist/server/router';
import React, { useEffect, useState } from 'react';

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetch('http://localhost:4000/refresh_token', {
			method: 'POST',
			credentials: 'include',
		}).then(async x => {
			const data = await x.json();
			console.log(data);
			setLoading(false);
		});
	});
	if (loading) {
		return <div>loading...</div>;
	}
	return <div>hello there</div>;
};
