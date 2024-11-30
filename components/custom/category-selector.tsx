import { CategoryEnum, VehicleStatus } from "@/types/components";
import { Tool, Vehicle } from "@/types/database";
import React from "react";
import { Pressable, View } from "react-native";
import { AddIcon, CloseCircleIcon, Icon, RemoveIcon } from "../ui/icon";
import Category from "./category";

interface ToolSelectorProps {
    tools: Tool[];
    selectedTools: string[]; // L'état de sélection vient du parent
    toggleToolSelection: (toolId: string) => void; // La fonction de gestion de sélection vient du parent
}

export const ToolSelector: React.FC<ToolSelectorProps> = ({ tools, selectedTools, toggleToolSelection }) => {
    const renderTool = (tool: Tool) => {
        const isSelected = selectedTools.includes(tool.id.toString());

        return (
            <Pressable key={tool.id} className="relative" onPress={() => toggleToolSelection(tool.id.toString())}>
                <View className={`${isSelected ? "opacity-100" : "opacity-60"}`}>
                    <Category category={CategoryEnum.TOOLS} name={tool.name} isLarge={true} showTitle={true} />
                </View>
                <View className={`absolute p-1 ${isSelected ? "bg-red-500" : "bg-green-500"} rounded-full -top-2 -right-2`}>
                    <Icon as={isSelected ? RemoveIcon : AddIcon} className="w-4 h-4 text-white" />
                </View>
            </Pressable>
        );
    };

    return <View className="grid grid-cols-4 gap-6 p-4 rounded-lg bg-card">{tools.map(renderTool)}</View>;
};

interface VehicleSelectorProps {
    vehicles: (Vehicle & { isAvailable: boolean | null })[];
    selectedVehicles: string[]; // L'état de sélection vient du parent
    toggleVehicleSelection: (vehicleId: string) => void; // La fonction de gestion de sélection vient du parent
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({ vehicles, selectedVehicles, toggleVehicleSelection }) => {
    const renderVehicle = (vehicle: Vehicle & { isAvailable: boolean | null }) => {
        const isSelected = selectedVehicles.includes(vehicle.id.toString());
        let icon, iconClass, onPressAction;

        if (vehicle.isAvailable === null) {
            icon = RemoveIcon;
            iconClass = "bg-gray-500";
            onPressAction = null;
        } else if (vehicle.isAvailable) {
            icon = isSelected ? RemoveIcon : AddIcon;
            iconClass = isSelected ? "bg-red-500" : "bg-green-500";
            onPressAction = () => toggleVehicleSelection(vehicle.id.toString());
        } else if (vehicle.status === VehicleStatus.MAINTENANCE) {
            icon = CloseCircleIcon;
            iconClass = "bg-orange-500";
            onPressAction = null;
        } else {
            icon = CloseCircleIcon;
            iconClass = "bg-red-500";
            onPressAction = null;
        }

        return (
            <Pressable key={vehicle.id} className="relative" onPress={onPressAction} disabled={!onPressAction}>
                <View className={`${isSelected ? "opacity-100" : "opacity-60"}`}>
                    <Category category={CategoryEnum.VEHICLES} name={vehicle.model} isLarge={true} showTitle={true} />
                </View>
                <View className={`absolute p-1 ${iconClass} rounded-full -top-1 -right-1`}>
                    <Icon as={icon} className="w-4 h-4 text-white" />
                </View>
            </Pressable>
        );
    };

    return <View className="grid grid-cols-4 gap-10 p-3 pt-4 rounded-md bg-card">{vehicles.map(renderVehicle)}</View>;
};