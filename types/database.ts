import { ToolCategoryEnum, VehicleCategoryEnum, VehicleStatus } from "./components";

export interface User {
    uid: string; // Identifiant unique généré par Firebase Auth
    id: number; // Identifiant unique de l'utilisateur
    role: "Chef de chantier" | "Responsable" | "Equipier"; // Rôle de l'utilisateur
    name: string; // Nom de l'utilisateur
    email: string; // Email de l'utilisateur
    assignedChantiers: number[]; // Liste des chantiers assignés au chef de chantier
    photoURL?: string; // URL de la photo de profil (facultatif)
}

export interface Team {
    id: number; // Identifiant unique de l'équipe
    name: string; // Nom de l'équipe
    members: number[]; // Liste des identifiants des membres de l'équipe
}

export enum WorksiteStatus {
    NOT_STARTED = "Non réalisé",
    IN_PROGRESS = "En cours",
    INTERRUPTED = "Interrompu",
    COMPLETED = "Terminé",
}

export interface Worksite {
    id: number; // Identifiant unique du chantier
    title: string; // Titre du chantier
    description: string; // Description du chantier
    status: WorksiteStatus; // Statut actuel
    startDate: Date; // Date de début du chantier
    duration: number; // Durée en demi-journées
    location: string; // Lieu du chantier
    client: {
        name: string; // Nom du client
        phone: string; // Numéro de téléphone du client
    };
    vehicles: number[]; // Liste des identifiants des véhicules nécessaires
    materials: number[]; // Liste des identifiants des matériels nécessaires
    team: number; // Identifiant de l'équipe assignée
    defects?: Defect[]; // Liste des anomalies signalées
    pictures?: Picture[]; // Liste des photos du chantier
}

export interface Vehicle {
    id: number; // Identifiant unique du véhicule
    model: VehicleCategoryEnum; // Modèle du véhicule
    period: { // Période de réservation
        start: Date
        end: Date
    }; 
    status: VehicleStatus; // Statut du véhicule
}

export interface Tool {
    id: number; // Identifiant unique du matériel
    name: ToolCategoryEnum; // Nom du matériel
}

export interface Defect {
    id: number; // Identifiant unique de l'anomalie
    description: string; // Description de l'anomalie
    date: string; // Date de signalement
    reportedBy: number; // Utilisateur ayant signalé l'anomalie
}

export interface Picture {
    id: number; // Identifiant unique de la photo
    url: string; // URL de la photo stockée
}
