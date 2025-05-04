<script setup lang="ts">
import { ref } from 'vue'
import ExternalLink from './ExternalLink.vue'
import data from '../data/project.json'

</script>

<template>
  <div class="project-data">
    <h2>Project Data</h2>
    <ul>
      <li v-for="(project, index) in data" :key="index">
        <ExternalLink class="project-name" :href="project.link" target="_blank">{{ project.name }}</ExternalLink>
        <p>{{ project.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.project-name {
  color: var(--color-text-light);
}

</style>