import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import PlayGround from './pages/PlayGround.tsx';
import AuthLayout from './layout/Auth.layout.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';
import './App.css'
import App from './App.tsx';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
<Toaster position='top-right' />

const router = createBrowserRouter([
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login", Component: Login
      },
      { path: "register", Component: Register }
    ]
  },
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },

    ]
  },
  {
    path: "/play-ground",
    Component: PlayGround,
  },

]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster position='top-right' />
  </Provider>
)
