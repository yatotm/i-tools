import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const response = await fetch('http://api.extscreen.com/aliyundrive/qrcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        scopes: ["user:base", "file:all:read", "file:all:write"].join(','),
        width: 500,
        height: 500,
      })
    })
    const data:any = await response.json()
    return { 
      qr_link: data.data.qrCodeUrl, 
      sid: data.data.sid 
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }
})