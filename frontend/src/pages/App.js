import '../styles/App.css';
import GoogleLogin from 'react-google-login';
require('dotenv').config(); // to read .env file

function App() {
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
		} catch (err) {
			console.log(err);
		}
	};

	const getSession = async () => {
		try {
			const res = await fetch(`http://localhost:3001/google/me`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
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
