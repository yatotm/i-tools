<template>

    <head>
        <title>爱拓工具箱</title>
    </head>
    <main class="max-h-screen bg-gray-100 p-4">
        <div class="mx-auto w-full max-w-3xl mb-8">
            <div class="space-y-4">
                <template v-for="tool in tools" :key="tool.id">
                    <NuxtLink v-if="tool.available" :to="tool.path" class="block">
                        <a-card hoverable>
                            <template #title>
                                <h2 class="text-xl font-medium"
                                    :class="tool.available ? 'text-gray-800' : 'text-gray-400'">
                                    {{ tool.title }}
                                </h2>
                            </template>
                            <p :class="tool.available ? 'text-gray-600' : 'text-gray-400'">{{ tool.description }}</p>
                        </a-card>
                    </NuxtLink>
                    <a-card v-else hoverable>
                        <template #title>
                            <h2 class="text-xl font-medium text-gray-400">{{ tool.title }}</h2>
                        </template>
                        <p class="text-gray-400">{{ tool.description }}</p>
                    </a-card>
                </template>
            </div>
        </div>
    </main>
</template>

<script setup>
const tools = [
    {
        id: 999,
        title: '敬请期待',
        description: '更多工具正在开发中...',
        path: '',
        available: false
    }, {
        id: 1,
        title: '阿里云盘TV授权',
        description: '获取阿里云盘TV端的授权令牌',
        path: '/alipan-tv-token',
        available: true
    },
    {
        id: 2,
        title: '挪车码牌生成',
        description: '生成挪车码牌，方便他人联系车主',
        path: '/move-car',
        available: true
    },
    {
        id: 3,
        title: '二维码生成',
        description: '生成自定义二维码',
        path: '/qrcode',
        available: true
    },

].sort((a, b) => a.id - b.id);
</script>

<style scoped></style>
