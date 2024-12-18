<template>

    <head>
        <title>二维码生成</title>
    </head>
    <div class="p-4">
        <a-card class="mx-auto w-full max-w-3xl mb-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">二维码生成</h1>
            </div>
            <a-form :model="form" :rules="rules" ref="formRef">
                <a-form-item name="text">
                    <a-textarea v-model:value="form.text" :rows="5" :showCount="true" placeholder="请输入要生成二维码的文本内容" maxlength="2953" />
                </a-form-item>
                <a-form-item>
                    <div class="grid grid-cols-2 gap-4">
                        <a-form-item label="二维码大小">
                            <a-input type="number" v-model:value="config.size" addon-after="px" :min="40" :max="500" />
                        </a-form-item>
                        <a-form-item label="中心图标地址">
                            <a-input v-model:value="config.icon" />
                        </a-form-item>
                        <a-form-item label="图标大小">
                            <a-input type="number" v-model:value="config.iconSize" addon-after="px" :min="20" :max="200" />
                        </a-form-item>
                        <a-form-item label="纠错等级">
                            <a-select v-model:value="config.errorLevel">
                                <a-select-option value="L">L - 低</a-select-option>
                                <a-select-option value="M">M - 中</a-select-option>
                                <a-select-option value="Q">Q - 较高</a-select-option>
                                <a-select-option value="H">H - 高</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="二维码颜色">
                            <a-input 
                                v-model:value="config.color" 
                                placeholder="#000000"
                                type="color"
                            />
                        </a-form-item>
                        <a-form-item label="背景颜色">
                            <a-input 
                                v-model:value="config.bgColor" 
                                placeholder="背景颜色"
                                type="color"
                            />
                        </a-form-item>
                        <a-form-item label="显示边框">
                            <a-switch v-model:checked="config.bordered" />
                        </a-form-item>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
        <a-card v-if="form.text" class="w-full max-w-3xl text-center">
            <div class="prose prose-sm max-w-none">
                <a-space direction="vertical" align="center">
                    <h2 class="text-xl font-bold mb-4">生成的二维码</h2>
                    <a-qrcode 
                        :value="form.text"
                        :icon="config.icon"
                        :size="config.size"
                        :iconSize="config.iconSize"
                        :color="config.color"
                        :bgColor="config.bgColor"
                        :bordered="config.bordered"
                        :errorLevel="config.errorLevel"
                    />
                </a-space>
            </div>
        </a-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
    text: ''
})

const config = ref({
    size: 160,
    icon: '',
    iconSize: 40,
    color: '#000000',
    bgColor: 'transparent',
    bordered: true,
    errorLevel: 'M'
})

const formRef = ref(null)

const rules = {
    text: [{ required: true, message: '请输入要生成二维码的文本内容' }]
}
</script>

<style scoped></style>
