import { decrypt, getParams } from "@/utils/decode";
import { defineEventHandler } from 'h3'
import type { ApiResponse, TokenResponseEncrypt } from '~/types/api'

export const runtime = 'edge'

export default defineEventHandler(async (event) => {
  try {
    const { refresh_token } = await readBody(event);
    const t = Math.floor(Date.now() / 1000);
    const sendData = { 
      ...getParams(t), 
      refresh_token: refresh_token,
      "Content-Type": "application/json" 
    };
    
    const headers = Object.fromEntries(
      Object.entries(sendData).map(([k, v]) => [k, String(v)])
    );

    const tokenData = await $fetch<TokenResponseEncrypt>('http://api.extscreen.com/aliyundrive/v3/token', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(sendData)
    });
    const plainData = decrypt(tokenData.data.ciphertext, tokenData.data.iv, t);
    const tokenInfo = JSON.parse(plainData);

    return {
      token_type: 'Bearer',
      access_token: tokenInfo.access_token,
      refresh_token: tokenInfo.refresh_token,
      expires_in: tokenInfo.expires_in
    };
    
  } catch (error:any) {
    return {
      code: 500,
      message: error.message,
      data: null
    } as ApiResponse
  }
})
