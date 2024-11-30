import { CategoryEnum } from "@/types/components";
import { View } from "react-native";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

const imagePaths: { [key in CategoryEnum]: { [key: string]: any } } = {
    tools: {
        brique: require("/assets/images/icones/tools/brique.svg"),
        brouette: require("/assets/images/icones/tools/brouette.svg"),
        cle: require("/assets/images/icones/tools/cle.svg"),
        conteneur: require("/assets/images/icones/tools/conteneur.svg"),
        crochet: require("/assets/images/icones/tools/crochet.svg"),
        ecrou: require("/assets/images/icones/tools/ecrou.svg"),
        grue: require("/assets/images/icones/tools/grue.svg"),
        marteau: require("/assets/images/icones/tools/marteau.svg"),
        peinture: require("/assets/images/icones/tools/peinture.svg"),
        pelle: require("/assets/images/icones/tools/pelle.svg"),
        perceuse: require("/assets/images/icones/tools/perceuse.svg"),
        sceau: require("/assets/images/icones/tools/sceau.svg"),
        tournevis: require("/assets/images/icones/tools/tournevis.svg"),
        tuyaux: require("/assets/images/icones/tools/tuyaux.svg"),
        vis: require("/assets/images/icones/tools/vis.svg"),
    },
    vehicles: {
        beton: require("/assets/images/icones/vehicules/beton.svg"),
        camion: require("/assets/images/icones/vehicules/camion.svg"),
        construction: require("/assets/images/icones/vehicules/construction.svg"),
        destruction: require("/assets/images/icones/vehicules/destruction.svg"),
        grue: require("/assets/images/icones/vehicules/grue.svg"),
        levage: require("/assets/images/icones/vehicules/levage.svg"),
    },
};

const Category = (props: { category: CategoryEnum; name: string; isLarge?: boolean; showTitle?: boolean }) => {
    const imagePath = imagePaths[props.category as CategoryEnum][props.name];

    return (
        <View className="flex flex-col items-center justify-center gap-y-2">
            <Image className={props.isLarge ? "w-[40px] h-[40px]" : "w-[30px] h-[30px]"} source={imagePath} />{props.showTitle ? <Text className="text-xs text-center">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</Text> : <></>}
        </View>
    );
};

export default Category;
