<script setup lang="ts">
import buddy from "../data/buddy.json"
import ExternalLink from "./ExternalLink.vue"
</script>

<template>
  <div v-for="bud in buddy" :key="bud.url">
    <ExternalLink class="external-link" :href="bud.url" target="_self">
        <h2>{{ bud.title }}</h2>
    </ExternalLink>
        <p v-if="bud.description" class="bud">{{ bud.description }}</p>
        <img v-if="bud.image" :src="bud.image" alt="BuddyMe Image"  width="100" height="100"/>
  </div>
</template>
