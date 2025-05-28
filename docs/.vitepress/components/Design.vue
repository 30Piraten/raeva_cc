<!-- DesignPage.vue -->
<script setup lang="ts">
import ExternalLink from './ExternalLink.vue';
import { caseStudies } from '../composables/caseStudy';

</script>


<template>
  <h1 class="meaning">add something meaningful</h1>
  <div v-for="cs in caseStudies" :key="cs.slug" class="design-page">
    <div class="design-body">
      <div class="intro">
        <div class="meta">
          <h2>Case Study: {{ cs.title }}</h2>
          <p>{{ cs.description }}</p>
          <p class="slug">Platform: {{ cs.platform }}</p>
          <p class="slug">Industry: {{ cs.industry.join(', ') }}</p>
        </div>
        <div class="deliverables-container">
          <ExternalLink v-for="(url, label) in cs.links" :key="label" :href="url" class="e-link" target="_blank">
            <span class="e_top">{{ label }}</span>
          </ExternalLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.design-page {
  padding: 0rem;
}

.meaning {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-decoration: wavy underline var(--color-accent-light);
}

.slug {
  color: var(--color-accent-light);
  /* font-weight: bold; */
  text-decoration: none;
}

.intro {
  margin-bottom: 1rem;
}

.meta > p {
  margin: 0.5rem 0;
  padding: 0;
  transition: all 0.9s ease;
  /* font-size: 1.2em; */
}

.meta > div:hover {
  text-decoration: underline wavy #7754b2;
}
/* deliverables */
.e-link {
  border: none;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  padding: 0 .2em .55em;
  margin-top: 1.5em;
}

.e_top {
  display: block;
  border-radius: 0.1em;
  padding: 0.75em 1.5em;
  background: var(--color-bg-light);
  transform: translateY(-0.2em);
  transition: transform 0.3s ease;
  border: 1px solid var(--color-text-light);
  color: var(--color-text-light)
}

.e-link:hover .e_top {
  transform: translateY(-0.30em);
  border-radius: 0.4em;
  box-shadow:  -2px -2px 1px #2f49a0, 2px 2px 1px;
}

.e-link:active .e_top {
  transform: translateY(0);
}

</style>