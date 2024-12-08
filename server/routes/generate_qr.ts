import { defineEventHandler } from 'h3'
import type { ApiResponse, QrCodeData } from '~/types/api'
export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch<ApiResponse<QrCodeData>>('http://api.extscreen.com/aliyundrive/qrcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scopes: ["user:base", "file:all:read", "file:all:write"].join(','),
        width: 500,
        height: 500,
      })
    })
    return {
      qr_link: response.data.qrCodeUrl,
      sid: response.data.sid
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }
})