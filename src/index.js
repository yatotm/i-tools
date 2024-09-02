/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { decrypt, getParams } from './decode.js';
import {html} from './html.js';
async function handleRequest(request) {
	const url = new URL(request.url);
	if (request.method === 'POST' && url.pathname === '/generate_qr') {
	  return await generateQR(request);
	} else if (request.method === 'GET' && url.pathname.startsWith('/check_status/')) {
	  const sid = url.pathname.split('/').pop();
	  return await checkStatus(sid);
	} else if (request.method === 'POST' && url.pathname === '/refresh') {
	  return await refreshToken(request);
	} else {
		return new Response(html, {
			headers: {
			  "content-type": "text/html;charset=UTF-8",
			},
		  });
	}
  }
  
  async function generateQR(request) {
	try {
	  const response = await fetch('http://api.extscreen.com/aliyundrive/qrcode', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
		  scopes: ["user:base", "file:all:read", "file:all:write"].join(','),
		  width: 500,
		  height: 500,
		})
	  });
	  const data = await gatherResponse(response);
	  return new Response(JSON.stringify({ qr_link: data.data.qrCodeUrl, sid: data.data.sid }), {
		headers: { 'Content-Type': 'application/json' }
	  });
	} catch (error) {
	  return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { 'Content-Type': 'application/json' }
	  });
	}
  }
  
  async function checkStatus(sid) {
	try {
	  const response = await fetch(`https://openapi.alipan.com/oauth/qrcode/${sid}/status`);
	  const statusData = await response.json();
	  const status = statusData.status;
	  if (status === 'LoginSuccess') {
		try {
		  console.log(statusData);
		  const authCode = statusData.authCode;
		  const t = Math.floor(Date.now() / 1000);
		  const sendData = { ...getParams(t), code: authCode, "Content-Type": "application/json"};
		  console.log(sendData);
		  const headers = Object.fromEntries(Object.entries(sendData).map(([k, v]) => [k, String(v)]));
		  const tokenResponse = await fetch('http://api.extscreen.com/aliyundrive/v3/token', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(sendData)
		  });
		  const tokenData = await gatherResponse(tokenResponse);
		  console.log(tokenData);
		  const jsonp = tokenData.data;
		  console.log(jsonp);
		  const plainData = decrypt(jsonp.ciphertext, jsonp.iv, t);
		  console.log(plainData);
		  const tokenInfo = JSON.parse(plainData);
		  const refreshToken = tokenInfo.refresh_token;
		  const accessToken = tokenInfo.access_token;
		  return new Response(JSON.stringify({ status: 'LoginSuccess', refresh_token: refreshToken, access_token: accessToken }), {
			headers: { 'Content-Type': 'application/json' }
		  });
		} catch (error) {
		  console.error(error);
		  return new Response(JSON.stringify({ status: 'LoginFailed' }), {
			headers: { 'Content-Type': 'application/json' }
		  });
		}
	  } else {
		return new Response(JSON.stringify({ status: statusData.status }), {
		  headers: { 'Content-Type': 'application/json' }
		});
	  }
	} catch (error) {
	  return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { 'Content-Type': 'application/json' }
	  });
	}
  }
  async function readRequestBody(request) {
	const contentType = request.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
	  return await request.json();
	} else {
	  return null;
	}
  }

  /**
   * gatherResponse processes the response from the origin
   * @param {Response} response the response from the origin
   */
  async function gatherResponse(response) {
	const { headers } = response;
	const contentType = headers.get("content-type") || "";
	if (contentType.includes("application/json")) {
	  return await response.json();
	}
	return await response.text();
  }
  async function refreshToken(request) {
	try {
	  const { refresh_token } = await readRequestBody(request);
	  console.log(refresh_token);
	  const t = Math.floor(Date.now() / 1000);
	  const sendData = { ...getParams(t), refresh_token: refresh_token,"Content-Type": "application/json" };
	  const headers = Object.fromEntries(Object.entries(sendData).map(([k, v]) => [k, String(v)]));
	  const response = await fetch('http://api.extscreen.com/aliyundrive/v3/token', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(sendData)
	  });
	  const tokenData = await gatherResponse(response);
	  console.log(tokenData);
	  const jsonp = tokenData.data;
	  console.log(jsonp);
	  const plainData = decrypt(jsonp.ciphertext, jsonp.iv, t);
	  console.log(plainData);
	  const tokenInfo = JSON.parse(plainData);
	  console.log(tokenInfo);
  
	  return new Response(JSON.stringify({
		token_type: 'Bearer',
		access_token: tokenInfo.access_token,
		refresh_token: tokenInfo.refresh_token,
		expires_in: tokenInfo.expires_in
	  }), {
		headers: { 'Content-Type': 'application/json' }
	  });
	} catch (error) {
	  console.error(error);
	  return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { 'Content-Type': 'application/json' }
	  });
	}
  }
export default {
	async fetch(request, env, ctx) {
		return handleRequest(request);
	},
	
};
