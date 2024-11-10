import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Box } from "../ui/box";
import { FormControl } from "../ui/form-control";
import { ChevronDownIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "../ui/select";
import { Text } from "../ui/text";

interface CustomFormField {
    key: string;
    label: string;
    placeholder: string;
    type: "text" | "date" | "select";
    required: boolean;
    options?: { label: string; value: string }[];
}

export interface CustomFormProps {
    data: { [key: string]: any };
    fields: CustomFormField[];
}

const CustomForm = (props: CustomFormProps) => {
    const [formValues, setFormValues] = useState<{ [key: string]: any }>(props.data);

    const handleInputChange = (key: string, value: any) => {
        setFormValues({ ...props.data, [key]: value });
    };

    return (
        <FormControl className="flex flex-col items-center justify-center w-full gap-y-5">
            {props.fields.map((field) => (
                <Box key={field.key} className="flex flex-col w-full gap-y-2">
                    <Text className="text-gray-500">{field.label}</Text>

                    {(() => {
                        switch (field.type) {
                            case "select":
                                return field.options ? (
                                    <Select>
                                        <SelectTrigger variant="outline" size="xl">
                                            <SelectInput placeholder="Choisir un statut" />
                                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                        </SelectTrigger>
                                        <SelectPortal>
                                            <SelectBackdrop />
                                            <SelectContent>
                                                <SelectDragIndicatorWrapper>
                                                    <SelectDragIndicator />
                                                </SelectDragIndicatorWrapper>
                                                {field.options.map((option) => (
                                                    <SelectItem key={option.value} label={option.label} value={option.value} />
                                                ))}
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                ) : null;

                            case "date":
                                return (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={new Date(props.data[field.key])}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            const date = selectedDate || props.data[field.key];
                                            handleInputChange(field.key, (date instanceof Date ? date : new Date(date)).toISOString().split("T")[0]);
                                        }}
                                    />
                                );

                            case "text":
                            default:
                                return (
                                    <Input className="w-full" variant="outline" size="xl" isRequired={field.required}>
                                        <InputField type="text" placeholder={field.placeholder} onChangeText={(text) => handleInputChange(field.key, text)} value={formValues[field.key] || ""} />
                                    </Input>
                                );
                        }
                    })()}
                </Box>
            ))}
        </FormControl>
    );
};

export default CustomForm;
