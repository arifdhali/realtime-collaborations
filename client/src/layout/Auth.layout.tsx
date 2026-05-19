import { Outlet, useNavigate } from 'react-router'
import api from '../Api';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, stopLoading } from '../features/authSlice';

const AuthLayout = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const {  isAuthenticated } = useSelector((state) => state?.auth)
 
  useEffect(() => {

    async function restoreSession() {
      try {
        let user = await api.get("/auth/me");
        if (user.status == 200) {
          dispatch(setUser(user.data.data));
        }
      } catch (err) {
        toast.error(err.response.data.message);
        dispatch(stopLoading());

      }
    }

    restoreSession();
  }, [])
  if (isAuthenticated) {
    navigate("/play-ground");
    return;
  }

  return (
    <main className="flex-grow h-screen  flex items-center justify-center relative overflow-hidden px-padding-md py-padding-lg">

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary blur-[120px] rounded-full"></div>
      </div>

      <Outlet />

    </main>
  );

}

export default AuthLayout
