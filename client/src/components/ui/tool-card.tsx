import { Link } from "wouter";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category?: "core" | "convert-to" | "convert-from" | "security";
  className?: string;
}

export default function ToolCard({
  title,
  description,
  icon: Icon,
  href,
  category = "core",
  className
}: ToolCardProps) {
  const getCategoryColors = () => {
    switch (category) {
      case "convert-to":
        return {
          iconBg: "bg-success/10 group-hover:bg-success/20",
          iconColor: "text-success",
          borderHover: "hover:border-success"
        };
      case "convert-from":
        return {
          iconBg: "bg-warning/10 group-hover:bg-warning/20",
          iconColor: "text-warning",
          borderHover: "hover:border-warning"
        };
      case "security":
        return {
          iconBg: "bg-danger/10 group-hover:bg-danger/20",
          iconColor: "text-danger",
          borderHover: "hover:border-danger"
        };
      default:
        return {
          iconBg: "bg-primary/10 group-hover:bg-primary/20",
          iconColor: "text-primary",
          borderHover: "hover:border-primary"
        };
    }
  };

  const colors = getCategoryColors();

  return (
    <Link href={href}>
      <div 
        className={cn(
          "tool-card",
          colors.borderHover,
          className
        )}
        data-testid={`tool-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className={cn("tool-card-icon", colors.iconBg)}>
          <Icon className={cn("text-xl", colors.iconColor)} />
        </div>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}
