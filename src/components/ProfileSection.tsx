import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, GithubIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/atoms/Flexer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { siteConfig } from '@/core/config/site-config';
import { fetchGitHubUserData } from '@/server/actions/fetchGitHubUserData';

interface GitHubUserData {
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface UserStatsProps {
  repos: number;
  followers: number;
  following: number;
}

function UserStats({ repos, followers, following }: UserStatsProps) {
  return (
    <div className="flex gap-4 mt-2 items-center justify-center">
      <div className="text-white">
        <span className="font-semibold">{repos}</span>{" "}
        <span className="font-regular">repos</span>
      </div>
      <div className="text-white">
        <span className="font-bold">{followers}</span> followers
      </div>
      <div className="text-white">
        <span className="font-bold">{following}</span> following
      </div>
    </div>
  );
}

async function ProfileData() {
  const username = siteConfig.githubUsername;
  const userData: GitHubUserData | null = await fetchGitHubUserData(username);

  if (!userData) {
    return <div>Failed to load user data</div>;
  }

  return (
    <>
      <Flex gap="4" justify="center" items="center">
        <Avatar className="w-24 h-24 bg-sky-700 grid place-items-center">
          <AvatarFallback className="text-3xl">
            {userData.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start py-0.5 bg-blend-normal max-md:max-w-full">
          <div className="flex gap-5 justify-between self-stretch py-2 w-full bg-blend-normal max-md:flex-wrap max-md:max-w-full">
            <h1 className="flex gap-2 items-center text-4xl font-semibold tracking-tighter text-white">
              {userData.name}
            </h1>
          </div>
          <p className="text-xs font-medium tracking-normal uppercase text-zinc-500">
            {userData.bio || "Git Integrations"}
          </p>
          <Link
            href={siteConfig.githubUrl}
            className="flex gap-1.5 py-1 text-base text-white whitespace-nowrap bg-blend-normal"
          >
            <GithubIcon width={14} />
            <span>{userData.login}</span>
          </Link>
          <UserStats 
            repos={userData.public_repos}
            followers={userData.followers}
            following={userData.following}
          />
        </div>
      </Flex>
      <Button
        className="bg-white hover:bg-white/90 text-black rounded-lg"
        variant="expandIcon"
        Icon={ArrowRightIcon}
        iconPlacement="right"
      >
        <Link href={userData.html_url} target="_blank" rel="noopener noreferrer">
          Go to profile
        </Link>
      </Button>
    </>
  );
}

export default function ProfileSection() {
  return (
    <section className="flex gap-5 justify-between items-center pr-6 pb-20 pl-5 bg-blend-normal max-md:flex-wrap max-md:px-5">
      <Suspense fallback={<div>Loading profile data...</div>}>
        <ProfileData />
      </Suspense>
    </section>
  );
}