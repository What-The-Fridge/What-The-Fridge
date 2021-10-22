import logo from './logo.svg';
import cat from './cat.jpg';
import './App.css';
import GoogleLogin from 'react-google-login';

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
				<button>
					<a
						className="App-link"
						href="https://www.instagram.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Click Me!
					</a>
				</button>
				<img src={cat} className="App-logo" alt="logo" />
				{/* <Button>click me!</Button> */}
			</header>
		</div>
	);
}

export default App;
