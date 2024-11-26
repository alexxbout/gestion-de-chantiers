import { CategoryEnum, ToolCategoryEnum, VehicleCategoryEnum, VehicleStatus } from "@/types/components";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { AddIcon, CloseCircleIcon, Icon, RemoveIcon, SlashIcon } from "../ui/icon";
import Tool from "./tool";

export const ToolSelector = () => {
    const [selectedTools, setSelectedTools] = useState<string[]>([]);

    const toggleToolSelection = (tool: string) => {
        setSelectedTools((prevSelectedTools) => (prevSelectedTools.includes(tool) ? prevSelectedTools.filter((t) => t !== tool) : [...prevSelectedTools, tool]));
    };

    const renderTool = (tool: string) => {
        const isSelected = selectedTools.includes(tool);
        return (
            <Pressable key={tool} className="relative" onPress={() => toggleToolSelection(tool)}>
                <View className={`${isSelected ? "opacity-100" : "opacity-60"}`}>
                    <Tool category={CategoryEnum.TOOLS} name={tool} isLarge={true} showTitle={true} />
                </View>
                {isSelected ? (
                    <View className="absolute p-1 bg-red-500 rounded-full -top-1 -right-1">
                        <Icon as={RemoveIcon} className="w-4 h-4 text-white" />
                    </View>
                ) : (
                    <View className="absolute p-1 bg-green-500 rounded-full -top-1 -right-1">
                        <Icon as={AddIcon} className="w-4 h-4 text-white" />
                    </View>
                )}
            </Pressable>
        );
    };

    const sortedTools = Object.values(ToolCategoryEnum).sort((a, b) => {
        const aSelected = selectedTools.includes(a);
        const bSelected = selectedTools.includes(b);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return 0;
    });

    return <View className="grid grid-cols-4 gap-10 p-3 pt-4 rounded-md place-items-center bg-card">{sortedTools.map(renderTool)}</View>;
};

export const VehicleSelector = (props: { status: VehicleStatus }) => {
    const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);

    const toggleVehicleSelection = (vehicle: string) => {
        if (props.status === "disponible") {
            setSelectedVehicles((prevSelectedVehicles) => (prevSelectedVehicles.includes(vehicle) ? prevSelectedVehicles.filter((v) => v !== vehicle) : [...prevSelectedVehicles, vehicle]));
        }
    };

    const renderVehicle = (vehicle: string) => {
        const isSelected = selectedVehicles.includes(vehicle);
        let icon, iconClass;

        switch (props.status) {
            case VehicleStatus.AVAILABLE:
                icon = isSelected ? RemoveIcon : AddIcon;
                iconClass = isSelected ? "bg-red-500" : "bg-green-500";
                break;
            case VehicleStatus.IN_USE:
                icon = SlashIcon;
                iconClass = "bg-red-500";
                break;
            case VehicleStatus.MAINTENANCE:
                icon = CloseCircleIcon;
                iconClass = "bg-orange-500";
                break;
            default:
                icon = isSelected ? RemoveIcon : AddIcon;
                iconClass = isSelected ? "bg-red-500" : "bg-green-500";
                break;
        }

        return (
            <Pressable key={vehicle} className="relative" onPress={() => toggleVehicleSelection(vehicle)}>
                <View className={`${isSelected ? "opacity-100" : "opacity-60"}`}>
                    <Tool category={CategoryEnum.VEHICLES} name={vehicle} isLarge={true} showTitle={true} />
                </View>
                <View className={`absolute p-1 ${iconClass} rounded-full -top-1 -right-1`}>
                    <Icon as={icon} className="w-4 h-4 text-white" />
                </View>
            </Pressable>
        );
    };

    const sortedVehicles = Object.values(VehicleCategoryEnum).sort((a, b) => {
        const aSelected = selectedVehicles.includes(a);
        const bSelected = selectedVehicles.includes(b);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return 0;
    });

    return <View className="grid grid-cols-4 gap-10 p-3 pt-4 rounded-md place-items-center bg-card">{sortedVehicles.map(renderVehicle)}</View>;
};