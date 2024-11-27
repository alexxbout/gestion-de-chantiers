import { Worksite } from "./database";

export type RootStackParamList = {
    home: undefined;
    login: undefined;
    app: undefined;
    worksite_card: Worksite;
    worksite_details: { id: number };
    worksites: undefined;
};
