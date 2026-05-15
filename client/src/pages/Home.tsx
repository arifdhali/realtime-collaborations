import { useFormik } from "formik"
import toast from "react-hot-toast"
import api from "../Api"
import { useEffect } from "react"

const Home = () => {

  const joinRoom = useFormik({
    initialValues: {
      room_id: "",
      socketId: ""
    },
    onSubmit: async (values) => {
      try {
        let res = await api.post(`/room/${values.room_id}/join`,{
          socketId: values.socketId
        });
       } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  })

  return (
    <>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-padding-lg">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-padding-lg">

          <div className="flex flex-col justify-center space-y-padding-md">
            <div className="inline-flex items-center gap-padding-sm bg-secondary-container/20 text-secondary border border-secondary/20 px-padding-sm py-1 rounded-full w-fit">
              <span className="material-symbols-outlined">
                bolt
              </span>
              <span className="text-label-sm font-label-sm uppercase tracking-wider">v2.0 Beta Live</span>
            </div>
            <h1 className="text-on-surface font-headline-lg text-4xl lg:text-5xl leading-tight font-extrabold tracking-tighter">
              Write code <br /><span className="text-primary">together, faster.</span>
            </h1>
            <p className="text-on-surface-variant text-body-md max-w-sm">
              High-performance real-time collaboration for engineering teams. Low latency, zero friction, and powerful shared terminal.
            </p>
            <div className="flex items-center gap-padding-md pt-padding-md">
              <div className="flex -space-x-2">
                <img alt="User 1" className="w-8 h-8 rounded-full border-2 border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtCDki7jBfmufo8vNiW4y_HmSUy24EFuBErqmjxBVGxa8zpXp9N2f0GkJqUo9NV41JhODHpVZzNyo1Bck5VhqqqLxJo9z4x9t2sSwkuTq91T45xq9CzwHuLtgzcwt-S9HgUeTGTp88NdofcCHONE_tn0WEeqezXC-tJKDXQ5DiEKoxlLiz_TxhYshEMUWaZuuli_irIdCvOj8xOBnbgAD8cbVVyvAwebdZVUTiO-HmI7vcTIqekF7KHag0Ez0_2JC5wbtwTPcM9wrT" />
                <img alt="User 2" className="w-8 h-8 rounded-full border-2 border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJCZV5SJjTZ3PbdfjnUXYDEFaSSlSW1E41W39LvjrUWsZtafUEMwCZxvRzm6I3y3oFTHgAZqlTscr3_uODPYonctRXVsl5O0JZOQwWz1wyXKMii0ZDp2oI9qQ3AJrs7UzibO0_kgVVG8mVVU5atKhYCwU46e9PpYsbdts36hJbjuHT3TVTNnmwqNkRM6S4nIgrbxmeQx2nWgOBojb1ubu-Ccci0cdD3D_K1tF9uGEoWOXNVNdWezAhfLsQ9bjAzOJaG83wuDsx4o5v" />
                <img alt="User 3" className="w-8 h-8 rounded-full border-2 border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZkDAaR98VBt-RuxGBs4Sa1K0Za6TPSUbii8rnNUdlpAVcVePjlwhBxt8XYz0hKXnTG8dF4_2ljDldWSLco4ICeB1mMG82_rn9lG-hka9pJgTVGTJ64lg8wb_cKU4yK9ycsdIn_G1xxcTCrhW5rTLB0Tj90t9Xl26aVetEtorwVKm59uK5F5rZflVJud3WoCnn3cOAS-n-TZsrmnJUTEOHvJw6lASNYIKPL71LyeMzZNGt_nw0_yI_ct84ib-MG5ydk4QzjT9hyhBd" />
              </div>
              <span className="text-label-sm text-outline">Joined by 12k+ developers</span>
            </div>
          </div>

          <div className="bg-surface-container-low border border-outline-variant p-padding-lg rounded-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-padding-sm opacity-20">
              <span className="material-symbols-outlined text-6xl" data-icon="terminal">terminal</span>
            </div>
            <div className="space-y-padding-lg relative z-10">



              <div className="space-y-padding-md">
                <h2 className="text-on-surface font-headline-md text-xl">Create Room</h2>
                <p className="text-on-surface-variant text-label-sm">Launch a new isolated environment with a dedicated code canvas and real-time cursor syncing.</p>
                <div className="relative">
                  <label className="sr-only" htmlFor="environment-select">Select Environment</label>
                  <select className="w-full bg-surface-container-highest border border-outline-variant text-on-surface p-padding-md rounded-lg transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer" id="environment-select">
                    <option value="js">Javascript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>
                  <div className="absolute right-padding-md top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-symbols-outlined text-outline" data-icon="expand_more">expand_more</span>
                  </div>
                </div>
                <button className="w-full bg-secondary-container text-on-secondary-container flex items-center justify-center gap-padding-sm py-padding-md rounded-lg font-headline-md hover:brightness-110 transition-all group/btn active:scale-[0.98]">
                  <span className="material-symbols-outlined" data-icon="play_arrow" style={{ fontVariationSettings: "'FILL' 1;" }}>play_arrow</span>
                  Create New Room
                </button>
              </div>
              <div className="flex items-center gap-padding-md py-padding-sm">
                <div className="h-[1px] bg-outline-variant flex-1"></div>
                <span className="text-outline text-label-sm uppercase font-bold">OR</span>
                <div className="h-[1px] bg-outline-variant flex-1"></div>
              </div>

              <form onSubmit={joinRoom.handleSubmit} className="space-y-padding-md">
                <label className="block text-on-surface-variant text-label-sm font-label-sm">Connect via Room ID</label>
                <div className="flex gap-padding-sm">
                  <div className="flex-1 relative">
                    <input name="room_id" value={joinRoom.values.room_id} a onChange={joinRoom.handleChange} onBlur={joinRoom.handleBlur} className="py-3 w-full bg-surface-container-lowest border border-outline-variant rounded px-padding-md  font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container code-glow transition-all" placeholder="000 000" type="text" />
                    <div className="absolute bg-surface-container-lowest pl-2 right-padding-sm top-1/2 -translate-y-1/2">
                      <span className="material-symbols-outlined text-on-primary-container" data-icon="vpn_key">vpn_key</span>
                    </div>
                  </div>
                  <button type="submit" className="cursor-pointer bg-primary-container text-on-primary-container px-padding-lg rounded-lg font-label-sm hover:opacity-90 transition-all active:scale-95">
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>


      <footer className="relative z-10 w-full px-padding-lg pb-padding-lg mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-padding-md">

          <div className="bg-surface-container border border-outline-variant p-padding-md rounded-lg hover:bg-surface-container-high transition-colors">
            <div className="text-secondary mb-padding-sm">
              <span className="material-symbols-outlined" >groups</span>
            </div>
            <h4 className="text-on-surface font-label-sm font-bold">Live Presence</h4>
            <p className="text-on-surface-variant text-[11px] mt-1">See who is typing and where with low-latency cursor tracking and avatar highlights.</p>
          </div>

          <div className="bg-surface-container border border-outline-variant p-padding-md rounded-lg hover:bg-surface-container-high transition-colors">
            <div className="text-primary mb-padding-sm">
              <span className="material-symbols-outlined">terminal</span>
            </div>
            <h4 className="text-on-surface font-label-sm font-bold">Shared Terminal</h4>
            <p className="text-on-surface-variant text-[11px] mt-1">Execute code in a secure, sandboxed environment that everyone in the room can interact with.</p>
          </div>

          <div className="bg-surface-container border border-outline-variant p-padding-md rounded-lg hover:bg-surface-container-high transition-colors">
            <div className="text-tertiary mb-padding-sm">
              <span className="material-symbols-outlined">history</span>
            </div>
            <h4 className="text-on-surface font-label-sm font-bold">Time Travel</h4>
            <p className="text-on-surface-variant text-[11px] mt-1">Review session history and revert to any point in the collaborative flow with integrated Git-like snapshots.</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-padding-lg pt-padding-md border-t border-outline-variant">
          <span className="text-outline text-label-sm">© 2024 DevFlow Engineering Labs. Built for the modern web.</span>
          <div className="flex gap-padding-md">
            <a className="text-outline hover:text-primary transition-colors text-label-sm" href="#">Documentation</a>
            <a className="text-outline hover:text-primary transition-colors text-label-sm" href="#">Privacy</a>
            <a className="text-outline hover:text-primary transition-colors text-label-sm" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
