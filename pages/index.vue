<template>
    <head>
        <title>爱拓工具箱</title>
    </head>
    <main class="max-h-screen bg-gray-100 p-4">
        <div class="mx-auto w-full max-w-3xl mb-8">
            <div class="space-y-4">
                <NuxtLink to="/alipan-tv-token" class="block">
                    <a-card hoverable>
                        <template #title>
                            <h2 class="text-xl font-medium text-gray-800">阿里云盘TV授权</h2>
                        </template>
                        <p class="text-gray-600">获取阿里云盘TV端的授权令牌</p>
                    </a-card>
                </NuxtLink>

                <a-card hoverable>
                    <template #title>
                        <h2 class="text-xl font-medium text-gray-400">敬请期待</h2>
                    </template>
                    <p class="text-gray-400">更多工具正在开发中...</p>
                </a-card>
            </div>
        </div>
    </main>
</template>

<script setup>
</script>
