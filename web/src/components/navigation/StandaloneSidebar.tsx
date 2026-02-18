import { Link, useLocation } from "react-router-dom";
import { LuVideo, LuHistory, LuSettings } from "react-icons/lu";
import { cn } from "@/lib/utils";

type StandaloneSidebarProps = {
  className?: string;
};

export default function StandaloneSidebar({
  className,
}: StandaloneSidebarProps) {
  const location = useLocation();

  const links = [
    {
      path: "/standalone",
      icon: LuVideo,
      label: "Live View",
      active:
        location.pathname === "/standalone" ||
        location.pathname === "/standalone/",
    },
    {
      path: "/standalone/review",
      icon: LuHistory,
      label: "History",
      active: location.pathname.startsWith("/standalone/review"),
    },
    {
      path: "/standalone/config",
      icon: LuSettings,
      label: "Config",
      active: location.pathname.startsWith("/standalone/config"),
    },
  ];

  return (
    <aside
      className={cn(
        "flex w-16 flex-col items-center justify-start border-r border-secondary-highlight bg-background_alt py-4",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "flex flex-col items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-primary",
              link.active && "bg-secondary text-primary",
            )}
            title={link.label}
          >
            <link.icon className="h-6 w-6" />
          </Link>
        ))}
      </div>
    </aside>
  );
}
