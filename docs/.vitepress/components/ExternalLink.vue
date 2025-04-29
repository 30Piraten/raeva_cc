<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  href: string,
  target: string,
  rel?: string,
}>()

// if target is not set, default to "_blank"
const computedRel = computed(() => {
  if (props.rel) {
    return props.rel
  }
  // if target is "_blank", set rel to "noopener noreferrer"
  if (props.rel === "_blank") {
    return "noopener noreferrer"
  }
  // othewise, return undefined
  return undefined
})
</script>

<template>
  <a
    :href="href"
    :target="target"
    :rel="computedRel"
  >
    <slot></slot>
  </a>
</template>