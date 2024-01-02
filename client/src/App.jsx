import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/indexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Layout from './components/Layout.jsx';
import './App.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={<IndexPage />} />
      <Route path='/login' index element={<LoginPage />} />
      <Route path='/register' index element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;

