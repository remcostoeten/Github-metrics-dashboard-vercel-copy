"use client"

import { ReactNode, useMemo, useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import useMeasure from "react-use-measure"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from 'next/navigation';

type Tab = {
  id: number
  label: string
  path: string
  isActive: boolean
  content: ReactNode
}

interface NavigationProps {
  className?: string
  rounded?: string
}

const navigationItems = [
  { id: 1, label: 'Home', path: '/' },
  { id: 2, label: 'Projects', path: '/projects' },
  { id: 3, label: 'Integrations', path: '#' },
  { id: 4, label: 'Activity', path: '/acti' },
  { id: 5, label: 'Domains', path: '/domain' },
  { id: 6, label: 'Usage', path: '/usage' },
  { id: 7, label: 'Settings', path: '/settings' },
];

const Navigation = ({ className, rounded }: NavigationProps) => {
  const pathname = usePathname();
  const router = useRouter();

  console.log('Current pathname:', pathname); // Debug log

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/' || pathname === '';
    }
    return pathname === path;
  };

  const tabs: Tab[] = navigationItems.map(item => ({
    ...item,
    isActive: isActive(item.path),
    'aria-current': isActive(item.path) ? 'page' : undefined,
    content: null
  }));

  const [activeTabId, setActiveTabId] = useState(() => {
    const activeTab = tabs.find(tab => tab.isActive);
    return activeTab ? activeTab.id : tabs[0].id;
  });

  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [ref, bounds] = useMeasure()

  const handleTabClick = (newTabId: number) => {
    if (newTabId !== activeTabId && !isAnimating) {
      const newTab = tabs.find(tab => tab.id === newTabId);
      if (newTab) {
        const newDirection = newTabId > activeTabId ? 1 : -1
        setDirection(newDirection)
        setActiveTabId(newTabId)
        router.push(newTab.path);
      }
    }
  }

  const variants = {
    initial: (direction: number) => ({
      x: 300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
    active: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: -300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
  }

  return (
    <nav aria-label="Main Navigation" className="flex flex-col items-center w-full px-16 text-sm whitespace-nowrap bg-blend-normal bg-white bg-opacity-0 text-zinc-500 max-md:px-5 max-md:max-w-full">
      <div className={cn(
        "flex space-x-1 border border-none rounded-full cursor-pointer bg-neutral-600 px-[3px] py-[3.2px] shadow-inner-shadow",
        className,
        rounded
      )}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-200 transition focus-visible:outline-1 focus-visible:ring-1 focus-visible:outline-none flex gap-2 items-center ",
              tab.isActive
                ? "text-white"
                : "hover:text-neutral-300/60 text-neutral-200/80",
              rounded
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {tab.isActive && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-neutral-700 mix-blend-difference shadow-inner-shadow border border-white/10"
                style={rounded ? { borderRadius: 9 } : { borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}>
        <motion.div
          className="relative mx-auto w-full h-full overflow-hidden"
          initial={false}
          animate={{ height: bounds.height }}
        >
          <div className="p-1" ref={ref}>
            <AnimatePresence
              custom={direction}
              mode="popLayout"
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={activeTabId}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                {/* Content for the active tab would go here */}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </nav>
  );
};

export default Navigation;