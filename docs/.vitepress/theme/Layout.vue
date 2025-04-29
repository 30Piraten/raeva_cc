<template>
    <Layout>
      <Cursor />
    </Layout>
  </template>
  
  <script setup lang="ts">
  import DefaultTheme from 'vitepress/theme'
  import Cursor from "./components/Cursor.vue"
  
  const { Layout } = DefaultTheme
  </script>
  