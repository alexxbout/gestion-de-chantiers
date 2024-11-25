import { Image } from "../ui/image";

const imagePaths: { tools: { [key: string]: string }; vehicules: { [key: string]: string } } = {
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
    vehicules: {
        beton: require("/assets/images/icones/vehicules/beton.svg"),
        camion: require("/assets/images/icones/vehicules/camion.svg"),
        construction: require("/assets/images/icones/vehicules/construction.svg"),
        destruction: require("/assets/images/icones/vehicules/destruction.svg"),
        grue: require("/assets/images/icones/vehicules/grue.svg"),
        levage: require("/assets/images/icones/vehicules/levage.svg"),
    },
};

const Tool = (props: { category: "tools" | "vehicules"; name: string }) => {
    const imagePath = imagePaths[props.category][props.name];

    return <Image className="w-[30px] h-[30px]" source={imagePath} />;
};

export default Tool;
