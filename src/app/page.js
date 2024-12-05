'use client'

import { useEffect, useState, useRef } from 'react'
import ClipboardJS from 'clipboard'; 
export default function Home() {
  // 添加状态变量
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('success'); // 可选值：'success'，'error'
  const hasGenerated = useRef(false); // 新增
  const [qrCodeSrc, setQrCodeSrc] = useState(''); // 新增，初始为空表示未加载

  async function generateQR() {
    const response = await fetch("/generate_qr", {
      method: "POST",
    });
    const data = await response.json();
    // 更新二维码图片的 src
    setQrCodeSrc(data.qr_link);
    checkStatus(data.sid);
  }

  async function checkStatus(sid) {
    try {
      const response = await fetch("/check_status/" + sid);
      const data = await response.json();
      if (data.status === "LoginSuccess") {
        document.querySelector("h1").innerText = "获取成功";
        document.getElementById("accessToken").value = data.access_token;
        document.getElementById("refreshToken").value = data.refresh_token;
        document.getElementById("tokens").style.display = "block";
        document.getElementById("qrCodeContainer").style.display = "none";
        // 初始化复制功能
        initializeClipboard();
      } else if (data.status === "ScanSuccess") {
        document.querySelector("h1").innerText = "扫码成功，等待手机端授权";
        // 继续轮询
        setTimeout(() => checkStatus(sid), 2000);
      } else if (data.status === "LoginFailed") {
        document.querySelector("h1").innerText = "登录失败，请刷新页面重试";
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

  useEffect(() => {
    if (!hasGenerated.current) {
      generateQR();
      hasGenerated.current = true;
    }
  }, []); // 依赖项为空数组

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {/* 添加卡片容器 */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* 提示组件 */}
        {alertMsg && (
          <div className={`mb-4 p-4 text-white rounded ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {alertMsg}
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">扫描二维码登录</h1>
        <div id="qrCodeContainer" className="flex justify-center mb-6">
          {qrCodeSrc ? (
            <img
              id="qrCode"
              src={qrCodeSrc}
              alt="二维码"
              className="w-64 h-64" // 设置固定宽高，与占位符一致
            />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">二维码加载中...</span>
            </div>
          )}
        </div>
        <div id="tokens" className="hidden">
          <div className="mb-4">
            <label htmlFor="accessToken" className="block text-gray-700 font-medium mb-2">访问令牌:</label>
            <div className="flex">
              <input type="text" id="accessToken" className="flex-1 p-2 border border-gray-300 rounded-l" readOnly />
              <button data-clipboard-target="#accessToken"
                className="px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600">
                复制
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="refreshToken" className="block text-gray-700 font-medium mb-2">刷新令牌:</label>
            <div className="flex">
              <input type="text" id="refreshToken" className="flex-1 p-2 border border-gray-300 rounded-l" readOnly />
              <button data-clipboard-target="#refreshToken"
                className="px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600">
                复制
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
