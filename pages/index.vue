<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 flex flex-col">
        <div class="max-w-4xl mx-auto flex-grow">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    爱拓工具箱
                </h1>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                <a-card hoverable class="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-h-[200px]">
                    <a-card-meta>
                        <template #title>
                            <div class="flex items-center space-x-2 mb-4">
                                <span class="text-xl font-medium">阿里云盘TV授权</span>
                            </div>
                        </template>
                        <template #description>
                            <div class="mt-4 flex flex-col justify-between h-full">
                                <p class="text-gray-600 mb-8 text-base">获取阿里云盘TV端的授权令牌</p>
                                <NuxtLink to="/alipan-tv-token" target="_blank"
                                    class="inline-block px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
                                    立即使用
                                </NuxtLink>
                            </div>
                        </template>
                    </a-card-meta>
                </a-card>

                <a-card hoverable class="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-h-[200px]">
                    <a-card-meta>
                        <template #title>
                            <div class="flex items-center space-x-2">
                                <span class="text-lg font-medium text-gray-400">敬请期待</span>
                            </div>
                        </template>
                        <template #description>
                            <div class="mt-4">
                                <p class="text-gray-400">更多工具正在开发中...</p>
                            </div>
                        </template>
                    </a-card-meta>
                </a-card>
            </div>
        </div>

        <!-- GitHub 链接放在页面最底部 -->
        <div class="max-w-4xl mx-auto w-full mt-12">
            <div class="text-center border-t pt-6">
                <a href="https://github.com/iLay1678/i-tools" 
                   target="_blank"
                   class="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <svg height="20" width="20" viewBox="0 0 16 16" class="fill-current">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>
