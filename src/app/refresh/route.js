
import { decrypt, getParams } from '../utils/decode';

export const runtime = 'edge'
export const dynamic = "force-dynamic"
export async function POST(request) {
  try {
    const { refresh_token } = await request.json();
    const t = Math.floor(Date.now() / 1000);
    const sendData = { 
      ...getParams(t), 
      refresh_token: refresh_token,
      "Content-Type": "application/json" 
    };
    
    const headers = Object.fromEntries(
      Object.entries(sendData).map(([k, v]) => [k, String(v)])
    );

    const response = await fetch('http://api.extscreen.com/aliyundrive/v3/token', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(sendData)
    });

    const tokenData = await response.json();
    const jsonp = tokenData.data;
    const plainData = decrypt(jsonp.ciphertext, jsonp.iv, t);
    const tokenInfo = JSON.parse(plainData);

    return Response.json({
      token_type: 'Bearer',
      access_token: tokenInfo.access_token,
      refresh_token: tokenInfo.refresh_token,
      expires_in: tokenInfo.expires_in
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}