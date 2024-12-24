<template>
    <head>
        <title>爱拓工具箱</title>
    </head>
    <main class="bg-gray-100 p-4 pb-8">
        <div class="mx-auto w-full max-w-4xl">
            <template v-for="category in categories" :key="category">
                <div class="mb-8">
                    <h2 class="category-title inline-block">{{ categoryNames[category] }}</h2>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <template v-for="tool in getToolsByCategory(category)" :key="tool.id">
                            <NuxtLink v-if="tool.available" :to="tool.path">
                                <a-tooltip :title="tool.description" placement="top">
                                    <button class="tool-button w-full">
                                        {{ tool.title }}
                                    </button>
                                </a-tooltip>
                            </NuxtLink>
                            <a-tooltip v-else :title="tool.description" placement="top">
                                <button class="tool-button w-full opacity-60 cursor-not-allowed">
                                    {{ tool.title }}
                                </button>
                            </a-tooltip>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </main>
</template>

<script setup>
const categoryNames = {
    media: '影音工具',
    generate: '生成工具',
    other: '其他工具'
};

const tools = [
    {
        id: 1,
        title: '阿里云盘TV授权',
        description: '获取阿里云盘TV端的授权令牌',
        path: '/alipan-tv-token',
        available: true,
        category: 'media'
    },
    {
        id: 2,
        title: '挪车码牌生成',
        description: '生成挪车码牌，方便他人联系车主',
        path: '/move-car',
        available: true,
        category: 'generate'
    },
    {
        id: 3,
        title: '二维码生成',
        description: '生成自定义二维码',
        path: '/qrcode',
        available: true,
        category: 'generate'
    },
    {
        id: 999,
        title: '敬请期待',
        description: '更多工具正在开发中...',
        path: '',
        available: false,
        category: 'other'
    }
].sort((a, b) => a.id - b.id);

const categories = [...new Set(tools.map(tool => tool.category))];

const getToolsByCategory = (category) => {
    return tools.filter(tool => tool.category === category);
};
</script>

<style scoped>
.tool-button {
    background: linear-gradient(135deg, rgb(52, 52, 52), rgb(73, 73, 73), rgb(94, 94, 94));
    color: white;
    padding: 12px 20px;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    position: relative;
    overflow: hidden;
}

.tool-button:not(.cursor-not-allowed):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tool-button:not(.cursor-not-allowed):active {
    transform: translateY(0);
}

.tool-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
    );
    transition: 0.5s;
}

.tool-button:not(.cursor-not-allowed):hover::before {
    left: 100%;
}

.category-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    position: relative;
    padding-bottom: 0.25rem;
    margin-bottom: 1rem;    /* 从 1.5rem 减小到 1rem */
    display: inline-block;
}

.category-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #1677ff, #4096ff);
    border-radius: 3px;
    transition: all 0.3s ease;
    opacity: 0.8;
}

.category-title:hover::after {
    opacity: 1;
    transform: scaleX(1.05);
}
</style>
