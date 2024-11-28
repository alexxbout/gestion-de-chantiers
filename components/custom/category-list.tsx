import { CategoryEnum } from "@/types/components";
import { Tool, Vehicle } from "@/types/database";
import React from "react";
import { View } from "react-native";
import ToolComponent from "./tool";

const CategoryList = (props: { category: CategoryEnum; items: Tool[] | Vehicle[] }) => {
    const renderTool = (tool: Tool) => (
        <View key={tool.id}>
            <ToolComponent category={props.category} name={tool.name} isLarge={true} showTitle={true} />
        </View>
    );

    const renderVehicle = (vehicle: Vehicle) => (
        <View key={vehicle.id}>
            <ToolComponent category={props.category} name={vehicle.model} isLarge={true} showTitle={true} />
        </View>
    );

    return <View className="grid grid-cols-4 gap-10 p-3 pt-4 rounded-md place-items-center bg-card">{props.category === CategoryEnum.TOOLS ? (props.items as Tool[]).map(renderTool) : (props.items as Vehicle[]).map(renderVehicle)}</View>;
};

export default CategoryList;