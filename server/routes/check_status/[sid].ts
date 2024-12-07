import { decrypt, getParams } from '@/utils/decode';
import { defineEventHandler, getRouterParams } from 'h3'

export const runtime = 'edge'

export default defineEventHandler(async (event) => {
  try {
    const { sid } = getRouterParams(event);
    const response = await fetch(`https://openapi.alipan.com/oauth/qrcode/${sid}/status`);
    const statusData:any = await response.json();
    
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
        
        const tokenData:any = await tokenResponse.json();
        const jsonp = tokenData.data;
        const plainData = decrypt(jsonp.ciphertext, jsonp.iv, t);
        const tokenInfo = JSON.parse(plainData);

        return { 
          status: 'LoginSuccess',
          refresh_token: tokenInfo.refresh_token,
          access_token: tokenInfo.access_token 
        };
      } catch (error) {
        return { status: 'LoginFailed' };
      }
    } else {
      return { status: statusData.status };
    }
  } catch (error:any) {
    throw createError({
      statusCode: 500,
      message: error.message
    });
  }
});