// components/Breadcrumbs.tsx

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export interface BreadcrumbItem {
  text: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  linkClassName?: string;
}

export function Breadcrumbs({
  items,
  separator = <ChevronRight className="w-4 text-gray-500" />,
  className = "flex gap-1.5 text-sm bg-red-400 scale-150 fixed top-4 left-4",
  linkClassName = "capitalize text-white hover:text-gray-500",
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      {items.map((item, i) => (
        <Fragment key={item.href}>
          {i === 0 ? null : separator}
          <Link href={item.href} className={linkClassName}>
            {item.text}
          </Link>
        </Fragment>
      ))}
      hi
    </nav>
  );
}
