import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Tag,
  Ticket,
  ToolCase,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Readonly<Record<string, LucideIcon>> = {
  briefcase: BriefcaseBusiness,
  car: CarFront,
  health: HeartPulse,
  investment: PiggyBank,
  market: ShoppingCart,
  entertainment: Ticket,
  toolCase: ToolCase,
  food: Utensils,
  pet: PawPrint,
  home: House,
  gift: Gift,
  fitness: Dumbbell,
  education: BookOpen,
  travel: BaggageClaim,
  mailbox: Mailbox,
  receipt: ReceiptText,
  generic: Tag,
} as const;

export const CATEGORY_COLORS: Readonly<
  Record<
    string,
    {
      icon: string;
      badge: string;
    }
  >
> = {
  green: {
    icon: "bg-green-100 text-green-600",
    badge: "bg-green-100 text-green-700",
  },
  blue: {
    icon: "bg-blue-100 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  purple: {
    icon: "bg-purple-100 text-purple-600",
    badge: "bg-purple-100 text-purple-700",
  },
  pink: {
    icon: "bg-pink-100 text-pink-600",
    badge: "bg-pink-100 text-pink-700",
  },
  red: {
    icon: "bg-red-100 text-red-600",
    badge: "bg-red-100 text-red-700",
  },
  orange: {
    icon: "bg-orange-100 text-orange-600",
    badge: "bg-orange-100 text-orange-700",
  },
  yellow: {
    icon: "bg-yellow-100 text-yellow-700",
    badge: "bg-yellow-100 text-yellow-700",
  },
};

export const DEFAULT_CATEGORY_ICON = Tag;
export const DEFAULT_CATEGORY_COLOR = CATEGORY_COLORS.blue;
