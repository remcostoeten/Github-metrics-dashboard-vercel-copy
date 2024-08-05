import { BreadcrumbItem } from "@/components/theme/breadcrumbs/Breadcrumbs";
import { usePathname } from "next/navigation";

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return {
      text: segment.replace(/-/g, " "),
      href,
    };
  });
}
