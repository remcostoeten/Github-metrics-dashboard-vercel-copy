import { Button } from "./ui/button";
import { Flex } from "./atoms/Flexer";
import { ArrowRightIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { siteConfig } from "@/core/config/site-config";
import {
  fetchGitHubUserData,
  GitHubUserData,
} from "@/server/actions/fetchGitHubUserData";

async function ProfileSection() {
  const username = siteConfig.githubUsername;
  const userData: GitHubUserData | null = await fetchGitHubUserData(username);

  if (!userData) {
    return <div>Failed to load user data</div>;
  }

  return (
    <div className="flex gap-5 justify-between items-center pr-6 pb-20 pl-5 bg-blend-normal max-md:flex-wrap max-md:px-5">
      <Flex gap="4" justify="center" items="center">
        <Avatar className="w-24 h-24 bg-sky-700 grid place-items-center">
          <AvatarFallback className="text-3xl">
            {userData.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start py-0.5 bg-blend-normal max-md:max-w-full">
          <div className="flex gap-5 justify-between self-stretch py-2 w-full bg-blend-normal max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-2 items-center text-white">
              <div className="grow text-4xl font-semibold tracking-tighter">
                {userData.name}
              </div>
            </div>
          </div>
          <div className="text-xs font-medium tracking-normal uppercase text-zinc-500">
            {userData.bio || "Git Integrations"}
          </div>
          <Link
            href={siteConfig.githubUrl}
            className="flex gap-1.5 py-1 text-base text-white whitespace-nowrap bg-blend-normal"
          >
            <GithubIcon width={14} />
            <div>{userData.login}</div>
          </Link>
          <div className="flex gap-4 mt-2 items-center justify-center ">
            <div className="text-white">
              <span className="font-semibold">{userData.public_repos}</span>{" "}
              <span className="font-regular">repos</span>
            </div>
            <div className="text-white">
              <span className="font-bold">{userData.followers}</span> followers
            </div>
            <div className="text-white">
              <span className="font-bold">{userData.following}</span> following
            </div>
          </div>
        </div>
      </Flex>
      <Button
        className="bg-white hover:bg-white/90 text-black rounded-lg"
        variant="expandIcon"
        Icon={ArrowRightIcon}
        iconPlacement="right"
      >
        <Link href={userData.html_url} target="_blank">
          Go to profile
        </Link>
      </Button>
    </div>
  );
}

export default ProfileSection;
