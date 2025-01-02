import { Blocks, Folder, LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  path: string;
  icon?: LucideIcon;
}

export interface NavMainItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subItems?: NavSubItem[];
}

export interface NavGroup {
  id: number;
  label: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "",
    items: [
      {
        title: "System",
        path: "#",
        icon: Folder,
        subItems: [
          { title: "System Code", path: "", icon: Blocks },
          { title: "Properties", path: "", icon: Blocks },
          { title: "Menu", path: "/menu", icon: Blocks },
          { title: "Api List", path: "", icon: Blocks },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "",
    items: [
      {
        title: "Users & Group",
        path: "",
        icon: Folder,
        isActive: true,
      },
    ],
  },
];
