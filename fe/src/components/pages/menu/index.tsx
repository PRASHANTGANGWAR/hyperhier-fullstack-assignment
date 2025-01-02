/* eslint-disable tailwindcss/no-arbitrary-value */
/* eslint-disable space-before-function-paren */
"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Loader2, Pencil, PlusCircle, Trash } from "lucide-react";
import { toast } from "sonner";

import Submenu from "@/assets/submenu.svg";
import DefaultLayout from "@/components/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiClient } from "@/lib/apiClient";

import CreateHierarchyForm from "./create/CreateHierarchyForm";

type MenuData = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type HierarchyData = {
  id: string;
  name: string;
  parentId: string | null;
  depth: number;
  superParentId: string;
};

// eslint-disable-next-line complexity
const Menu = () => {
  const navigate = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [isLoadingMenus, setIsLoadingMenus] = useState(false);
  const [selectedMenuData, setSelectedMenuData] = useState<{
    id: string;
    name: string;
    parentId?: string;
    superParentId?: string;
    depth?: number;
  }>({
    id: "",
    name: "",
  });
  const [subMenuData, setSubMenuData] = useState<{
    id: string;
    name: string;
    parentId?: string;
    superParentId?: string;
    depth?: number;
  }>({
    id: "",
    name: "",
  });
  const [hierarchy, setHierarchy] = useState<HierarchyData[]>([]);
  const [isLoadingHierarchy, setIsLoadingHierarchy] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [actionType, setActionType] = useState<"add" | "update" | "delete">("add");

  const fetchMenuData = async () => {
    setIsLoadingMenus(true);
    try {
      const response = (await apiClient(`${process.env.NEXT_PUBLIC_API_URL}/menu`, "GET")) as {
        data: {
          success: boolean;
          code: number;
          message: string;
          data: MenuData[];
        };
        error?: string;
      };
      setMenuData(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch menus.");
    } finally {
      setIsLoadingMenus(false);
    }
  };

  const handleSetSubMenuData = (child: HierarchyData, type: "add" | "update" | "delete") => {
    setSubMenuData({
      id: child.id,
      name: child.name,
      parentId: child.parentId ?? "",
      depth: child.depth + 1,
      superParentId: child.superParentId,
    });
    setActionType(type);
    if (type == "delete") {
      setIsDrawerOpen(true);
      setShowCard(false);
    } else {
      setShowCard(true);
    }
  };

  const fetchHierarchy = async (menuId: string) => {
    setSelectedMenuData(menuData.find((item) => item.id === menuId) ?? { id: "", name: "" });
    setIsLoadingHierarchy(true);
    try {
      const response = (await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/menu-hierarchy/menu-id/${menuId}`,
        "GET",
      )) as {
        data: {
          success: boolean;
          code: number;
          message: string;
          data: HierarchyData[];
        };
        error?: string;
      };
      setHierarchy(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch hierarchy.");
    } finally {
      setShowCard(false);
      setIsLoadingHierarchy(false);
    }
  };

  const renderHierarchy = (data: HierarchyData[], parentId: string | null) => {
    const children = data.filter((item) => item.parentId === parentId);

    if (!children.length) return null;

    return (
      <ul className="border-l-2 border-gray-300 pl-4">
        {children.map((child) => (
          <li key={child.id} className="my-2">
            <div className="relative flex items-center gap-4">
              <span className="relative">
                <span className="absolute -left-2 top-1/2 h-[2px] w-[18px] -translate-y-1/2 bg-gray-300" />
                <span className="relative pl-4">{child.name}</span>
              </span>

              <div
                className="cursor-pointer rounded-md p-2 hover:bg-gray-200"
                onClick={() => {
                  handleSetSubMenuData(child, "add");
                }}
              >
                <PlusCircle className="cursor-pointer text-primary" />
              </div>
              <div
                className="cursor-pointer rounded-md p-2 hover:bg-gray-200"
                onClick={() => {
                  handleSetSubMenuData(child, "update");
                }}
              >
                <Pencil className="cursor-pointer text-green-500" />
              </div>
              <div
                className="cursor-pointer rounded-md p-2 hover:bg-gray-200"
                onClick={() => {
                  handleSetSubMenuData(child, "delete");
                }}
              >
                <Trash className="cursor-pointer text-red-500" />
              </div>
            </div>

            {renderHierarchy(data, child.id)}
          </li>
        ))}
      </ul>
    );
  };

  const handleDeleteMenu = async (id: string) => {
    try {
      const response = await apiClient(`${process.env.NEXT_PUBLIC_API_URL}/menu-hierarchy/${id}`, "DELETE");

      if (response.error) {
        return toast.error("Error while deleting menu");
      }
      toast.success("Menu Deleted Successfully");

      setIsDrawerOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Error in Service");
    }
  };

  useEffect(() => {
    void fetchMenuData();
  }, []);

  return (
    <DefaultLayout breadcrumbItems={[{ name: "Menu", href: "/menu" }]}>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary p-3">
              <Image src={Submenu} alt="sub-menu" height={15} width={15} />
            </div>
            <span className="text-2xl font-semibold">Menus</span>
          </div>
          <Button onClick={() => navigate.push("/menu/create")} className="text-white hover:text-black">
            Create Menu
          </Button>
        </div>

        {/* Menu Select */}
        <div className="w-1/3">
          {isLoadingMenus ? (
            <Loader2 className="animate-spin text-primary" />
          ) : (
            <Select onValueChange={fetchHierarchy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Menu" />
              </SelectTrigger>
              <SelectContent>
                {menuData.map((menu) => (
                  <SelectItem key={menu.id} value={menu.id}>
                    {menu.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Hierarchy */}
        <div>
          {isLoadingHierarchy ? (
            <Loader2 className="animate-spin text-primary" />
          ) : selectedMenuData.id.length && hierarchy.length ? (
            <div className="relative w-full">
              <div className="relative w-full">
                <ul>
                  <li key={selectedMenuData.id}>
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <span>{selectedMenuData.name}</span>
                    </div>

                    {renderHierarchy(hierarchy, selectedMenuData.id)}
                  </li>
                </ul>

                {showCard && subMenuData.id && (
                  <div className="absolute right-0 top-0 w-1/2">
                    <CreateHierarchyForm
                      menuId={subMenuData.id}
                      parentDataName={subMenuData.name}
                      superParentId={subMenuData.superParentId ?? ""}
                      depth={subMenuData.depth ?? 0}
                      closeCard={() => setShowCard(false)}
                      type={actionType}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-1/2">
              {selectedMenuData.id.length ? (
                <>
                  {!showCard && <p className="mb-2 text-sm text-yellow-500">No Sub Menu found. Please create one.</p>}

                  <Button className="mb-4 text-white hover:text-black" onClick={() => setShowCard(!showCard)}>
                    Create Sub Menu
                  </Button>
                </>
              ) : (
                <p className="text-sm">Select Menu to see hierarchy</p>
              )}
              {showCard && !hierarchy.length && (
                <CreateHierarchyForm
                  menuId={selectedMenuData.id}
                  parentDataName={selectedMenuData.name}
                  superParentId={selectedMenuData.id}
                  depth={1}
                  closeCard={() => setShowCard(false)}
                  type={actionType}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent className="flex flex-col items-center justify-center gap-4 space-y-8">
          <DrawerHeader className="flex flex-col items-center justify-center p-2">
            <DrawerTitle>Deleting Menu</DrawerTitle>
            <div className="mb-10 flex flex-col items-center justify-center gap-4">
              <span className="w-[70%] text-center">
                Are you sure you want to delete menu with name : <strong>{subMenuData.name}</strong> id:{" "}
                <strong>{subMenuData.id}</strong>
              </span>
              <div className="flex w-[70%] flex-row items-center justify-center gap-5">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    handleDeleteMenu(subMenuData.id);
                  }}
                >
                  Yes
                </Button>
                <Button variant="secondary" className="w-full" onClick={() => setIsDrawerOpen(false)}>
                  No
                </Button>
              </div>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </DefaultLayout>
  );
};

export default Menu;
