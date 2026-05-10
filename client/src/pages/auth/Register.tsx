import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router'

import * as yup from "yup";
import api from '../../Api';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const regSchema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  mobile: yup.string().matches(/^\d{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
  device_type: yup.string().oneOf(["web", "mobile"], "Device type must be either 'web' or 'mobile'").required("Device type is required"),
});

const Register = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  const refFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      device_type: ""
    },
    validateOnChange: false,
    validationSchema: regSchema,
    onSubmit: async (values) => {

      try {
        let res = await api.post("/auth/sign-up", values);
        if (res.data.success) {
          toast.success(res.data.message);
          refFormik.resetForm();
          navigate("/auth/login");
        }

      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  })
  useEffect(() => {
    let userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(userAgent);
    if (isMobile) {
      refFormik.setFieldValue("device_type", "mobile");
    } else {
      refFormik.setFieldValue("device_type", "web");
    }

  }, [])
  return (


    <div className="relative w-full max-w-md z-10">

      <div className="bg-surface-container border border-outline-variant rounded-xl p-padding-lg shadow-2xl backdrop-blur-md">
        <div className="mb-padding-lg text-center">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Initialize Workspace</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Join the collaborative engineering flow.</p>
        </div>
        <form onSubmit={refFormik.handleSubmit} className="space-y-padding-md">

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 ml-1" htmlFor="name">Full Name</label>
            <div className="relative">
              <input onChange={refFormik.handleChange} onBlur={refFormik.handleBlur} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-padding-md py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container code-glow transition-all" id="name" placeholder="Linus Torvalds" type="text" />
            </div>
            {
              refFormik.errors.name && (
                <p className="font-label-sm text-label-sm text-error">{refFormik.errors.name}</p>
              )
            }

          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 ml-1" htmlFor="email">Email Address</label>
            <input onChange={refFormik.handleChange} onBlur={refFormik.handleBlur} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-padding-md py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container code-glow transition-all" id="email" placeholder="engineer@devflow.io" type="email" />
            {
              refFormik.errors.email && (
                <p className="font-label-sm text-label-sm text-error">{refFormik.errors.email}</p>
              )
            }
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 ml-1" htmlFor="mobile">Mobile</label>
            <input maxLength={10} onChange={refFormik.handleChange} onBlur={refFormik.handleBlur} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-padding-md py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container code-glow transition-all" id="mobile" placeholder="1234567890" type="tel" />
            {
              refFormik.errors.mobile && (
                <p className="font-label-sm text-label-sm text-error mt-1">{refFormik.errors.mobile}</p>
              )
            }
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 ml-1" htmlFor="password">Password</label>
            <div className='relative'>
              <input onChange={refFormik.handleChange} onBlur={refFormik.handleBlur} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-padding-md py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container code-glow transition-all" id="password" placeholder="••••••••" type={passwordVisibility ? "text": "password"} />
              <span onClick={()=>setPasswordVisibility(!passwordVisibility)} className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-on-surface text-lg!">
                visibility
              </span>
            </div>
            {
              refFormik.errors.password && (
                <p className="font-label-sm text-label-sm text-error">{refFormik.errors.password}</p>
              )
            }
          </div>

          <button className="cursor-pointer w-full bg-primary-container text-on-primary-container py-3 rounded font-headline-md text-headline-md font-bold hover:opacity-90 active:opacity-80 transition-all shadow-lg flex items-center justify-center gap-padding-sm" type="submit">
            <span className="material-symbols-outlined">play_arrow</span>
            Create Account
          </button>
        </form>

        <div className="flex items-center my-padding-lg">
          <div className="flex-grow border-t border-outline-variant"></div>
          <span className="px-padding-md font-label-sm text-label-sm text-outline uppercase tracking-widest">or continue with</span>
          <div className="flex-grow border-t border-outline-variant"></div>
        </div>

        <div className="grid grid-cols-2 gap-padding-sm">
          <button className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded bg-surface hover:bg-surface-container-highest transition-colors font-label-sm text-label-sm text-on-surface">

            GitHub
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded bg-surface hover:bg-surface-container-highest transition-colors font-label-sm text-label-sm text-on-surface">
            <img alt="Google Logo" className="w-4 h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB5k1GthBBwaJ0S9zt1Ul_eThI9onzPvbAzZD80NGkAo2fGBfb7G00_MJR7ba5EpDGNLwNjJk1nABXYft9afChFHKmi07szJUBqYp3IEiz831c4rF4oFwqKhIWvYsHsDfBZVFG6p9L-pMsIk9yOuDA3TEUXvXh05oo7M_VD3ofyC7ixtyK280NJ4UVbD0v7uUfTuyuIzcdFqH92-ywFZ2V-2-aDEGf8FkOksTBU6DwPziM_Zd7C18ndojI7hgGzyiQQJdsiClq_E9t" />
            Google
          </button>
        </div>

        <div className="mt-padding-lg text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Already have an account?
            <Link className="text-primary ms-1 hover:underline font-bold" to="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-padding-lg flex items-center justify-center gap-padding-md opacity-60 overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-1 font-code-md text-[12px] text-secondary">
          <span className="material-symbols-outlined !text-[14px]">terminal</span>
          <span>Live Pair Coding</span>
        </div>
        <div className="w-1 h-1 bg-outline rounded-full"></div>
        <div className="flex items-center gap-1 font-code-md text-[12px] text-primary">
          <span className="material-symbols-outlined !text-[14px]">cloud_sync</span>
          <span>Remote Runtime</span>
        </div>
        <div className="w-1 h-1 bg-outline rounded-full"></div>
        <div className="flex items-center gap-1 font-code-md text-[12px] text-tertiary">
          <span className="material-symbols-outlined !text-[14px]">history</span>
          <span>Version History</span>
        </div>
      </div>
    </div>

  )
}

export default Register
