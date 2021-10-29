import '../styles/App.css';
import GoogleLogin from 'react-google-login';
import { useCookies } from 'react-cookie';
var CryptoJS = require('crypto-js');

require('dotenv').config(); // to read .env file

function App() {
	const [cookies, setCookie] = useCookies(['user']);

	// Encrypt the sessionId before storing into cookie
	function encryptAndCreateCookie(sessionId) {
		const encryptedSessionId = CryptoJS.AES.encrypt(
			sessionId,
			process.env.REACT_APP_ENCRYPTION_MESSAGE
		);
		console.log(encryptedSessionId);
		setCookie('sessionId', encryptedSessionId, {
			path: '/',
		});
	}

	// decrypt the sessionId in cookie
	function decryptCookie(encryptedSessionId) {
		return CryptoJS.AES.decrypt(
			encryptedSessionId,
			process.env.REACT_APP_ENCRYPTION_MESSAGE
		);
	}

	// send a POST request to google Oauth
	const handleLogin = async googleData => {
		try {
			const res = await fetch(
				`http://localhost:3001/google/login/${googleData.tokenId}`,
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
				encryptAndCreateCookie(data.sessionId);
				console.log(cookies);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getSession = async () => {
		// get cookie with key 'sessionId' natively because react-cookie is broken
		let encryptedSessionId = document.cookie.replace(
			/(?:(?:^|.*;\s*)sessionId\s*\=\s*([^;]*).*$)|^.*$/,
			'$1'
		);

		let sid = decryptCookie(encryptedSessionId);
		try {
			const res = await fetch(`http://localhost:3001/google/logout`, {
				method: 'DELETE',
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
				<button onClick={getSession}>log out</button>
			</header>
		</div>
	);
}

export default App;
