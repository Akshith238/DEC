import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/Home';
import Name from './components/Name';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/name" Component={Name} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
