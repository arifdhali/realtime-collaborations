import { Link, useNavigate, } from 'react-router'
import * as yup from "yup";
import { useFormik } from 'formik';
import api from '../../Api';
import toast from 'react-hot-toast';
import { useState } from 'react';



const validationSchemas = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
})
const Login = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchemas,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        let res = await api.post("/auth/sign-in", values);
        if (res.data.success) {
          toast.success(res.data.message);
           navigate("/play-ground");
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  });


  return (
    <div className="relative z-10 w-full max-w-110 bg-surface-container border border-outline-variant rounded-lg p-padding-lg shadow-2xl">
      <div className="mb-padding-lg space-y-padding-xs text-center">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Welcome back</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Enter your credentials to access your workspace.</p>
      </div>

      <form onSubmit={loginFormik.handleSubmit} className="space-y-padding-md">
        <div className="space-y-padding-xs">
          <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="email">Email Address</label>
          <div className="relative">
            <input onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} value={loginFormik.values.email} className="py-3 w-full bg-surface-container-lowest border border-outline-variant rounded px-padding-md  font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container code-glow transition-all" id="email" placeholder="name@company.com" type="email" />
          </div>
          {
            loginFormik.errors.email && (
              <p className="font-label-sm text-label-sm text-error">{loginFormik.errors.email}</p>
            )
          }
        </div>
        <div className="space-y-padding-xs">
          <div className="flex justify-between items-center">
            <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">Password</label>
            <Link className="font-label-sm text-label-sm text-primary hover:underline" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} value={loginFormik.values.password} className="py-3 w-full bg-surface-container-lowest border border-outline-variant rounded px-padding-md  font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container code-glow transition-all" minLength={8} id="password" placeholder="••••••••" type={passwordVisibility ? "text" : "password"} />

            <span onClick={() => setPasswordVisibility(!passwordVisibility)} className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-on-surface text-lg!">
              {passwordVisibility ? "visibility_off" : "visibility"}
            </span>
          </div>
          {
            loginFormik.errors.password && (
              <p className="font-label-sm text-label-sm text-error">{loginFormik.errors.password}</p>
            )
          }
        </div>
        <div className="pt-padding-xs">
          <button className="w-full bg-primary-container text-on-primary-container py-padding-sm rounded font-headline-md text-headline-md font-bold hover:opacity-90 active:opacity-80 transition-all shadow-lg flex items-center justify-center gap-padding-sm" type="submit">
            <span className="material-symbols-outlined" data-icon="login">login</span>
            Login
          </button>
        </div>
      </form>

      <div className="my-padding-lg flex items-center gap-padding-md">
        <div className="grow h-px bg-outline-variant"></div>
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">or continue with</span>
        <div className="grow h-px bg-outline-variant"></div>
      </div>

      <div className="grid grid-cols-2 gap-padding-md">
        <button className="flex items-center justify-center gap-padding-sm py-padding-sm px-padding-md border border-outline-variant rounded bg-surface-container-high hover:bg-surface-variant transition-colors font-label-sm text-label-sm text-on-surface">
          <img alt="GitHub Logo" className="w-5 h-5 dark:invert" data-alt="A clean, minimalist vector representation of the GitHub Octocat logo in white against a transparent background, reflecting a professional software developer environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_Wcu2AexgISIuImDk_SNh6TgZwWQC5ekLfq6eAxur2hS8Z2E68ARAUPoy09HPNbE9y0ukLWcdZG1dxRlsX2mvfiRIYXe0kzb5NoZI3_A_S8b8X1JxYaJgSlZm5N76_Q19UQwO9h2wy538C_3jSweb_sP3H7eGviljM6qcd9UEUdHEm7DzQs5wEvgr5zJjlwI53M8Ezkrn6fTDb_WuzyXJFkCTIwBO88ER1lUDuHLOGAGcceVpnHcFn3XqPIAKnzQQuKYtdvlyH7M4" />
          GitHub
        </button>
        <button className="flex items-center justify-center gap-padding-sm py-padding-sm px-padding-md border border-outline-variant rounded bg-surface-container-high hover:bg-surface-variant transition-colors font-label-sm text-label-sm text-on-surface">
          <img alt="Google Logo" className="w-5 h-5" data-alt="A sharp, high-resolution vector of the Google 'G' icon with its signature brand colors, isolated on a dark professional background for a modern integrated development environment UI." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRiU30etJxFa75KbpklTus0-e6NSfeqdmK9EgSx3iGgHwk2CMHg8Kp_JpGOFK-FoIJMg71L-2Xb2LHLxfzI1LlT7pFaVLSHYhXzSyx1-lkG1mN06YkBPby9WfpjHJnIkMNjlnOeiPJUaSi5cMBAIfel7W7802onPuUXpYNEn07uolUqHPvznNP5L-iETPXpYvWvN4ikZqzH0Vme3eK7lemi-nKHQ4SNLX5G6XnMprw7iZxjgHibxF9mCBD_7bMIE5j3gQF_DraN7yc" />
          Google
        </button>
      </div>
      <div className="mt-padding-lg text-center">
        <p className="font-body-md text-body-md text-on-surface-variant">
          Don't have an account?
          <Link className="text-primary ms-1 font-bold hover:underline" to="/auth/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
