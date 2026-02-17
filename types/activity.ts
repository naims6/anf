import { LucideIcon } from "lucide-react";

export interface ActivityCardProps {
  slug: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  icon: LucideIcon;
  className?: string;
}

export interface ActivityDetailPreviewProps {
  activity: {
    title: string;
    description: string;
    beneficiaries: string;
    timeline: string;
    location: string;
    goal: string;
  };
}