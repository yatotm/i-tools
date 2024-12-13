<template>

    <head>
        <title>快点挪车-信息</title>
    </head>
    <div v-if="loading" class="loading-overlay">
            <div class="loading-container">
                <div class="loading-wave">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="loading-text">加载中...</div>
            </div>
        </div>
    <body>

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="car" :class="{ 'new-energy': newEnergy }">
                        <span class="car-province">{{ plateNumber.charAt(0) }}</span><span class="car-letter">{{
                            plateNumber.charAt(1) }}</span><span class="car-dot">•</span><span class="car-number">{{
                            plateNumber.slice(2) }}</span>
                    </div>
                    <div id="cardContainer">
                        <div class="card">
                            <div class="card-body">
                                <h1 class="card-title">挪车信息</h1>
                                <h2 class="card-text">临时停靠，请多关照</h2>
                                <p class="card-text">车牌号: {{ plateNumber }}</p>
                                <p class="card-text">联系电话: {{ phoneNumber }}</p>
                                <button v-if="uid && token" type="button" class="btn btn-success"
                                    @click="notifyOwner">通知车主</button>
                                <button type="button" class="btn btn-primary" @click="callNumber">一键呼叫</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script setup>
import { message } from 'ant-design-vue'
definePageMeta({
    layout: false,
})
import { ref, onMounted, onBeforeUnmount } from 'vue'
const plateNumber = ref('')
const phoneNumber = ref('')
const token = ref('')
const uid = ref('')
const newEnergy = ref(false)
const loading = ref(true)
const checkPageLoaded = () => {
    if (document.readyState === 'complete') {
        loading.value = false
    }
}
onMounted(() => {
    // 检查当前页面状态
    if (document.readyState === 'complete') {
        loading.value = false
    } else {
        // 添加页面加载完成事件监听
        window.addEventListener('load', checkPageLoaded)
    }
    const urlParams = new URLSearchParams(window.location.search)
    plateNumber.value = urlParams.get('plateNumber') || ''
    phoneNumber.value = urlParams.get('phoneNumber') || ''
    token.value = urlParams.get('token') || ''
    uid.value = urlParams.get('uid') || ''
    newEnergy.value = urlParams.get('new') === 'true'
})
onBeforeUnmount(() => {
    // 清理事件监听
    window.removeEventListener('load', checkPageLoaded)
})
const notifyOwner = () => {
    const currentTime = new Date().getTime()
    const lastNotifyTime = localStorage.getItem('lastNotifyTime')
    const timeDifference = (currentTime - lastNotifyTime) / 1000

    if (lastNotifyTime && timeDifference < 60) {
        message.warning('您已发送过通知，请1分钟后再次尝试。')
        return
    }

    fetch('https://wxpusher.zjiecode.com/api/send/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            appToken: token.value,
            content: '您好，有人需要您挪车，请及时处理。',
            contentType: 1,
            uids: [uid.value],
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.code === 1000) {
                message.success('通知已发送！')
                localStorage.setItem('lastNotifyTime', currentTime)
            } else {
                message.error('通知发送失败，请稍后重试。')
            }
        })
        .catch((error) => {
            console.error('Error sending notification:', error)
            message.error('通知发送出错，请检查网络连接。')
        })
}

const callNumber = () => {
    window.location.href = 'tel:' + phoneNumber.value
}
</script>

<style scoped>
.container {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
}

.row {
    display: flex;
    justify-content: center;
}

.card {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 20px;
}

.card-title {
    font-size: 24px;
    margin-bottom: 10px;
}

.card-text {
    font-size: 16px;
    margin-bottom: 10px;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    margin-right: 10px;
}

.btn-success {
    background-color: #38b000;
    color: #fff;
}

.btn-primary {
    background-color: #4b5cc4;
    color: #fff;
}

.car {
    color: #fff;
    background-color: #4b5cc4;
    border-radius: 6px;
    border: 1px solid #fff;
    text-align: center;
    padding: 10px 0;
    box-shadow: 0 0 2px 4px #4b5cc4;
    width: 100%;
    margin: 15px auto;
    font-size: 40px;
    letter-spacing: 5px;
    text-transform: uppercase;
}

.car.new-energy {
    background-color: #38b000;
    box-shadow: 0 0 2px 4px #38b000;
}
</style>
