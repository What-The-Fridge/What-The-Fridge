import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './pages/App';
import { CookiesProvider } from 'react-cookie';
require('dotenv').config();

ReactDOM.render(
	<React.StrictMode>
		<CookiesProvider>
			<App />
		</CookiesProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
