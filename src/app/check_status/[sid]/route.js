
import { decrypt, getParams } from '../../utils/decode';

export const runtime = 'edge'
export const dynamic = "force-dynamic"
export async function GET(request, { params }) {
  try {
    const { sid } = params;
    const response = await fetch(`https://openapi.alipan.com/oauth/qrcode/${sid}/status`);
    const statusData = await response.json();
    
    if (statusData.status === 'LoginSuccess') {
      try {
        const authCode = statusData.authCode;
        const t = Math.floor(Date.now() / 1000);
        const sendData = { ...getParams(t), code: authCode, "Content-Type": "application/json"};
        const headers = Object.fromEntries(
          Object.entries(sendData).map(([k, v]) => [k, String(v)])
        );

        const tokenResponse = await fetch('http://api.extscreen.com/aliyundrive/v3/token', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(sendData)
        });
        
        const tokenData = await tokenResponse.json();
        const jsonp = tokenData.data;
        const plainData = decrypt(jsonp.ciphertext, jsonp.iv, t);
        const tokenInfo = JSON.parse(plainData);

        return Response.json({ 
          status: 'LoginSuccess',
          refresh_token: tokenInfo.refresh_token,
          access_token: tokenInfo.access_token 
        });
      } catch (error) {
        return Response.json({ status: 'LoginFailed' });
      }
    } else {
      return Response.json({ status: statusData.status });
    }
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}