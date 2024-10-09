import { Text } from "react-native";

interface Props {
    title: string;
}

export default function Header(props: Props) {
    return <Text className="text-3xl font-semibold">{props.title}</Text>;
}
