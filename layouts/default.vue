<template>
    <Loading />
    <a-layout class="layout">
        <a-layout-header class="header">
            <div class="header-content max-w-3xl mx-auto px-4 flex items-center">
                <NuxtLink to="/" class="logo">
                    <a-typography-title :level="4" class="!mb-0 !text-white">爱拓工具箱</a-typography-title>
                </NuxtLink>
            </div>
        </a-layout-header>

        <a-layout-content class="site-layout-content">
            <div class="max-w-3xl mx-auto w-full">
                <slot />
            </div>
        </a-layout-content>

        <a-layout-footer style="text-align: center">
            <a-typography-link href="https://github.com/iLay1678/i-tools" target="_blank">
                <template #icon>
                    <GithubOutlined />
                </template>
                GitHub
            </a-typography-link>
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
import { GithubOutlined } from '@ant-design/icons-vue'
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
    min-height: calc(100vh - 64px - 70px);
}

:deep(.ant-layout-header) {
    padding: 0;
}

:deep(.ant-menu) {
    border-bottom: none;
}
</style>