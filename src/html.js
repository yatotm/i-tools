export const html = `
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>二维码登录</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
        background-color: #f0f0f0;
      }
      h1 {
        color: #333;
      }
      #qrCodeContainer {
        margin: 20px 0;
      }
      #tokens {
        display: none;
        margin-top: 20px;
      }
      .token-container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .token-container label {
        margin-right: 10px;
        font-weight: bold;
      }
      .token-container input {
        width: 300px;
        padding: 5px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .token-container button {
        padding: 5px 10px;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }
      .token-container button:hover {
        background-color: #0056b3;
      }
    </style>
    <script>
      async function generateQR() {
        const response = await fetch("/generate_qr", {
          method: "POST",
        });
        const data = await response.json();
        const qrCode = document.getElementById("qrCode");
        qrCode.src = data.qr_link;
        qrCode.style.display = "block";
        checkStatus(data.sid);
      }

      async function checkStatus(sid) {
        const interval = setInterval(async () => {
          const response = await fetch("/check_status/" + sid);
          const data = await response.json();
          if (data.status === "LoginSuccess") {
            clearInterval(interval);
            document.querySelector("h1").innerText = "获取成功";
            document.getElementById("accessToken").value = data.access_token;
            document.getElementById("refreshToken").value = data.refresh_token;
            document.getElementById("tokens").style.display = "block";
            document.getElementById("copyAccessTokenButton").style.display =
              "inline-block";
            document.getElementById("copyRefreshTokenButton").style.display =
              "inline-block";
            document.getElementById("qrCodeContainer").style.display = "none";
          } else {
            if (data.status === "ScanSuccess") {
              document.querySelector("h1").innerText =
                "扫码成功，等待手机端授权";
            }
            if (data.status === "LoginFailed") {
              document.querySelector("h1").innerText =
                "登录失败，请刷新页面重试";
              clearInterval(interval);
              alert("登录失败，请刷新页面重试");
              location.reload();
            }
          }
        }, 2000);
      }

      function copyToClipboard(elementId) {
        const copyText = document.getElementById(elementId);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("已复制: " + copyText.value);
      }
    </script>
  </head>
  <body onload="generateQR()">
    <h1>扫描二维码登录</h1>
    <div id="qrCodeContainer">
      <img id="qrCode" alt="二维码加载中..." />
    </div>
    <div id="tokens">
      <div class="token-container">
        <label for="accessToken">访问令牌:</label>
        <input type="text" id="accessToken" readonly />
        <button id="copyAccessTokenButton" onclick="copyToClipboard('accessToken')">复制</button>
      </div>
      <div class="token-container">
        <label for="refreshToken">刷新令牌:</label>
        <input type="text" id="refreshToken" readonly />
        <button id="copyRefreshTokenButton" onclick="copyToClipboard('refreshToken')">复制</button>
      </div>
    </div>
  </body>
</html>`