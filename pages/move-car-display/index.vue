<template>
    <head>
        <title>挪车信息</title>
    </head>
    <Loading />
    <body class="bg-gray-100">
        <div class="container mx-auto p-4">
            <div class="flex justify-center">
                <div class="w-full max-w-md">
                    <div :class="['car', newEnergy ? 'bg-green-500 text-white' : 'bg-blue-500 text-white']">
                        <span class="car-province">{{ plateNumber.charAt(0) }}</span>
                        <span class="car-letter">{{ plateNumber.charAt(1) }}</span>
                        <span class="car-dot">•</span>
                        <span class="car-number">{{ plateNumber.slice(2) }}</span>
                    </div>
                    <a-card class="mt-4">
                        <template #title>
                            <span class="text-xl font-semibold">挪车信息</span>
                        </template>
                        <div class="mb-4">
                            <div class="text-lg text-gray-700"><span class="font-semibold">临时停靠：</span>请多关照</div>
                            <div class="text-lg text-gray-700"><span class="font-semibold">车牌号：</span>{{ plateNumber }}</div>
                            <div class="text-lg text-gray-700"><span class="font-semibold">联系电话：</span>{{ phoneNumber }}</div>
                        </div>
                        <a-divider />
                        <a-button :class="[newEnergy ? 'bg-green-500 border-green-500' : 'bg-blue-500 border-blue-500']" 
                                  type="primary" class="mr-2 text-white" v-if="uid && token" @click="notifyOwner">
                            通知车主
                        </a-button>
                        <a-button :class="[newEnergy ? 'bg-green-500 border-green-500' : 'bg-blue-500 border-blue-500']" 
                                  type="default" class="text-white" @click="callNumber">
                            一键呼叫
                        </a-button>
                    </a-card>
                </div>
            </div>
        </div>
    </body>
</template>

<script setup>
import { message } from 'ant-design-vue'
import Loading from '~/components/Loading.vue'
import { ref, onMounted } from 'vue'
const plateNumber = ref('')
const phoneNumber = ref('')
const token = ref('')
const uid = ref('')
const newEnergy = ref(false)
definePageMeta({
    layout: false,
})
onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    plateNumber.value = urlParams.get('plateNumber') || ''
    phoneNumber.value = urlParams.get('phoneNumber') || ''
    token.value = urlParams.get('token') || ''
    uid.value = urlParams.get('uid') || ''
    newEnergy.value = urlParams.get('new') === 'true'
})
const notifyOwner = () => {
    const currentTime = new Date().getTime()
    const lastNotifyTimeKey = 'lastNotifyTime' + plateNumber.value
    const lastNotifyTime = localStorage.getItem(lastNotifyTimeKey)
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
                localStorage.setItem(lastNotifyTimeKey, currentTime)
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
.car {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 0 2px 4px;
}
.car.new-energy {
    box-shadow: 0 0 2px 4px #38b000;
}
.car-province, .car-letter, .car-dot, .car-number {
    margin: 0 2px;
}
</style>
