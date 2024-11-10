import { WorksiteStatus } from "./database";

export type RootStackParamList = {
    home: undefined;
    login: undefined;
    app: undefined;
    worksite_card: WorksiteProp;
    worksite_details: { id: number };
};

export type WorksiteProp = {
    id: number;
    title: string;
    description: string;
    start_date: string;
    status: WorksiteStatus;
};
