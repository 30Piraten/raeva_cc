<script setup lang="ts">
import { onMounted } from "vue";
import { useGitLab } from "../composables/useGitLab";
import ExternalLink from "./ExternalLink.vue";

const gitLabUserID = "18525836";
const projectId = "278964";
const { 
  mergeRequests,
  issues,
  loading,
  error,
  fetchAll,
  fetchMergeRequests,
  fetchIssues,
  moreMR,
  moreIssues,
  loadingMoreMR,
  loadingMoreIssues
} = useGitLab(projectId, gitLabUserID);


onMounted(async () => {
  await fetchAll();
});

function formatState(state: string) {
  switch (state) {
    case "opened": return "🟢 Open";
    case "closed": return "🔴 Closed";
    case "merged": return "🟣 Merged";
    default: return state;
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}
</script>

<template>
  <section>
    <h1> Open Source Contributions</h1>

    <div v-if="loading">Loading contributions...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h2>Merge Requests</h2>
      <ul>
        <li v-for="mr in mergeRequests" :key="mr.id">
          <ExternalLink class="external-link" :href="mr.web_url" target="_blank">{{ mr.title }}</ExternalLink>
          <span :class="['badge', mr.state]">{{ formatState(mr.state) }}</span>
          <small class="date">• Created: {{ formatDate(mr.created_at) }}</small>
        </li>
      </ul>

      <!-- Merge Requests Load More Button -->
      <div class="load-more">
        <button
          v-if="moreMR"
          :disabled="loadingMoreMR"
          @click="fetchMergeRequests"
          class="load-button"
        >
          <template v-if="loadingMoreMR">Loading...</template>
          <template v-else>Load More Merge Requests</template>
        </button>
        <div v-else class="no-more">No more merge requests.</div>
      </div>

      <h2>Issues</h2>
      <ul>
        <li v-for="issue in issues" :key="issue.id">
          <ExternalLink class="external-link" :href="issue.web_url" target="_blank">{{ issue.title }}</ExternalLink>
          <span :class="['badge', issue.state]">{{ formatState(issue.state) }}</span>
          <small class="date">• Created: {{ formatDate(issue.created_at) }}</small>
        </li>
      </ul>

      <!-- Issues Load More Button -->
      <div class="load-more">
        <button
          v-if="moreIssues"
          :disabled="loadingMoreIssues"
          @click="fetchIssues"
          class="load-button"
        >
          <template v-if="loadingMoreIssues">Loading...</template>
          <template v-else>Load More Issues</template>
        </button>
        <div v-else class="no-more">No more issues.</div>
      </div>

    </div>
  </section>
  <!-- <ExternalLink href="/" target="_self">Home</ExternalLink> -->
</template>

<style scoped>
.badge {
  margin-left: 0.5em;
  font-size: 0.9em;
  font-weight: bold;
  padding: 0.2em 0.6em;
  border-radius: 0.5em;
  text-transform: capitalize;
}

.badge.opened {
  background-color: #d4f7dc;
  color: #157347;
}

.badge.closed {
  background-color: #f8d7da;
  color: #842029;
}

.badge.merged {
  background-color: #e0cffc;
  color: #6f42c1;
}

.date {
  margin-left: 0.5em;
  font-size: 0.8em;
  color: #6c757d;
}

.load-more {
  text-align: center;
  margin-top: 1.5em;
}

.load-button {
  padding: 0.8em 1.5em;
  font-size: 1em;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 0.5em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.load-button:hover {
  background-color: #0056b3;
}

.no-more {
  color: #6c757d;
  font-size: 0.95em;
  margin-top: 0.5em;
}

</style>