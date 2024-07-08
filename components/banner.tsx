import { AlertCircle, AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariant = cva(
  "border text-center  p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-600 border-yellow-30 text-white",
        success: "bg-emerald-700 border-emerald-800  text-secondary ",
        danger:"bg-destructive text-destructive-foreground hover:bg-destructive/90"
      }
    },
    defaultVariants: {
      variant: "warning"
    }
  }
);

interface BannerProps extends VariantProps<typeof bannerVariant> {
  label: string;
}


const iconMap={
    warning:AlertTriangle,
    success:CheckCircleIcon,
    danger:AlertCircle
}

export const Banner = ({ label, variant }: BannerProps) => {

    const Icon=iconMap[variant ||  "warning"]
  return(
    <div className={cn(bannerVariant({variant}))}>
        <Icon className="h-4 w-4  mr-2"/>
        {label}

    </div>
  )
};
