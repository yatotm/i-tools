<template>
    <Loading />
    <a-layout class="layout">
        <a-layout-header class="header">
            <div class="header-content max-w-4xl mx-auto px-4 flex items-center justify-between">
                <NuxtLink to="/" class="logo">
                    <a-typography-title :level="4" class="!mb-0 !text-white">爱拓工具箱</a-typography-title>
                </NuxtLink>
                <div class="flex items-center">
                    <a href="https://github.com/iLay1678/i-tools" 
                       rel="external nofollow noreferrer" 
                       target="_blank"
                       class="opacity-80 hover:opacity-100 transition-opacity">
                        <img alt="GitHub Repo stars" 
                             src="https://img.shields.io/github/stars/iLay1678/i-tools?style=social" 
                             style="height: 26px;">
                    </a>
                </div>
            </div>
        </a-layout-header>

        <a-layout-content class="site-layout-content">
            <div class="max-w-4xl mx-auto w-full">
                <slot />
            </div>
        </a-layout-content>

        <a-layout-footer style="text-align: center">
            <span class="text-gray-500">©2024 爱拓工具箱</span>
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
import Loading from '~/components/Loading.vue'
</script>

<style scoped>
.layout {
    min-height: 100vh;
}

.header {
    position: fixed;
    z-index: 1;
    width: 100%;
    background: linear-gradient(90deg, #1677ff 0%, #4096ff 100%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-content {
    height: 64px;
}

.logo {
    float: left;
    height: 31px;
    margin: 16px 0;
}

.site-layout-content {
    padding: 0 24px;
    margin-top: 64px;
    margin-bottom: 70px;  /* 添加底部边距，为固定页脚留出空间 */
}

:deep(.ant-layout-footer) {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 20px;
    background: white;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
    z-index: 1;
}

:deep(.ant-layout-header) {
    padding: 0;
}

:deep(.ant-menu) {
    border-bottom: none;
}

:deep(.ant-typography-link) {
    font-size: 16px;
}

:deep(.ant-typography-title) {
    color: white !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>