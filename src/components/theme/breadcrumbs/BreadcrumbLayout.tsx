import { Breadcrumbs } from "./Breadcrumbs";
import { useBreadcrumbs } from "@/core/hooks/useBreadcrumbs";

interface BreadcrumbLayoutProps {
  children: React.ReactNode;
}

export function BreadcrumbLayout({ children }: BreadcrumbLayoutProps) {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="space-y-9">
      <Breadcrumbs items={breadcrumbs} />
      {children}
    </div>
  );
}
