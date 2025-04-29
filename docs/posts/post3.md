---
title: "How I Built My Blog with VitePress 3"
description: "A guide to setting up a fast blog using VitePress."
date: 2025-04-28
tags: ["vitepress", "vue", "blogging", "setup"]
---

# How I Built My Blog with VitePress

Lorem ipsum dolor sit amet...

```ts

<script setup lang="ts">
interface Post {
  url: string;
  title: string;
  description: string;
  date: string;
}

// Import raw markdown files
const postFiles = Object.entries(
  import.meta.glob('/posts/*.md', { eager: true, as: 'raw' })
);

// Helper: parse frontmatter manually
function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) return {};

  const frontmatter = match[1]
    .split('\n')
    .reduce((acc, line) => {
      const [key, ...rest] = line.split(':');
      acc[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
      return acc;
    }, {} as Record<string, string>);

  return frontmatter;
}

// Build posts array
const posts: Post[] = postFiles.map(([path, rawContent]) => {
  const frontmatter = parseFrontmatter(rawContent as string);

  return {
    url: path
      .replace(/^\/posts/, '') // Remove /posts prefix
      .replace(/\.md$/, ''),    // Remove .md
    title: frontmatter.title || 'Untitled',
    description: frontmatter.description || '',
    date: frontmatter.date || '',
  };
})
.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Newest first

</script>

<template>
  <div class="blog-list">
    <div v-for="post in posts" :key="post.url" class="post-item">
      <a :href="`/posts${post.url}`" class="post-link">
        <h2>{{ post.title }}</h2>
        <p v-if="post.description">{{ post.description }}</p>
        <small v-if="post.date">
          - {{
            new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </small>
      </a>
    </div>
  </div>
</template>

<style scoped>
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin-top: 2em;
}

.post-link {
  display: block;
  padding: 1em;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5em;
  text-decoration: none;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  transition: all 0.25s ease;
}

.post-link:hover {
  background: var(--vp-c-bg-soft);
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h2 {
  margin: 0 0 0.3em 0;
  font-size: 1.4rem;
}

p {
  margin: 0 0 0.5em 0;
  color: var(--vp-c-text-2);
}

small {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
</style>
```