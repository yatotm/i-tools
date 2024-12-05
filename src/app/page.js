'use client'

import { useEffect, useState, useRef } from 'react'
import ClipboardJS from 'clipboard'

export default function Home() {
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('success')
  const hasGenerated = useRef(false)
  const [authUrl, setAuthUrl] = useState('') // 新增授权URL状态
  const [isLoading, setIsLoading] = useState(true) // 新增加载状态
  const [hasAccessToken, setHasAccessToken] = useState(false)
  const [hasRefreshToken, setHasRefreshToken] = useState(false)
  const [authorizing, setAuthorizing] = useState(false) // 新增授权中状态
  const [showNotice, setShowNotice] = useState(true)  // 新增弹窗控制状态

  async function generateAuthUrl() {
    try {
      setIsLoading(true)
      const response = await fetch("/generate_qr", {
        method: "POST",
      });
      const data = await response.json();
      // 生成授权URL
      const url = `https://www.alipan.com/o/oauth/authorize?sid=${data.sid}`
      setAuthUrl(url);
      checkStatus(data.sid);
    } finally {
      setIsLoading(false)
    }
  }

  async function checkStatus(sid) {
    try {
      const response = await fetch("/check_status/" + sid);
      const data = await response.json();
      if (data.status === "LoginSuccess") {
        document.getElementById("accessToken").value = data.access_token;
        document.getElementById("refreshToken").value = data.refresh_token;
        document.getElementById("authSection").style.visibility = "hidden"; // 改为隐藏而不是display:none
        setHasAccessToken(!!data.access_token)
        setHasRefreshToken(!!data.refresh_token)
        // 初始化复制功能
        initializeClipboard();
      } else if (data.status === "ScanSuccess") {
        // 继续轮询
        setTimeout(() => checkStatus(sid), 2000);
      } else if (data.status === "LoginFailed") {
        setAlertMsg("登录失败，请刷新页面重试");
        setAlertType('error');
        location.reload();
      } else {
        // 其他状态，继续轮询
        setTimeout(() => checkStatus(sid), 2000);
      }
    } catch (error) {
      console.error("检查状态时出错：", error);
      setAlertMsg("发生错误，请稍后重试");
      setAlertType('error');
    }
  }

  function initializeClipboard() {
    // 初始化 access token 复制
    const accessTokenClipboard = new ClipboardJS('[data-clipboard-target="#accessToken"]');
    accessTokenClipboard.on('success', () => {
      setAlertMsg('已复制访问令牌');
      setAlertType('success');
    });
    accessTokenClipboard.on('error', () => {
      setAlertMsg('复制失败');
      setAlertType('error');
    });

    // 初始化 refresh token 复制
    const refreshTokenClipboard = new ClipboardJS('[data-clipboard-target="#refreshToken"]');
    refreshTokenClipboard.on('success', () => {
      setAlertMsg('已复制刷新令牌');
      setAlertType('success');
    });
    refreshTokenClipboard.on('error', () => {
      setAlertMsg('复制失败');
      setAlertType('error');
    });
  }

  // 新增处理点击授权的函数
  const handleAuth = (url) => {
    setAuthorizing(true)
    window.open(url, '_blank')
  }

  useEffect(() => {
    if (!hasGenerated.current) {
      generateAuthUrl();
      hasGenerated.current = true;
    }
  }, []);

  // 添加消息自动清除的 Effect
  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => {
        setAlertMsg('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  return (
    <>
      {showNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">使用须知</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              本工具能帮助你一键获取「阿里云盘TV版」的刷新令牌，完全免费。TV接口能绕过三方应用权益包的速率限制，但前提你得是SVIP。
            </p>
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setShowNotice(false)}
                className="min-w-[120px] bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors"
              >
                知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {alertMsg && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto min-w-[200px] max-w-[90%] animate-fade-in-out">
          <div className={`px-6 py-3 rounded-lg shadow-lg text-white text-center ${
            alertType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {alertMsg}
          </div>
        </div>
      )}

      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">与「阿里云盘」连接</h1>
            {/* 将 Docker 标移到这里 */}
            <a 
              href="https://ghcr.io/ilay1678/alipan-tv-token"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
              title="Docker Image"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
              </svg>
            </a>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="relative">
                <textarea 
                  id="accessToken" 
                  className="w-full rounded font-mono text-sm leading-normal
                    border-2 border-dashed border-gray-300 
                    p-3 pr-10
                    bg-white
                    resize-none
                    focus:outline-none focus:border-blue-500
                    transition-colors
                    min-h-[120px]
                    whitespace-pre-wrap
                    overflow-auto
                    placeholder:text-gray-400" 
                  readOnly 
                  spellCheck="false"
                  placeholder="访问令牌"
                />
                <button 
                  data-clipboard-target="#accessToken"
                  className={`absolute top-2 right-2 p-1 rounded transition-colors ${
                    hasAccessToken 
                      ? 'hover:bg-gray-100 text-gray-500 hover:text-blue-500' 
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title="复制访问令牌"
                  disabled={!hasAccessToken}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <textarea 
                  id="refreshToken" 
                  className="w-full rounded font-mono text-sm leading-normal
                    border-2 border-dashed border-gray-300 
                    p-3 pr-10
                    bg-white
                    resize-none
                    focus:outline-none focus:border-blue-500
                    transition-colors
                    min-h-[120px]
                    whitespace-pre-wrap
                    overflow-auto
                    placeholder:text-gray-400" 
                  readOnly 
                  spellCheck="false"
                  placeholder="刷新令牌"
                />
                <button 
                  data-clipboard-target="#refreshToken"
                  className={`absolute top-2 right-2 p-1 rounded transition-colors ${
                    hasRefreshToken 
                      ? 'hover:bg-gray-100 text-gray-500 hover:text-blue-500' 
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title="复制刷新令牌"
                  disabled={!hasRefreshToken}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div id="authSection" className="h-[52px]"> {/* 固定高度 */}
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-600">正在获取授权链接...</span>
                </div>
              ) : authUrl && (
                <button 
                  onClick={() => handleAuth(authUrl)}
                  disabled={authorizing}
                  className={`block w-full bg-blue-500 text-white text-center py-3 px-4 rounded 
                    transition-colors relative
                    ${authorizing ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                  {authorizing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      授权中...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      授权登录
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
