import { useState, useCallback, useEffect, useTransition } from "react";
import { getRepoData } from "@/server/actions/getRepoData";
import { ProjectData } from "@/types";

export const useProjectData = (repoName: string) => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isRemoving, setIsRemoving] = useState(false);

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

  const removeRepo = useCallback(async (repoNameToRemove: string) => {
    setIsRemoving(true);
    try {
      // Implement the actual removal logic here
      // For example, you might call an API to remove the repo
      // await removeRepoFromAPI(repoNameToRemove);

      // After successful removal, you might want to clear the project data
      setProjectData(null);
    } catch (error) {
      console.error("Error removing repo:", error);
      setIsRemoving(false);
    }
  }, []);

  return { projectData, isPending, isRemoving, removeRepo };
};