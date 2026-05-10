import Editor from '@monaco-editor/react';
import { Link } from 'react-router';
import api from '../Api';
import { useEffect } from 'react';
const PlayGround = () => {
  const getLoadingData = async () => {
    try {
      let res = await api.get("/room/play-ground");
 

    } catch (err) {
     }
  }
  useEffect(() => {
    getLoadingData();
  }, [])
  return (

    <>
      <div className="flex h-screen overflow-hidden">
        <aside className="w-sidebar-width bg-surface-container-low border-r border-outline-variant flex flex-col">
          <div className="p-padding-md border-b border-outline-variant flex items-center justify-between">
            <Link to={"/"}>
              <p className="text-headline-lg font-headline-lg font-bold text-secondary dark:text-secondary">DevFlow IDE</p>
            </Link>
            <span className="cursor-pointer material-symbols-outlined text-outline text-sm">menu</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 py-padding-sm text-label-sm font-label-sm text-outline uppercase tracking-wider">Project Alpha</div>
            <div className="space-y-px">
              <div className="p-2 py-padding-xs flex items-center text-body-md font-body-md text-on-surface hover:bg-surface-container-highest cursor-pointer group">
                <span className="material-symbols-outlined text-outline mr-2">keyboard_arrow_down</span>
                <span className="material-symbols-outlined text-secondary mr-2" >folder</span>
                <span>src</span>
              </div>
              <div className="pl-12 pr-padding-md py-padding-xs flex items-center text-body-md font-body-md text-on-surface hover:bg-surface-container-highest cursor-pointer active-line">
                <span className="material-symbols-outlined text-primary mr-2">javascript</span>
                <span>main.js</span>
              </div>
              <div className="pl-12 pr-padding-md py-padding-xs flex items-center text-body-md font-body-md text-on-surface hover:bg-surface-container-highest cursor-pointer">
                <span className="material-symbols-outlined text-outline mr-2">description</span>
                <span>README.md</span>
              </div>
            </div>
            <div className="mt-padding-lg p-2 py-padding-sm text-label-sm font-label-sm text-outline uppercase tracking-wider flex items-center justify-between">
              <span>Active Users</span>
              <span className="text-secondary flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="text-[10px]">3 Live</span>
              </span>
            </div>
            <div className="p-2 space-y-padding-sm py-padding-sm">

              <div className="flex items-center gap-3 p-padding-xs hover:bg-surface-container rounded-lg transition-colors cursor-pointer group">
                <div className="relative">
                  <img alt="Sarah" className="w-8 h-8 rounded-full border border-outline-variant" data-alt="A professional headshot of a female software engineer with a friendly expression. She is in a modern office setting with soft, ambient lighting that highlights her features. The aesthetic is clean and high-tech, using a palette of soft greys and vibrant mint green accents, reflecting a focused and collaborative digital workspace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBndXxvJX8qOiVEg8vWO21RqLRfSQddC9XcbxV8-i4yNRMHb7vOj-nCF26Kdzz1UcaL9z5w8EJMv7lFKpl8IUKcFiNPQAjkdZtpQf5wx3ifmR5sRPaNVaE0yTCuWfae5mlInOrCNLv1Cq225VcumJqG9cT0cvgjgX2bZ7VUpFPKLs3wAA20Dc-ac3YDhgE58XEfQdxev6VO9unQsXoMzEvNLkQshki4fah7G6T7M6pyiiSuCWvxNGMGFArF2WGapmHzj7MqOoo74Jzw" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary border-2 border-surface-container-low rounded-full"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-body-md font-body-md text-on-surface truncate">Sarah</p>
                  <p className="text-label-sm font-label-sm text-outline truncate">Editing main.js</p>
                </div>
                <span className="material-symbols-outlined text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
              </div>

              <div className="flex items-center gap-3 p-padding-xs hover:bg-surface-container rounded-lg transition-colors cursor-pointer group">
                <div className="relative">
                  <img alt="Alex" className="w-8 h-8 rounded-full border-2 border-primary" data-alt="A close-up portrait of a male developer in a dark room illuminated by the soft glow of multiple computer monitors. The lighting is moody and technical with electric blue highlights. The overall visual style is sophisticated and minimalist, consistent with a high-performance dark-mode coding environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTKuMLSdICCWmhTnZHpuF1Vb_ySh_Klk3mtgKsj5A2_c5iZT0MV2rlooY4dxblFKBT0ScxnscFp_alH99UxQUxGH5alnpzTkaN10_BP3SnvvNtXhNUwYjqeeSdo4EGYaWiS54DTTuK7ZW9zuYr4C7PuV7XXglwEEfywqCdAvLp4HowQSNsCeJmxiwcOfLfCOHK10vS17_P8--yIznXM10dKk3xHrWno4MysFoh3ZLZ9EkC9mlXN0DZrDXRg6daTCttoT3QjOrjUXQV" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary border-2 border-surface-container-low rounded-full"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-body-md font-body-md text-on-surface truncate">Alex</p>
                  <p className="text-label-sm font-label-sm text-outline truncate">Idle</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-primary/40"></div>
              </div>

              <div className="flex items-center gap-3 p-padding-xs hover:bg-surface-container rounded-lg transition-colors cursor-pointer group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center border border-tertiary/40">
                    <span className="text-tertiary font-bold text-xs">J</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-tertiary border-2 border-surface-container-low rounded-full"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-body-md font-body-md text-on-surface truncate">Jordan</p>
                  <p className="text-label-sm font-label-sm text-outline truncate">Away</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-padding-md border-t border-outline-variant bg-surface-container-lowest">
            <button className="w-full py-padding-sm bg-surface-container-high border border-outline-variant hover:border-outline text-on-surface text-label-sm font-label-sm flex items-center justify-center gap-2 rounded transition-all">
              <span className="material-symbols-outlined text-[16px]">add</span>
              Invite Member
            </button>
          </div>
        </aside>
        <div className="flex-1 flex flex-col min-w-0 bg-surface-dim">
          <header className=" w-full bg-surface-container border-b border-outline-variant flex justify-between items-center py-2 px-5 z-40">
            <div className="flex items-center gap-padding-md">
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest rounded border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-sm" >hub</span>
                <span className="text-body-md font-body-md text-on-surface-variant">Room: <span className="text-on-surface font-bold">alpha-7-v2</span></span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[11px] font-bold tracking-tight">Connected</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2 mr-2">
                <div className="w-6 h-6 rounded-full border-2 border-surface-container bg-primary-container flex items-center justify-center text-[10px] text-on-primary-container font-bold">S</div>
                <div className="w-6 h-6 rounded-full border-2 border-surface-container bg-secondary-container flex items-center justify-center text-[10px] text-on-secondary-container font-bold">A</div>
                <div className="w-6 h-6 rounded-full border-2 border-surface-container bg-surface-container-high flex items-center justify-center text-[10px] text-on-surface-variant font-bold">+1</div>
              </div>
              <button className="p-2 py-1 bg-primary text-on-primary text-label-sm font-label-sm rounded hover:opacity-90 active:scale-95 transition-all">
                Share
              </button>
              <div className="flex items-center gap-1 ml-padding-sm">
                <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors">
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
            </div>
          </header>
          <div className="bg-surface-container-low border-b border-outline-variant flex items-center justify-between h-10  px-5">
            <div className="flex items-center h-full">
              <div className="h-full p-2 border-r border-outline-variant bg-surface-dim flex items-center gap-2 border-t-2 border-t-primary">
                <span className="material-symbols-outlined text-primary text-[16px]">javascript</span>
                <span className="text-body-md font-body-md text-on-surface">main.js</span>
                <span className="material-symbols-outlined text-on-surface-variant text-[14px] ml-2 hover:bg-surface-container-high rounded p-0.5">close</span>
              </div>
            </div>
            <div className="flex items-center gap-padding-md">
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1 bg-surface-container-high text-on-surface text-label-sm font-label-sm rounded hover:bg-surface-container-highest transition-colors">
                  <span>JavaScript</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-1 bg-secondary text-on-secondary text-label-sm font-label-sm rounded hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-secondary/10">
                <span className="material-symbols-outlined text-[18px]" >play_arrow</span>
                Run Code
              </button>
            </div>
          </div>
          <div>
            <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" theme="vs-dark"
            />;
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayGround
