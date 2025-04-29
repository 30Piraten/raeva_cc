<script setup lang="ts">
import ExternalLink from './ExternalLink.vue';

</script>

<template>
  <h1>Hallo, Willkommen: rev oder 30Piraten</h1>
  <div>
    <p>
    Hi, I’m Raeva — a systems-minded product engineer. I enjoy working across frontend, backend, cloud, and infrastructure, crafting products that feel intuitive, scalable, and human-centered. I believe the goal is to do more with less — less noise, more clarity. With a background in Physics, and knowledge of design and software engineering, I approach problems with a blend of logic, creativity, and structured reasoning. I'm currently building <ExternalLink class="links" href="/buddy" target="_self">Buddy.me</ExternalLink>, a project focused on gamifying personal progress through natural UX and solid architecture. I lean into clean systems, clear design, and architecture that speak for themselves. The core trait is affordance — the conceptual ideal behind every product decision: Why are components, contracts, and UI/UX are structured the way they are? Why render it this way, and not differently? Every nuance of code — lekker or not — must mean something. In the end, the goal is simple: to leave everything a little better than I found it. And hey! I write <ExternalLink class="links" href="/poetry" target="_self">poetry</ExternalLink> too, if that's your thing!
  </p>
  <ExternalLink href="mailto:raeva303@gmail.com" class="connect-link" target="_self">Let's connect</ExternalLink>
  </div>
</template>

<style scoped>
h1 {
  color: var(--color-dark);
  text-align: center;
}

.links {
  color: #f134d5;
  font-size: 1em;
  text-align: center;
}

::v-deep(.links:hover) {
  color: rgb(221, 224, 22);
  text-decoration: underline;
}

.connect-link {
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
}

.connect-link:hover {
  color: #f134d5;
}

</style>