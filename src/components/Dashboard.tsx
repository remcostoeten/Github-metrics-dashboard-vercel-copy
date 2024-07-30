import ProjectList from "./ProjectList";
import ActivityList from "./ActivityList";


export default async function Dashboard() {
  return (
    <div className="pr-6 pl-5 max-w-full bg-blend-normal w-[1043px] max-md:px-5">
      <div className="flex gap-16 max-md:flex-col">
        <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
         <ProjectList />
        </div>
        <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full -mt-1.5">
          <ActivityList />
        </div>
      </div>
    </div>
  );
}
