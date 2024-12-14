<template>
  <head>
        <title>与「阿里云盘」连接</title>
    </head>
  <div class="p-4">
    <!-- 主体部分 -->
    <div class="mx-auto w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">与「阿里云盘」连接</h1>
      </div>

      <div class="space-y-8">
        <div class="space-y-2">
          <div class="relative">
            <a-textarea :rows="5" id="accessToken" :value="accessToken"
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
            <a-textarea :rows="4" id="refreshToken" :value="refreshToken"
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

    <!-- 文档部分 -->
    <div class="mx-auto w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
      <div class="prose prose-sm max-w-none">
        <h2 class="text-xl font-bold mb-4">使用说明</h2>
        <h3 class="text-lg font-semibold mt-6 mb-2">路由:</h3>
        <ul class="list-disc pl-5 mb-4">
          <li><code class="bg-gray-100 px-1 rounded">/api/oauth/alipan/token⁠</code> 刷新令牌</li>
        </ul>
        <h3 class="text-lg font-semibold mt-6 mb-2">在 alist 中配置 alipan-tv-token 的地址</h3>
        <p>在 alist 的阿里云盘open配置中：</p>
        <ul class="list-disc pl-5">
          <li>Oauth令牌链接填写: <code
              class="bg-gray-100 px-1 rounded">http://alipan-tv-token:3000/api/oauth/alipan/token⁠</code></li>
          <li>如果需要获取 token，访问: <code class="bg-gray-100 px-1 rounded">http://你的IP:3000/alipan-tv-token</code></li>
        </ul>
      </div>
    </div>
  </div>
  <a-modal v-model:open="isNoticeOpen" title="使用说明" @ok="closeNotice" :maskClosable="false" :closable="false"
    :keyboard="false">
    <p>本工具能帮助你一键获取「阿里云盘TV版」的刷新令牌，完全免费。TV接口能绕过三方应用权益包的速率限制，但前提你得是SVIP。</p>
    <template #footer>
      <!-- 开通会员链接 -->
      <a-button type="primary" danger href="https://www.alipan.com/cpx/member?userCode=MjAyNTk2" target="_blank">开通会员</a-button>
      <a-button type="primary" @click="closeNotice">我知道了</a-button>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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

const checkTimer = ref(null)
const isComponentMounted = ref(true)

async function generateAuthUrl() {
  try {
    isLoading.value = true
    const data = await $fetch("/api/alipan-tv-token/generate_qr", { method: "POST" })
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
  if (!isComponentMounted.value) return
  
  try {
    const data = await $fetch("/api/alipan-tv-token/check_status/" + sid)
    if (data.status === "LoginSuccess") {
      accessToken.value = data.access_token
      refreshToken.value = data.refresh_token
      document.getElementById("authSection").style.visibility = "hidden"
      hasAccessToken.value = !!data.access_token
      hasRefreshToken.value = !!data.refresh_token
      message.success('登录成功')
      initializeClipboard() // 在 token 设置后初始化 ClipboardJS
    } else if (data.status === "ScanSuccess" && isComponentMounted.value) {
      checkTimer.value = setTimeout(() => checkStatus(sid), 2000)
    } else if (data.status === "LoginFailed") {
      message.error('登录失败，请刷新页面重试')
    } else if (data.status === "QRCodeExpired") {
      message.error('链接过期，请刷新页面重试')
    } else if (isComponentMounted.value) {
      checkTimer.value = setTimeout(() => checkStatus(sid), 2000)
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
onUnmounted(() => {
  isComponentMounted.value = false
  if (checkTimer.value) {
    clearTimeout(checkTimer.value)
  }
})

</script>

<style scoped></style>