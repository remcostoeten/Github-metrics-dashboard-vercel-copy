import * as React from "react";
import { Button } from "./ui/button";
import { Flex } from "./atoms/Flexer";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function ProfileSection() {
return (
  <div className="flex gap-5 justify-between items-center pt-11 pr-6 pb-20 pl-5 bg-blend-normal max-md:flex-wrap max-md:px-5">
    <Flex gap='4'>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0778c33064204682736749882748977c998547ffeb1221b3751755a73eca481d?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0778c33064204682736749882748977c998547ffeb1221b3751755a73eca481d?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0778c33064204682736749882748977c998547ffeb1221b3751755a73eca481d?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0778c33064204682736749882748977c998547ffeb1221b3751755a73eca481d?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0778c33064204682736749882748977c998547ffeb1221b3751755a73eca481d?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0778c33064204682736749882748977c998547ffeb1221b3751755a73eca481d?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0778c33064204682736749882748977c998547ffeb1221b3751755a73eca481d?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0778c33064204682736749882748977c998547ffeb1221b3751755a73eca481d?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
        className="shrink-0 max-w-full border border-solid bg-blend-normal aspect-square border-zinc-800 rounded-[50px] w-[100px]"
      />
      <div className="flex flex-col items-start py-0.5 bg-blend-normal max-md:max-w-full">
        <div className="flex gap-5 justify-between self-stretch py-2 w-full bg-blend-normal max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-2 items-center text-white">
            <div className="grow text-4xl font-semibold tracking-tighter">
              Ofek Ashery
            </div>
            <span className="box-border text-white text-[12px] font-medium block h-[19.2px] leading-[12px] w-[57.6375px] uppercase ml-[5.33333px] mr-0 my-0 px-[8px] py-[2.8px] rounded-[16px] border-[0.8px] border-solid border-[rgb(51,51,51)]">
  Admin
</span>

          </div>
      
        </div>
        <div className="text-xs font-medium tracking-normal uppercase text-zinc-500">
          Git Integrations
        </div>
        <div className="flex gap-1.5 py-1 text-base text-white whitespace-nowrap bg-blend-normal">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b38706575f179c8ca8e2ad86272d86ee3c9097959aa108c44cb7e7a9b5caf13d?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
            className="shrink-0 self-start w-4 bg-blend-normal aspect-square"
          />
          <div>ofekashery</div>
        </div>
      </div>
    </Flex>


    <Button className="bg-white text-black rounded-lg" variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right">
<Link href='https://github.com/remcostoeten'target='_blank'>Go to repository</Link></Button>
  </div>
);
}