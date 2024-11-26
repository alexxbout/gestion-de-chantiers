import { CategoryEnum, ToolCategoryEnum, VehicleCategoryEnum } from "@/types/components";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { AddIcon, Icon, RemoveIcon } from "../ui/icon";
import Tool from "./tool";

const CategorySelector = (props: { type: CategoryEnum }) => {
    const [selectedTools, setSelectedTools] = useState<string[]>([]);

    const toggleToolSelection = (tool: string) => {
        setSelectedTools((prevSelectedTools) => (prevSelectedTools.includes(tool) ? prevSelectedTools.filter((t) => t !== tool) : [...prevSelectedTools, tool]));
    };

    const renderTool = (tool: string) => {
        const isSelected = selectedTools.includes(tool);
        return (
            <Pressable key={tool} className="relative" onPress={() => toggleToolSelection(tool)}>
                <View className={`${isSelected ? "opacity-100" : "opacity-60"}`}>
                    <Tool category={props.type} name={tool} isLarge={true} showTitle={true} />
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

    const sortedVehicles = Object.values(VehicleCategoryEnum).sort((a, b) => {
        const aSelected = selectedTools.includes(a);
        const bSelected = selectedTools.includes(b);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return 0;
    });

    if (props.type === CategoryEnum.TOOLS) {
        return <View className="grid grid-cols-4 gap-10 p-3 pt-4 rounded-md place-items-center bg-card">{sortedTools.map(renderTool)}</View>;
    } else if (props.type === CategoryEnum.VEHICLES) {
        return <View className="grid grid-cols-4 gap-10 p-3 pt-4 rounded-md place-items-center bg-card">{sortedVehicles.map(renderTool)}</View>;
    }

    return null;
};

export default CategorySelector;
