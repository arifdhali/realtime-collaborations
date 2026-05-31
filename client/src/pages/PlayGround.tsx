import Editor from '@monaco-editor/react';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../Api';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";
import { WebsocketProvider } from 'y-websocket';
import { useSelector } from 'react-redux';
const PlayGround = () => {
  const editorRef = useRef<any>(null);

  const providerRef = useRef<null>(null);

  const ydocRef = useRef<Y.Doc | null>(null);

  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  const { user: currentUser } = useSelector((state) => state.auth)
  const { room_id } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
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

      let currentCode = editorRef.current.getValue();
      let res = await api.post(`/room/run-code`, {
        code: currentCode,
        language: room?.language,
        roomId: room?.roomId,
      });

      if (res.data.success) {

        setOutput(res.data.output || "Code executed successfully");

      } else {
        setOutput(res.data.output)
      }


    } catch (err) {
      toast.error("Execution failed");
    } finally {
      setIsRunning(false);
    }

  };


  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      import.meta.env.VITE_SOCKET_URL,
      room?.roomId || "room-1",
      ydoc
    );

    providerRef.current = provider;
    ydocRef.current = ydoc;

    const yText = ydoc.getText("monaco");

    new MonacoBinding(
      yText,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );

    const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

    provider.awareness.setLocalStateField("user", {
      id: currentUser?._id,
      name: currentUser?.name,
      color: userColor,
    });

    editor.onDidChangeCursorPosition((e) => {
      provider.awareness.setLocalStateField("cursor", {
        lineNumber: e.position.lineNumber,
        column: e.position.column,
      });
    });

    provider.on("status", (e) => {
      console.log("STATUS:", e.status);
    });

    provider.once("sync", (isSynced) => {
      if (isSynced && yText.length === 0 && code) {
        ydoc.transact(() => {
          yText.insert(0, code);
        });
      }
    });

    let decorations: string[] = [];

    provider.awareness.on("change", () => {
      const states = Array.from(
        provider.awareness.getStates().values()
      );

      setOnlineUsers(states);

      const newDecorations: any[] = [];

      provider.awareness.getStates().forEach((state: any, clientId) => {

        if (!state.cursor) return;

        const color = state.user?.color || "#ff0000";
        const username = state.user?.name || "User";

        const cursorClass = `remote-cursor-${clientId}`;

        if (!document.getElementById(cursorClass)) {
          const style = document.createElement("style");

          style.id = cursorClass;

          style.innerHTML = `
          .${cursorClass} {
            border-left: 2px solid ${color};
            position: relative;
          }

          .${cursorClass}::after {
            content: "${username}";
            position: absolute;
            top: 17px;
            left: 0px;
            background: ${color};
            color: white;
            font-size: 11px;
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 4px;
            white-space: nowrap;
            z-index: 9999;
          }
        `;

          document.head.appendChild(style);
        }

        newDecorations.push({
          range: {
            startLineNumber: state.cursor.lineNumber,
            startColumn: state.cursor.column,
            endLineNumber: state.cursor.lineNumber,
            endColumn: state.cursor.column,
          },
          options: {
            className: cursorClass,
          },
        });
      }
      );

      decorations = editor.deltaDecorations(decorations, newDecorations);
    });
  };
  useEffect(() => {
    return () => {
      providerRef.current?.destroy();
      ydocRef.current?.destroy();
    };
  }, []);



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
                  {onlineUsers.length || 0} Live
                </span>

              </span>

            </div>

            <div className="p-2 space-y-padding-sm py-padding-sm">

              {
                onlineUsers?.length > 0 &&
                onlineUsers.map((user, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 p-padding-xs hover:bg-surface-container rounded-lg transition-colors cursor-pointer group"
                  >

                    <div className="relative">

                      <div className="w-8 h-8 rounded-full border border-outline-variant bg-primary-container flex items-center justify-center text-xs font-bold text-on-primary-container uppercase">

                        {user?.user?.name?.charAt(0)}

                      </div>

                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary border-2 border-surface-container-low rounded-full"></div>

                    </div>

                    <p className="text-body-md font-body-md text-on-surface truncate flex items-center gap-2">
                      {user?.user?.name}

                      {
                        user?.user?.id == currentUser._id ? <span className="material-symbols-outlined text-green-600">
                          globe_asia
                        </span> : ""
                      }
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
                  onlineUsers.length >= 1 &&
                  onlineUsers?.slice(0, 2).map((user, index) => (

                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-surface-container bg-primary-container flex items-center justify-center text-[10px] text-on-primary-container font-bold uppercase"
                    >

                      {user?.user?.name?.charAt(0)}

                    </div>

                  ))
                }

                {
                  onlineUsers.length > 2 && (

                    <div className="w-6 h-6 rounded-full border-2 border-surface-container bg-surface-container-high flex items-center justify-center text-[10px] text-on-surface-variant font-bold">

                      +{onlineUsers.length - 2}

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

              {room && (
                <Editor
                  value={code}
                  height="100%"
                  language={room.language}
                  theme="vs-dark"
                  onMount={handleEditorMount}
                />
              )}
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