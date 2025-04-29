import { ref } from 'vue';

export function useGitLab(projectId: string, userId?: string) {
  const mergeRequests = ref<any[]>([]);
  const issues = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const currentPageMR = ref(1);
  const currentPageIssues = ref(1);
  const perPage = 5; // increase based on requirement

  const moreMR = ref(true);
  const moreIssues = ref(true);

  const loadingMoreMR = ref(false);
  const loadingMoreIssues = ref(false);

  async function fetchMergeRequests() {
    if (!moreMR.value) return;

    loadingMoreMR.value = true;
    try {
      // Get the MRs authored by me
      const authorFilter = userId ? `&author_id=${userId}` : '';
      const response = await fetch(
        `https://gitlab.com/api/v4/projects/${projectId}/merge_requests?state=all&order_by=created_at&sort=desc&per_page=${perPage}&page=${currentPageMR.value}${authorFilter}`
      );
      const data = await response.json();
      mergeRequests.value.push(...data);

      // Handle pagination correctly
      const nextPage = response.headers.get('X-Next-Page');
      if (nextPage) {
        currentPageMR.value++;
        moreMR.value = true;
      } else {
        moreMR.value = false;
      }
    } catch (err: any) {
      error.value = err.message || 'Error fetching merge requests';
    } finally {
      loadingMoreMR.value = false;
    }
  }

  async function fetchIssues() {
    if (!moreIssues.value) return;

    loadingMoreIssues.value = true;
    try {
      // Get the issues I'm involved with
      let issuesData: any[] = [];

      if (userId) {
        // First fetch issues assigned to me
        const assigneeResponse = await fetch(
          `https://gitlab.com/api/v4/projects/${projectId}/issues?state=all&assignee_id=${userId}&order_by=created_at&sort=desc&per_page=${perPage}&page=${currentPageIssues.value}`
        );
        const assignedIssues = await assigneeResponse.json();
        issuesData.push(...assignedIssues);

        // Then fetch issues I created that aren't already in the list
        const authorResponse = await fetch(
          `https://gitlab.com/api/v4/projects/${projectId}/issues?state=all&author_id=${userId}&order_by=created_at&sort=desc&per_page=${perPage}&page=${currentPageIssues.value}`
        );
        const authoredIssues = await authorResponse.json();

        // Filter out duplicates - if any
        const existingIds = new Set(issuesData.map(issue => issue.id));
        const uniqueAuthoredIssues = authoredIssues.filter(issue => !existingIds.has(issue.id));

        issuesData.push(...uniqueAuthoredIssues);
      } else {
        // If there is no user ID, fetch all issues
        const response = await fetch(
          `https://gitlab.com/api/v4/projects/${projectId}/issues?state=all&order_by=created_at&sort=desc&per_page=${perPage}&page=${currentPageIssues.value}`
        );
        issuesData = await response.json();
      }

      issues.value.push(...issuesData);

      // Handle pagination (simplified for this combined approach)
      if (issuesData.length === perPage) {
        currentPageIssues.value++;
        moreIssues.value = true;
      } else {
        moreIssues.value = false;
      }
    } catch (err: any) {
      error.value = err.message || 'Error fetching issues';
    } finally {
      loadingMoreIssues.value = false;
    }
  }

  async function fetchAll() {
    loading.value = true;
    await Promise.all([fetchMergeRequests(), fetchIssues()]);
    loading.value = false;
  }

  return {
    mergeRequests,
    issues,
    loading,
    error,
    moreMR,
    moreIssues,
    loadingMoreMR,
    loadingMoreIssues,
    fetchAll,
    fetchMergeRequests,
    fetchIssues,
  };
}