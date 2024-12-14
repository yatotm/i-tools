<template>
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
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const loading = ref(true)

const checkPageLoaded = () => {
  if (document.readyState === 'complete') {
    loading.value = false
  }
}

onMounted(() => {
  if (document.readyState === 'complete') {
    loading.value = false
  } else {
    window.addEventListener('load', checkPageLoaded)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('load', checkPageLoaded)
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.loading-wave {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 40px;
  gap: 8px;
}

.loading-wave > div {
  width: 8px;
  height: 100%;
  background: linear-gradient(45deg, #60a5fa, #3b82f6);
  border-radius: 4px;
  animation: wave 1s ease-in-out infinite;
}

.loading-wave > div:nth-child(2) { animation-delay: 0.1s; }
.loading-wave > div:nth-child(3) { animation-delay: 0.2s; }
.loading-wave > div:nth-child(4) { animation-delay: 0.3s; }
.loading-wave > div:nth-child(5) { animation-delay: 0.4s; }

.loading-text {
  color: #3b82f6;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

@keyframes wave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
}
</style>
