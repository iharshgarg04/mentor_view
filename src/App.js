import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import DashBoard from './pages/dashBoard/DashBoard';
import WorkArea from './components/WorkArea';
import Allstudents from './pages/allstudents/Allstudents';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="dashboard" element={<DashBoard/>}>
          <Route path="" element={<WorkArea/>}/>
          <Route path="Allstudents" element={<Allstudents/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
