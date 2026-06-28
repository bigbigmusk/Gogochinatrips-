import {
  MapPin,
  MessageCircle,
  ShieldCheck,
  Lock,
  Clock,
  Users,
  Ban,
  LifeBuoy,
  Headphones,
  type LucideIcon,
} from "lucide-react";

/** Maps content icon names (stored as strings) to Lucide components. */
const REGISTRY: Record<string, LucideIcon> = {
  MapPin,
  MessageCircle,
  ShieldCheck,
  Lock,
  Clock,
  Users,
  Ban,
  LifeBuoy,
  Headphones,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = REGISTRY[name] ?? MapPin;
  return <Cmp className={className} aria-hidden="true" />;
}
