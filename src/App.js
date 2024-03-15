import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import DashBoard from './pages/dashBoard/DashBoard';
import WorkArea from './components/WorkArea';
import Allstudents from './pages/allstudents/Allstudents';
import Marks from './components/Marks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Marksheet from './pages/marksheet/Marksheet';
import View from './pages/view/View';


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="dashboard" element={<DashBoard/>}>
          <Route path="" element={<WorkArea/>}/>
          <Route path="Allstudents" element={<Allstudents/>} />
          <Route path="marks" element={<Marksheet/>}/>
          <Route path="editOrAdd" element={<Marks/>}/>
          <Route path ="view" element={<View/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
