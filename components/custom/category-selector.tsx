import { CategoryEnum, ToolCategoryEnum, VehicleStatus } from "@/types/components";
import { Vehicle } from "@/types/database";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { AddIcon, CloseCircleIcon, Icon, RemoveIcon } from "../ui/icon";
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

interface VehicleSelectorProps {
    vehicles: (Vehicle & { isAvailable: boolean | null })[]; // null = information manquante
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({ vehicles }) => {
    const renderVehicle = (vehicle: Vehicle & { isAvailable: boolean | null }) => {
        let icon, iconClass;

        if (vehicle.isAvailable === null) {
            // Informations manquantes
            icon = RemoveIcon;
            iconClass = "bg-gray-500";
        } else if (vehicle.isAvailable) {
            // Disponible
            icon = AddIcon;
            iconClass = "bg-green-500";
        } else if (vehicle.status === VehicleStatus.MAINTENANCE) {
            // En maintenance
            icon = CloseCircleIcon;
            iconClass = "bg-orange-500";
        } else {
            // Indisponible
            icon = CloseCircleIcon;
            iconClass = "bg-red-500";
        }

        return (
            <Pressable key={vehicle.id} className="relative">
                <View className="opacity-80">
                    <Tool category={CategoryEnum.VEHICLES} name={vehicle.model} isLarge={true} showTitle={true} />
                </View>
                <View className={`absolute p-1 ${iconClass} rounded-full -top-1 -right-1`}>
                    <Icon as={icon} className="w-4 h-4 text-white" />
                </View>
            </Pressable>
        );
    };

    return (
        <View className="grid grid-cols-4 gap-10 p-3 pt-4 rounded-md bg-card">
            {vehicles.map(renderVehicle)}
        </View>
    );
};