"use client";

import { fetchGitHubActivities } from "@/server/actions/getGithubActivity";
import { RepoData } from "@/types";
import { useState, useEffect } from "react";
import { useAmountGithubActivityStore } from "@/core/stores/useAmountGithubActivityStore";

export function useGitHubActivities() {
  const [activities, setActivities] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { fetchAmount } = useAmountGithubActivityStore();

  useEffect(() => {
    setLoading(true);
    fetchGitHubActivities()
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [fetchAmount]);

  return { activities, loading, error };
}
