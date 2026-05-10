import { Outlet } from 'react-router'
import Header from './components/header'
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
