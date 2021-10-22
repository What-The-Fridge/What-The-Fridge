import '../styles/App.css';
import GoogleLogin from 'react-google-login';
require('dotenv').config(); // to read .env file

function App() {
	// send a POST request to google Oauth
	const handleLogin = async googleData => {
		const res = await fetch('/api/v1/auth/google', {
			method: 'POST',
			body: JSON.stringify({
				token: googleData.tokenId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		// store returned user somehow
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
			</header>
		</div>
	);
}

export default App;
