<script setup lang="ts">
import ExternalLink from './ExternalLink.vue'
import { projectData } from '../composables/projectData'

</script>

<template>
  <h1 class="project-header">some backend projects</h1>
  <div class="project-data" v-for="(project, index) in projectData" :key="index">
    <div>
      <ExternalLink class="project-name" :href="project.link" target="_blank">{{ project.name }}</ExternalLink>
      <p class="desc">Description: {{ project.description }}</p>
      <p class="dt">Domain: {{ project.domain }}</p>
      <p class="dt">Tools: {{ project.Tools.join(', ') }}</p>
      <br /> 
      
    </div>
  </div>
</template>

<style scoped>

/* .project-header {
  margin-bottom: 2em;
  text-decoration: underline wavy var(--color-accent-light);
}

.project-name {
  color: var(--color-text-light);
  font-size: 1.5em;
}

.dt {
  color: var(--color-accent-light);
} */
</style>