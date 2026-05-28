import Editor from '@monaco-editor/react';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../Api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const PlayGround = () => {

  const { room_id } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState("// some comment");
  const [room, setRoom] = useState();
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const getLoadingData = async () => {

    try {

      let res = await api.get(`/room/play-ground/${room_id}`);

      if (res.data.success) {
        setRoom(res.data.data);
        setCode(res.data.data.code);
      }

    } catch (err) {

      toast.error(err.response.data.message);

      if (err.response.status == 404 || err.response.status == 400) {
        navigate("/auth/login");
      }

    }

  }

  useEffect(() => {
    getLoadingData();
  }, []);

  const getFileName = () => {

    if (room?.fileName) {
      return room.fileName;
    }

    switch (room?.language) {

      case "javascript":
        return "main.js";

      case "typescript":
        return "main.ts";

      case "python":
        return "main.py";

      case "java":
        return "Main.java";

      case "cpp":
        return "main.cpp";

      case "c":
        return "main.c";

      default:
        return "main.txt";

    }

  };

  const runCode = async () => {

    try {

      setIsRunning(true);
      setOutput("Running code...\n");

      let res = await api.post(`/room/run-code`, {
        code,
        language: room?.language,
        roomId: room?.roomId,
      });

      if (res.data.success) {

        setOutput(res.data.output || "Code executed successfully");

      }

    } catch (err) {

      setOutput(err?.response?.data?.message || "Something went wrong");

      toast.error("Execution failed");

    } finally {

      setIsRunning(false);

    }

  };

  return (

    <>
      <div className="flex h-screen overflow-hidden">

        {/* SIDEBAR */}
        <aside className="w-sidebar-width bg-surface-container-low border-r border-outline-variant flex flex-col">

          {/* LOGO */}
          <div className="p-padding-md border-b border-outline-variant flex items-center justify-between">

            <Link to={"/"}>

              <p className="text-headline-lg font-headline-lg font-bold text-secondary dark:text-secondary">
                DevFlow IDE
              </p>

            </Link>

            <span className="cursor-pointer material-symbols-outlined text-outline text-sm">
              menu
            </span>

          </div>

          {/* ACTIVE USERS */}
          <div className="flex-1 overflow-y-auto">

            <div className="mt-padding-lg p-2 py-padding-sm text-label-sm font-label-sm text-outline uppercase tracking-wider flex items-center justify-between">

              <span>Active Users</span>

              <span className="text-secondary flex items-center gap-1">

                <span className="w-2 h-2 rounded-full bg-secondary"></span>

                <span className="text-[10px]">
                  {room?.total_users || 0} Live
                </span>

              </span>

            </div>

            <div className="p-2 space-y-padding-sm py-padding-sm">

              {
                room?.users?.length > 0 &&
                room.users.map((user, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 p-padding-xs hover:bg-surface-container rounded-lg transition-colors cursor-pointer group"
                  >

                    <div className="relative">

                      <div className="w-8 h-8 rounded-full border border-outline-variant bg-primary-container flex items-center justify-center text-xs font-bold text-on-primary-container uppercase">

                        {user?.user_id?.name?.charAt(0)}

                      </div>

                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary border-2 border-surface-container-low rounded-full"></div>

                    </div>

                    <p className="text-body-md font-body-md text-on-surface truncate">
                      {user?.user_id?.name}
                    </p>

                  </div>

                ))
              }

            </div>

          </div>

          {/* INVITE BUTTON */}
          <div className="p-padding-md border-t border-outline-variant bg-surface-container-lowest">

            <button className="w-full py-padding-sm bg-surface-container-high border border-outline-variant hover:border-outline text-on-surface text-label-sm font-label-sm flex items-center justify-center gap-2 rounded transition-all">

              <span className="material-symbols-outlined text-[16px]">
                add
              </span>

              Invite Member

            </button>

          </div>

        </aside>

        {/* MAIN SECTION */}
        <div className="flex-1 flex flex-col min-w-0 bg-surface-dim">

          {/* HEADER */}
          <header className="w-full bg-surface-container border-b border-outline-variant flex justify-between items-center py-2 px-5 z-40">

            <div className="flex items-center gap-padding-md">

              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest rounded border border-outline-variant">

                <span className="material-symbols-outlined text-secondary text-sm">
                  hub
                </span>

                <span className="text-body-md font-body-md text-on-surface-variant">

                  Room:

                  <span className="text-on-surface font-bold">
                    {" "}
                    {room?.roomId?.toString()?.slice(0, 10)}
                  </span>

                </span>

              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full">

                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>

                <span className="text-[11px] font-bold tracking-tight">
                  Connected
                </span>

              </div>

            </div>

            <div className="flex items-center gap-3">

              {/* USERS AVATAR */}
              <div className="flex items-center -space-x-2 mr-2">

                {
                  room?.users?.length >= 1 &&
                  room?.users?.slice(0, 2).map((user, index) => (

                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-surface-container bg-primary-container flex items-center justify-center text-[10px] text-on-primary-container font-bold uppercase"
                    >

                      {user?.user_id?.name?.charAt(0)}

                    </div>

                  ))
                }

                {
                  room?.total_users > 2 && (

                    <div className="w-6 h-6 rounded-full border-2 border-surface-container bg-surface-container-high flex items-center justify-center text-[10px] text-on-surface-variant font-bold">

                      +{room.total_users - 2}

                    </div>

                  )
                }

              </div>

              <button className="p-2 py-1 bg-primary text-on-primary text-label-sm font-label-sm rounded hover:opacity-90 active:scale-95 transition-all">

                Share

              </button>

            </div>

          </header>

          {/* TAB BAR */}
          <div className="bg-surface-container-low border-b border-outline-variant flex items-center justify-between h-10 px-5">

            <div className="flex items-center h-full">

              <div className="h-full p-2 px-4 border-r border-outline-variant bg-surface-dim flex items-center gap-2 border-t-2 border-t-primary">

                <span className="material-symbols-outlined text-primary text-[16px]">
                  code
                </span>

                <span className="text-body-md font-body-md text-on-surface">
                  {getFileName()}
                </span>

              </div>

            </div>

            <div className="flex items-center gap-padding-md">

              {/* LANGUAGE */}
              <div className="relative group">

                <button className="flex capitalize items-center gap-2 px-3 py-1 bg-surface-container-high text-on-surface text-label-sm font-label-sm rounded hover:bg-surface-container-highest transition-colors">

                  {room?.language || "javascript"}

                </button>

              </div>

              {/* RUN BUTTON */}
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-1 bg-secondary text-on-secondary text-label-sm font-label-sm rounded hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-secondary/10 disabled:opacity-50"
              >

                <span className="material-symbols-outlined text-[18px]">
                  play_arrow
                </span>

                {isRunning ? "Running..." : "Run Code"}

              </button>

            </div>

          </div>

          {/* EDITOR + TERMINAL */}
          <div className="flex-1 flex flex-col">

            {/* CODE EDITOR */}
            <div className="flex-1">

              <Editor
                value={code}
                onChange={(value) => setCode(value || "")}
                height="100%"
                defaultLanguage={room?.language || "javascript"}
                defaultValue="// some comment"
                theme="vs-dark"
              />

            </div>

            {/* TERMINAL */}
            <div className="h-52 bg-black border-t border-outline-variant flex flex-col">

              {/* TERMINAL HEADER */}
              <div className="h-10 px-4 flex items-center justify-between bg-zinc-900 border-b border-zinc-800">

                <div className="flex items-center gap-2">

                  <span className="material-symbols-outlined text-green-500 text-[18px]">
                    terminal
                  </span>

                  <p className="text-sm text-white font-medium">
                    Terminal
                  </p>

                  <span className="material-symbols-outlined">
                    top_panel_open
                  </span>
                </div>

                <button
                  onClick={() => setOutput("")}
                  className="text-xs text-zinc-400 hover:text-white transition"
                >
                  Clear
                </button>

              </div>

              {/* TERMINAL OUTPUT */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">

                {output || "Click Run Code to execute..."}

              </div>

            </div>

          </div>

        </div>

      </div>
    </>

  );

}

export default PlayGround;