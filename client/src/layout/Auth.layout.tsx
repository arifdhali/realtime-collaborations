import { Outlet } from 'react-router'

const AuthLayout = () => {
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
