import logo from './logo.svg';
import cat from './cat.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. imagine day
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button>
          <a className="App-link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Click Me!</a>
        </button>
        <img src={cat} className="App-logo" alt="logo"/>
        {/* <Button>click me!</Button> */}
      </header>
    </div>
  );
}

export default App;
