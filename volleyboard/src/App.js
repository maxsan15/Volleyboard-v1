import Court from './components/Court';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
      <Court />
      </div>
    </div>
  );
}

export default App;
