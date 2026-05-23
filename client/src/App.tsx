import { Outlet, useNavigate } from 'react-router'
import Header from './components/header'
 

function App() {

  // useAxiosInterceptor();

  return (
    <>
      {/* <Provider> */}
        <Header />
        <Outlet />
      {/* </Provider> */}
    </>
  )
}

export default App
