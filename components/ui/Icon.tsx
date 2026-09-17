import {
  Blend,
  Braces,
  ClipboardCheck,
  Compass,
  CreditCard,
  FileCheck,
  FlaskConical,
  GraduationCap,
  HandCoins,
  Landmark,
  Layers,
  Lock,
  Mail,
  MapPin,
  MonitorSmartphone,
  MousePointerClick,
  Package,
  PenTool,
  Plug,
  Repeat,
  Rocket,
  Ruler,
  ScanSearch,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Store,
  TrendingUp,
  Truck,
  Webhook,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/icons";
import { cn } from "@/lib/utils";

const icons = {
  smartphone: Smartphone,
  store: Store,
  "shopping-cart": ShoppingCart,
  truck: Truck,
  "graduation-cap": GraduationCap,
  "monitor-smartphone": MonitorSmartphone,
  "credit-card": CreditCard,
  repeat: Repeat,
  "scan-search": ScanSearch,
  "pen-tool": PenTool,
  plug: Plug,
  rocket: Rocket,
  "clipboard-check": ClipboardCheck,
  landmark: Landmark,
  lock: Lock,
  "shield-check": ShieldCheck,
  compass: Compass,
  ruler: Ruler,
  "trending-up": TrendingUp,
  braces: Braces,
  webhook: Webhook,
  "flask-conical": FlaskConical,
  package: Package,
  "mouse-pointer-click": MousePointerClick,
  "file-check": FileCheck,
  "hand-coins": HandCoins,
  layers: Layers,
  blend: Blend,
  mail: Mail,
  "map-pin": MapPin,
} satisfies Record<IconName, LucideIcon>;

interface IconProps extends LucideProps {
  name: IconName;
}

/** Decorative icon resolved from a content icon name. Always hidden from assistive tech. */
export function Icon({ name, ...props }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" focusable="false" {...props} />;
}

interface IconTileProps {
  name: IconName;
  className?: string;
  tone?: "default" | "ink";
}

/** Icon on a soft rounded tile, used at the top of cards. */
export function IconTile({ name, className, tone = "default" }: IconTileProps) {
  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-xl",
        tone === "default" ? "bg-primary-soft text-primary" : "bg-ink-surface text-ink-primary",
        className,
      )}
    >
      <Icon name={name} className="size-5" strokeWidth={1.75} />
    </span>
  );
}
