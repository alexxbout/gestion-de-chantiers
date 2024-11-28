import React, { useEffect, useState } from "react";
import { Box } from "../ui/box";
import { FormControl } from "../ui/form-control";
import { ChevronDownIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "../ui/select";
import { Text } from "../ui/text";

export interface CustomFormField {
    key: string;
    label: string;
    placeholder: string;
    type: "text" | "select" | "date";
    required: boolean;
    options?: CustomFormOption[];
}

export interface CustomFormOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface CustomFormProps {
    data: { [key: string]: any };
    fields: CustomFormField[];
    onFormValuesChange?: (values: { [key: string]: any }) => void;
}

const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const lastObj = keys.reduce((acc, key) => (acc[key] = acc[key] || {}), obj);
    lastObj[lastKey!] = value;
};

const CustomForm = (props: CustomFormProps) => {
    const [formValues, setFormValues] = useState<{ [key: string]: any }>(props.data);

    const handleInputChange = (key: string, value: any) => {
        const updatedValues = { ...formValues };
        setNestedValue(updatedValues, key, value);
        setFormValues(updatedValues);
        if (props.onFormValuesChange) {
            props.onFormValuesChange(updatedValues);
        }
    };

    useEffect(() => {
        setFormValues(props.data);
    }, [props.data]);

    return (
        <FormControl className="flex flex-col items-center justify-center w-full gap-y-5">
            {props.fields.map((field) => (
                <Box key={field.key} className="flex flex-col w-full gap-y-2">
                    <Text className="text-gray-500">{field.label}</Text>
                    {(() => {
                        switch (field.type) {
                            case "select":
                                return field.options ? (
                                    <Select selectedValue={getNestedValue(formValues, field.key)} onValueChange={(value) => handleInputChange(field.key, value)}>
                                        <SelectTrigger variant="outline" size="xl">
                                            <SelectInput placeholder={field.placeholder} />
                                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                        </SelectTrigger>
                                        <SelectPortal>
                                            <SelectBackdrop />
                                            <SelectContent>
                                                <SelectDragIndicatorWrapper>
                                                    <SelectDragIndicator />
                                                </SelectDragIndicatorWrapper>
                                                {field.options.map((option) => (
                                                    <SelectItem key={option.value} label={option.label} value={option.value} isDisabled={option.disabled} />
                                                ))}
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                ) : null;
                            case "text":
                            default:
                                return (
                                    <Input className="w-full" variant="outline" size="xl" isRequired={field.required}>
                                        <InputField type="text" placeholder={field.placeholder} onChangeText={(text) => handleInputChange(field.key, text)} value={getNestedValue(formValues, field.key) || ""} />
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
