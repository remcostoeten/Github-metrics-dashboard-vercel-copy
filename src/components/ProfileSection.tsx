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
            {userData.name.charAt(0).toUpperCase()}
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
            target="_blank"
            className="flex gap-1.5 py-1 text-base text-white items-center justify-center
            "
          >
            <span className='translate-y-[1px
            ]'>
              <GithubIcon width={14} />
            </span>
            <p>{userData.login}</p>
          </Link>
          <div className="flex gap-4 mt-2 items-center justify-center">
            <ProfileStatistic title="repos" value={userData.public_repos} />
            <ProfileStatistic title="followers" value={userData.followers} />
            <ProfileStatistic title="following" value={userData.following} />
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

function ProfileStatistic({ title, value }: { title: string, value: number }) {
  return (
    <div className="text-white">
      <span className="font-bold">{value}</span> <span className="font-normal">{title}</span>
    </div>
  );
}