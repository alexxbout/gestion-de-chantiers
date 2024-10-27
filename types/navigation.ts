import { Chantier } from "./database";

export type RootStackParamList = {
    home: undefined;
    login: undefined;
    app: undefined;
    worksiteCard: WorksiteProp;
    worksiteDetails: { id: number };
};

export type WorksiteProp = {
    id: number;
    title: string;
    description: string;
    startDate: string;
    status: Chantier["status"];
};
