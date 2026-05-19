import { Outlet, useNavigate } from 'react-router'
import Header from './components/header'
import useAxiosInterceptor from './hooks/useAxiosInterceptor';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import api from './Api';

function App() {

  useAxiosInterceptor();


  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
