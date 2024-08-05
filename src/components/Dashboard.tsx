import { Suspense, lazy } from "react";

const ActivityList = lazy(() => import("./ActivityList"));
const ProjectList = lazy(() => import("./ProjectList"));

export default function Dashboard() {
  return (
    <div className="pr-6 pl-5 max-w-full bg-blend-normal w-[1043px] max-md:px-5">
      <div className="flex gap-16 max-md:flex-col">
        <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
          <Suspense fallback={<div>Loading projects...</div>}>
            <ProjectList />
          </Suspense>
        </div>
        <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full -mt-1.5">
          <Suspense fallback={<div>Loading activities...</div>}>
            <ActivityList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
