import { Outlet } from 'react-router'
import Header from './components/header'
import useAxiosInterceptor from './hooks/useAxiosInterceptor';

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
