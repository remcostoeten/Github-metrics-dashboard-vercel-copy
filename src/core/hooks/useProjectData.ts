import { useState, useCallback, useEffect, useTransition } from "react";
import { getRepoData } from "@/server/actions/getRepoData";
import { ProjectData } from "@/types";

export const useProjectData = (repoName: string) => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchData = useCallback(async () => {
    startTransition(async () => {
      try {
        const data = await getRepoData(repoName);
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching repo data:", error);
      }
    });
  }, [repoName]);

  useEffect(() => {
    fetchData();
    const pollInterval = setInterval(fetchData, 30000);
    return () => clearInterval(pollInterval);
  }, [fetchData]);

  return { projectData, isPending };
};
