import '../styles/App.css';
import GoogleLogin from 'react-google-login';
import { useCookies } from 'react-cookie';
require('dotenv').config(); // to read .env file

function App() {
	const [cookies, setCookie] = useCookies(['user']);

	// save new cookie
	function handleCookie(sessionId) {
		setCookie('sessionId', sessionId, {
			path: '/',
		});
	}

	// send a POST request to google Oauth
	const handleLogin = async googleData => {
		try {
			const res = await fetch(
				`http://localhost:3001/google/authenticate/${googleData.tokenId}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await res.json();

			console.log(data);

			if (data) {
				handleCookie(data.sessionId);
				console.log(cookies);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getSession = async () => {
		// get cookie with key 'sessionId' natively because react-cookie is broken
		let sid = document.cookie.replace(
			/(?:(?:^|.*;\s*)sessionId\s*\=\s*([^;]*).*$)|^.*$/,
			'$1'
		);
		try {
			const res = await fetch(`http://localhost:3001/google/me`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					sid: sid,
				},
			});
			const data = await res.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
					buttonText="Log in with Google"
					onSuccess={handleLogin}
					onFailure={handleLogin}
					cookiePolicy={'single_host_origin'}
				/>
				<button onClick={getSession}>hello there</button>
			</header>
		</div>
	);
}

export default App;
