---
title: "Contact Me"
description: "Get in touch with me through this contact form"
---

<script setup>
import ContactMe from ".vitepress/components/ContactMe.vue";
</script>

<ClientOnly>
  <ContactMe />
</ClientOnly>

<!-- <div class="contact-alternative">
  <p>Prefer to connect on social media? Find me on:</p>
  <div class="social-links">
    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a>
    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  </div>
</div> -->

<style scoped>
.contact-alternative {
  text-align: center;
  margin-top: 3rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.social-links a {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.social-links a:hover {
  color: #3182ce;
  text-decoration: underline;
}
</style>