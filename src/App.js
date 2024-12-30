import './App.css';
import Layout from './components/Layout';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./components/Dashboard";
import { AuthContextProvider } from './context/AuthContext';
import Feedback from './components/Feedback';
import Analytics from './components/Analytics';
import Communications from './components/Communications';
import Customers from './components/Customers';



function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/communications' element={<Communications />} />
          <Route path='/customers' element={<Customers />} />
        </Routes>
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
