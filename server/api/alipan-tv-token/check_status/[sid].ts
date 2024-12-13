import { decrypt, getParams } from '@/utils/decode';
import { defineEventHandler, getRouterParams } from 'h3'
import type { QrCodeStatus, TokenResponseEncrypt, TokenRequest } from '~/types/api'

export const runtime = 'edge'

export default defineEventHandler(async (event) => {
  try {
    const { sid } = getRouterParams(event);
    const statusData = await $fetch<QrCodeStatus>(`https://openapi.alipan.com/oauth/qrcode/${sid}/status`);
    if (statusData.status === 'LoginSuccess' && statusData.authCode) {
      try {
        const t = Math.floor(Date.now() / 1000);
        const sendData = { 
          ...getParams(t), 
          code: statusData.authCode, 
          "Content-Type": "application/json" 
        } as TokenRequest;

        const headers = Object.fromEntries(
          Object.entries(sendData).map(([k, v]) => [k, String(v)])
        );

        const tokenResponse = await $fetch<TokenResponseEncrypt>('http://api.extscreen.com/aliyundrive/v3/token', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(sendData)
        });
        const plainData = decrypt(tokenResponse.data.ciphertext, tokenResponse.data.iv, t);
        const tokenInfo = JSON.parse(plainData);

        return {
          status: 'LoginSuccess',
          refresh_token: tokenInfo.refresh_token,
          access_token: tokenInfo.access_token
        };

      } catch (error) {
        return { status: 'LoginFailed' } as QrCodeStatus;
      }
    }
    
    return statusData;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message
    });
  }
});