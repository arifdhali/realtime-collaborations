import React from 'react'
import { Link } from 'react-router'

const Register = () => {
  return (


    <div className="relative w-full max-w-md z-10">

      <div className="bg-surface-container border border-outline-variant rounded-xl p-padding-lg shadow-2xl backdrop-blur-md">
        <div className="mb-padding-lg text-center">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Initialize Workspace</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Join the collaborative engineering flow.</p>
        </div>
        <form className="space-y-padding-md">

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 ml-1" htmlFor="name">Full Name</label>
            <div className="relative">
              <input className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md px-padding-md py-3 rounded input-focus-ring transition-all placeholder:text-outline" id="name" placeholder="Linus Torvalds" type="text" />
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 ml-1" htmlFor="email">Email Address</label>
            <input className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md px-padding-md py-3 rounded input-focus-ring transition-all placeholder:text-outline" id="email" placeholder="engineer@devflow.io" type="email" />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 ml-1" htmlFor="password">Password</label>
            <input className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md px-padding-md py-3 rounded input-focus-ring transition-all placeholder:text-outline" id="password" placeholder="••••••••" type="password" />
            <p className="mt-2 text-[11px] text-on-surface-variant font-code-md">At least 12 characters recommended.</p>
          </div>

          <button className="w-full bg-primary-container text-on-primary-container py-padding-sm rounded font-headline-md text-headline-md font-bold hover:opacity-90 active:opacity-80 transition-all shadow-lg flex items-center justify-center gap-padding-sm" type="submit">
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
          <button className="flex items-center justify-center gap-2 py-padding-sm border border-outline-variant rounded bg-surface hover:bg-surface-container-highest transition-colors font-label-sm text-label-sm text-on-surface">
           
             GitHub
          </button>
          <button className="flex items-center justify-center gap-2 py-padding-sm border border-outline-variant rounded bg-surface hover:bg-surface-container-highest transition-colors font-label-sm text-label-sm text-on-surface">
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
