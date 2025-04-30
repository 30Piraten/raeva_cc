// Cursor.vue - Complete Enhanced Implementation
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Using ref for reactive handling of the bubble element
const bubble = ref<HTMLDivElement | null>(null)
const bubbleVisible = ref(true)
const isHoveringInteractive = ref(false)
const isTouchDevice = ref(false)
const lastPosition = ref({ x: 0, y: 0 })
let rafId: number | null = null

// Throttling mechanism
const throttle = (callback: Function, limit: number) => {
  let waiting = false
  return function(...args: any[]) {
    if (!waiting) {
      callback.apply(this, args)
      waiting = true
      setTimeout(() => {
        waiting = false
      }, limit)
    }
  }
}

// Check if device is touch-enabled
const checkTouchDevice = () => {
  isTouchDevice.value = ('ontouchstart' in window) || 
    (navigator.maxTouchPoints > 0) || 
    ((navigator as any).msMaxTouchPoints > 0)
  
  if (isTouchDevice.value && bubble.value) {
    bubble.value.style.display = 'none'
  }
}

// Calculate squish effect near screen edges
const calculateSquish = (x: number, y: number): { scaleX: number, scaleY: number } => {
  const edgeDistance = 50 // Distance from edge where squishing starts
  const maxSquish = 0.7 // Maximum squish factor (1 = no squish)
  
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  
  // Calculate how close to edges (0 = at edge, 1 = far from edge)
  const leftDist = Math.min(1, x / edgeDistance)
  const rightDist = Math.min(1, (windowWidth - x) / edgeDistance)
  const topDist = Math.min(1, y / edgeDistance)
  const bottomDist = Math.min(1, (windowHeight - y) / edgeDistance)
  
  // Convert distance to squish factor
  const horizontalSquish = Math.min(leftDist, rightDist) * (1 - maxSquish) + maxSquish
  const verticalSquish = Math.min(topDist, bottomDist) * (1 - maxSquish) + maxSquish
  
  return {
    scaleX: horizontalSquish < 1 ? 1 / horizontalSquish : 1,
    scaleY: verticalSquish < 1 ? 1 / verticalSquish : 1
  }
}

// Smooth animation using requestAnimationFrame
const animateBubble = (targetX: number, targetY: number) => {
  if (!bubble.value || !bubbleVisible.value) return
  
  // Smooth interpolation factor (0-1), higher = faster movement
  const smoothFactor = 0.15
  
  // Calculate new position with smoothing
  lastPosition.value.x += (targetX - lastPosition.value.x) * smoothFactor
  lastPosition.value.y += (targetY - lastPosition.value.y) * smoothFactor
  
  const x = lastPosition.value.x
  const y = lastPosition.value.y
  
  // Calculate squish effect near screen edges
  const { scaleX, scaleY } = calculateSquish(x, y)
  
  // Update base size depending on interaction state
  const baseSize = isHoveringInteractive.value ? 20 : 40
  const size = Math.min(80, Math.max(30, baseSize))
  
  // Apply all transformations
  bubble.value.style.transform = 
    `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`
  bubble.value.style.width = `${size}px`
  bubble.value.style.height = `${size}px`
  
  // Continue animation loop
  rafId = requestAnimationFrame(() => animateBubble(targetX, targetY))
}

// Improved position updating with requestAnimationFrame
const updatePosition = throttle((e: MouseEvent) => {
  if (isTouchDevice.value) return
  
  const targetX = e.clientX
  const targetY = e.clientY
  
  // Start animation if not already running
  if (rafId === null) {
    rafId = requestAnimationFrame(() => animateBubble(targetX, targetY))
  }
}, 5) // 5ms throttle for high performance

// Detect when mouse leaves the window
const handleMouseLeave = () => {
  bubbleVisible.value = false
  if (bubble.value) {
    bubble.value.style.opacity = '0'
  }
}

// Detect when mouse enters the window
const handleMouseEnter = () => {
  bubbleVisible.value = true
  if (bubble.value) {
    bubble.value.style.opacity = '1'
  }
}

// Handle interactive elements (links, buttons, etc.)
const handleInteractiveHover = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const isInteractive = (
    target.tagName.toLowerCase() === 'a' || 
    target.tagName.toLowerCase() === 'button' ||
    target.closest('a') !== null ||
    target.closest('button') !== null ||
    target.role === 'button' ||
    target.tabIndex === 0
  )
  
  isHoveringInteractive.value = isInteractive
  
  if (bubble.value) {
    if (isInteractive) {
      bubble.value.classList.add('interactive')
    } else {
      bubble.value.classList.remove('interactive')
    }
  }
}

// Handle window resize for squish calculations
const handleResize = throttle(() => {
  if (isTouchDevice.value) return
  checkTouchDevice() // Recheck device type on resize (tablet orientation changes)
}, 100)

onMounted(() => {
  // Check if touch device
  checkTouchDevice()
  
  if (!isTouchDevice.value) {
    // Create the bubble element
    const newBubble = document.createElement('div')
    newBubble.id = 'bubble-cursor'
    document.body.appendChild(newBubble)
    bubble.value = newBubble
    
    // Add event listeners
    window.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleInteractiveHover, true)
    window.addEventListener('resize', handleResize)
    
    // Handle initial state
    lastPosition.value = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
    
    // Start animation
    rafId = requestAnimationFrame(() => 
      animateBubble(lastPosition.value.x, lastPosition.value.y)
    )
  }
})

onBeforeUnmount(() => {
  // Clean up all event listeners
  window.removeEventListener('mousemove', updatePosition)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseover', handleInteractiveHover, true)
  window.removeEventListener('resize', handleResize)
  
  // Cancel any pending animation frame
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  
  // Remove the bubble element
  if (bubble.value) {
    bubble.value.remove()
    bubble.value = null
  }
})
</script>

<template>
  <!-- No visible content needed as we create the bubble using DOM directly -->
</template>

<style>
/* Note: Removed 'scoped' to ensure styles apply to element added to body */
#bubble-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 0, 0.5);
  border: 2px solid rgba(0, 0, 255, 0.7);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: 
    width 0.3s ease-out,
    height 0.3s ease-out,
    opacity 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease;
  mix-blend-mode: difference;
  backdrop-filter: blur(4px);
  will-change: transform, width, height;
  opacity: 1;
}

#bubble-cursor.interactive {
  width: 20px !important;
  height: 20px !important;
  background: rgba(255, 255, 255, 0.8) !important;
  border-color: rgba(0, 0, 255, 1) !important;
  mix-blend-mode: normal;
}

/* Hide cursor on touch devices */
@media (hover: none) and (pointer: coarse) {
  #bubble-cursor {
    display: none !important;
  }
}
</style>
