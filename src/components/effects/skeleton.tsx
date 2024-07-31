const Skeleton = ({ className }) => (
  <span aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none">
      ‌
    </span>
    <br />
  </span>
);

const SVGSkeleton = ({ className }) => (
  <svg className={className + ' animate-pulse rounded bg-gray-300'} />
);

const ActivitySkeleton = () => (
  <section aria-label="Recent GitHub Activity">
    <h2 className="font-semibold">Recent Activity</h2>
    <ul className="mt-4 space-y-4">
      {[...Array(5)].map((_, index) => (
        <li
          key={index}
          className="flex flex-col grow !mt-0 text-sm bg-blend-normal border-zinc-800 border-b"
        >
          <span className="flex gap-3 items-center py-3 tracking-normal bg-blend-normal">
            <span className="relative flex h-10 w-10 shrink-0">
              <SVGSkeleton className="aspect-square w-full h-full" />
            </span>
            <p className="flex-grow">
              <Skeleton className="max-w-full" />
            </p>
            <time>
              <Skeleton className="max-w-full" />
            </time>
          </span>
        </li>
      ))}
    </ul>
  </section>
);

const LoadingSkeleton = () => (
  <>
    <span className="flex flex-col grow pb-9 -mt-5 max-md:mt-10 max-md:max-w-full space-y-2">
      <span className="flex flex-col shadow-lg border border-zinc-800">
        <span className="flex justify-between items-center px-4 py-4">
          <h2 className="tracking-tight">
            <Skeleton className="w-[128px] max-w-full" />
          </h2>
          <span className="box-border leading-[32px] block h-[32px] justify-center min-w-min relative w-[66.925px] px-[18.4px] py-0 border-[0.8px] border-solid border-zinc-800">
            <Skeleton className="w-[40px] max-w-full" />
          </span>
        </span>
        <span className="flex flex-col gap-1 px-4 pb-4">
          <span className="flex justify-between">
            <span className="flex gap-2 items-center">
              <span className="w-2.5 h-2.5"></span>
              <a className="box-border items-baseline block h-[16px] leading-[16px] transition-[color] w-[237.637px]">
                <Skeleton className="w-[80px] max-w-full" />
              </a>
            </span>
            <span className="flex items-center gap-4">
              <span className="box-border block h-[17.6px] leading-[12px] w-[76.175px] ml-[10.6667px] mr-0 my-0 px-[6px] py-[2px] border-[0.8px] border-solid border-[rgb(51,51,51)]">
                <Skeleton className="w-[80px] max-w-full" />
              </span>
              <time>
                <Skeleton className="w-[168px] max-w-full" />
              </time>
            </span>
          </span>
          <span className="flex justify-between">
            <span className="flex gap-2 items-center">
              <span className="w-2.5 h-2.5"></span>
              <a className="box-border items-baseline block h-[16px] leading-[16px] transition-[color] w-[237.637px]">
                <Skeleton className="w-[48px] max-w-full" />
              </a>
            </span>
            <span className="flex items-center gap-4">
              <span className="box-border block h-[17.6px] leading-[12px] w-[76.175px] ml-[10.6667px] mr-0 my-0 px-[6px] py-[2px] border-[0.8px] border-solid border-[rgb(51,51,51)]">
                <Skeleton className="w-[80px] max-w-full" />
              </span>
              <time>
                <Skeleton className="w-[48px] max-w-full" />
              </time>
            </span>
          </span>
        </span>
        <span className="flex gap-2.5 px-5 py-5 border-t border-zinc-800">
          <SVGSkeleton className="aspect-square w-3.5 h-4" />
          <span>
            <Skeleton className="w-[232px] max-w-full" />
          </span>
        </span>
      </span>
    </span>
  </>
);

export { Skeleton, SVGSkeleton, ActivitySkeleton, LoadingSkeleton };
