import logo from './logo.svg';
import './App.css';
import Board from './pages/Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the connect four game. Please choose your moves !!!
        </p>
      </header>
        <Board />
    </div>
  );
}

export default App;
