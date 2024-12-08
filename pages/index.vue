<template>

  <main class="min-h-screen bg-gray-100 p-4">
    <div class="mx-auto w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">与「阿里云盘」连接</h1>
        <a href="https://ghcr.io/ilay1678/alipan-tv-token" target="_blank" rel="noopener noreferrer"
          class="text-gray-600 hover:text-blue-500 transition-colors" title="Docker Image">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
          </svg>
        </a>
      </div>

      <div class="space-y-8">
        <div class="space-y-2">
          <div class="relative">
            <textarea id="accessToken" v-model="accessToken"
              class="w-full rounded font-mono text-sm leading-normal border-2 border-dashed border-gray-300 p-3 pr-10 bg-white resize-none focus:outline-none focus:border-blue-500 transition-colors min-h-[120px] whitespace-pre-wrap overflow-auto placeholder:text-gray-400"
              readonly spellcheck="false" placeholder="访问令牌" />
            <button data-clipboard-target="#accessToken" :class="`absolute top-2 right-2 p-1 rounded transition-colors ${hasAccessToken
                ? 'hover:bg-gray-100 text-gray-500 hover:text-blue-500'
                : 'text-gray-300 cursor-not-allowed'
              }`" :disabled="!hasAccessToken">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <div class="relative">
            <textarea id="refreshToken" v-model="refreshToken"
              class="w-full rounded font-mono text-sm leading-normal border-2 border-dashed border-gray-300 p-3 pr-10 bg-white resize-none focus:outline-none focus:border-blue-500 transition-colors min-h-[120px] whitespace-pre-wrap overflow-auto placeholder:text-gray-400"
              readonly spellcheck="false" placeholder="刷新令牌" />
            <button data-clipboard-target="#refreshToken" :class="`absolute top-2 right-2 p-1 rounded transition-colors ${hasRefreshToken
                ? 'hover:bg-gray-100 text-gray-500 hover:text-blue-500'
                : 'text-gray-300 cursor-not-allowed'
              }`" :disabled="!hasRefreshToken">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div id="authSection" class="h-[52px]">
          <div v-if="isLoading" class="flex justify-center items-center h-full">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span class="ml-3 text-gray-600">正在获取授权链接...</span>
          </div>
          <button v-else @click="handleAuth(authUrl)" :disabled="authorizing" :class="`block w-full bg-blue-500 text-white text-center py-3 px-4 rounded transition-colors relative ${authorizing ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-600'
            }`">
            <div class="flex items-center justify-center">
              <div v-if="authorizing"
                class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {{ authorizing ? '授权中...' : '授权登录' }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </main>

  <a-modal v-model:open="isNoticeOpen" title="使用说明" @ok="closeNotice" :maskClosable="false" :closable="false"
    :keyboard="false">
    <p>本工具能帮助你一键获取「阿里云盘TV版」的刷新令牌，完全免费。TV接口能绕过三方应用权益包的速率限制，但前提你得是SVIP。</p>
    <template #footer>
      <a-button type="primary" @click="closeNotice">我知道了</a-button>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import ClipboardJS from 'clipboard'

const hasGenerated = ref(false)
const authUrl = ref('')
const isLoading = ref(true)
const hasAccessToken = ref(false)
const hasRefreshToken = ref(false)
const authorizing = ref(false)
const isNoticeOpen = ref(false)
const accessToken = ref('')
const refreshToken = ref('')

async function generateAuthUrl() {
  try {
    isLoading.value = true
    const data = await $fetch("/generate_qr", { method: "POST" })
    authUrl.value = `https://www.alipan.com/o/oauth/authorize?sid=${data.sid}`
    checkStatus(data.sid)
  } finally {
    isLoading.value = false
  }
}

function closeNotice() {
  isNoticeOpen.value = false
}

async function checkStatus(sid) {
  try {
    const data = await $fetch("/check_status/" + sid)
    if (data.status === "LoginSuccess") {
      accessToken.value = data.access_token
      refreshToken.value = data.refresh_token
      document.getElementById("authSection").style.visibility = "hidden"
      hasAccessToken.value = !!data.access_token
      hasRefreshToken.value = !!data.refresh_token
      message.success('登录成功')
      initializeClipboard() // 在 token 设置后初始化 ClipboardJS
    } else if (data.status === "ScanSuccess") {
      setTimeout(() => checkStatus(sid), 2000)
    } else if (data.status === "LoginFailed") {
      message.error('登录失败，请刷新页面重试')
      location.reload()
    } else {
      setTimeout(() => checkStatus(sid), 2000)
    }
  } catch (error) {
    console.error("检查状态时出错：", error)
    message.error('发生错误，请稍后重试')
  }
}

// 初始化 ClipboardJS
function initializeClipboard() {
  const accessTokenClipboard = new ClipboardJS('[data-clipboard-target="#accessToken"]')
  accessTokenClipboard.on('success', () => {
    message.success('已复制访问令牌')
  })
  accessTokenClipboard.on('error', () => {
    message.error('复制失败')
  })

  const refreshTokenClipboard = new ClipboardJS('[data-clipboard-target="#refreshToken"]')
  refreshTokenClipboard.on('success', () => {
    message.success('已复制刷新令牌')
  })
  refreshTokenClipboard.on('error', () => {
    message.error('复制失败')
  })
}

const handleAuth = (url) => {
  authorizing.value = true
  window.open(url, '_blank')
}

onMounted(() => {
  // 先显示弹框
  isNoticeOpen.value = true
  if (!hasGenerated.value) {
    generateAuthUrl()
    hasGenerated.value = true
  }
})

</script>

<style scoped></style>