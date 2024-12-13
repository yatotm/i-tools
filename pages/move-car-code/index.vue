<template>
  <head>
    <title>挪车码牌生成</title>
  </head>
  <div class="p-4">
    <div class="mx-auto w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">挪车码牌生成</h1>
      </div>
      <a-form :model="form" :rules="rules" ref="formRef">
        <a-form-item name="plateNumber" label="车牌号">
          <a-input v-model:value="form.plateNumber" placeholder="请输入车牌号" />
        </a-form-item>
        <a-form-item name="phoneNumber" label="手机号">
          <a-input v-model:value="form.phoneNumber" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item label="是否为新能源车">
          <a-checkbox v-model:checked="form.newEnergy">是</a-checkbox>
        </a-form-item>
        <a-form-item label="微信推送设置">
          <a-input-group compact>
            <a-input style="width: 50%" v-model:value="form.token" placeholder="请输入 Token" />
            <a-input style="width: 50%" v-model:value="form.uid" placeholder="请输入 UID" />
          </a-input-group>
          <a-typography-link href="https://wxpusher.zjiecode.com/docs/#/" target="_blank">查看文档</a-typography-link>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSubmit">生成挪车码牌</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-if="generatedUrl" class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 text-center">
      <div class="prose prose-sm max-w-none">
        <h2 class="text-xl font-bold mb-4">生成的挪车码牌链接</h2>
        <a-typography-paragraph copyable>
          <a :href="generatedUrl" target="_blank">{{ generatedUrl }}</a>
        </a-typography-paragraph>
        <div class="flex justify-center">
          <qrcode-vue :value="generatedUrl" :size="200"></qrcode-vue>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import QrcodeVue from 'qrcode.vue'

const form = ref({
  plateNumber: '',
  phoneNumber: '',
  token: '',
  uid: '',
  newEnergy: false
})
const generatedUrl = ref('')
const formRef = ref(null)

const rules = {
  plateNumber: [{ required: true, message: '请输入车牌号' }],
  phoneNumber: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
  ]
}

const handleSubmit = () => {
  formRef.value.validate().then(() => {
    const url = new URL(window.location.origin + '/move-car-display')
    url.searchParams.append('plateNumber', form.value.plateNumber)
    url.searchParams.append('phoneNumber', form.value.phoneNumber)
    if (form.value.token) url.searchParams.append('token', form.value.token)
    if (form.value.uid) url.searchParams.append('uid', form.value.uid)
    if (form.value.newEnergy) url.searchParams.append('new', 'true')
    generatedUrl.value = url.toString()
  }).catch(error => {
    message.warn('请填写完整信息')
  })
}
</script>

<style scoped>
</style>
