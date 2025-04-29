<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let bubble: HTMLDivElement | null = null

const updatePosition = (e: MouseEvent) => {
  if (!bubble) return

  const x = e.clientX
  const y = e.clientY

  const rect = bubble.getBoundingClientRect()
  const dx = x - (rect.left + rect.width / 2)
  const dy = y - (rect.top + rect.height / 2)
  const dist = Math.sqrt(dx * dx + dy * dy)

  const size = Math.min(80, Math.max(30, 100 - dist * 0.1))

  bubble.style.transform = `translate3d(${x}px, ${y}px, 0)`
  bubble.style.width = `${size}px`
  bubble.style.height = `${size}px`
}

onMounted(() => {
  bubble = document.createElement('div')
  bubble.id = 'bubble-cursor'
  document.body.appendChild(bubble)
  window.addEventListener('mousemove', updatePosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', updatePosition)
  if (bubble) {
    bubble.remove()
    bubble = null
  }
})
</script>

<style scoped>
#bubble-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: yellow;
  border: 1px solid blue;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate3d(-50%, -50%, 0);
  transition:
    width 0.15s ease,
    height 0.15s ease,
    transform 0.05s ease;
  mix-blend-mode: difference;
  backdrop-filter: blur(6px);
}
</style>
