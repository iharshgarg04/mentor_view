import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import DashBoard from './pages/dashBoard/DashBoard';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="dashboard" element={<DashBoard/>}/>
      </Routes>
    </div>
  );
}

export default App;
