import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge"

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className="flex items-center gap-x-4 rounded-xl border bg-card p-4 shadow-sm">
      <IconBadge
        variant={variant}
        icon={Icon}
      />
      <div>
        <p className="text-2xl font-semibold leading-none">
          {numberOfItems}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {label}
        </p>
      </div>
    </div>
  )
}