import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
}

export const DashboardCard = ({
  title,
  value,
  icon,
  className = "",
}: DashboardCardProps) => {
  return (
    <div
      className={`rounded-lg bg-gray-50 p-4 dark:bg-neutral-800 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="text-2xl text-primary-500 dark:text-primary-400">
          {icon}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {title}
        </p>
      </div>
      <p className="mt-2 text-2xl font-bold text-neutral-800 dark:text-neutral-100">
        {value}
      </p>
    </div>
  );
};
