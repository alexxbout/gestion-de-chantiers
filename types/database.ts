export interface User {
    uid: string; // Identifiant unique généré par Firebase Auth
    role: "Chef de chantier" | "Responsable" | "Equipier"; // Rôle de l'utilisateur
    name: string; // Nom de l'utilisateur
    email: string; // Email de l'utilisateur
    assignedChantiers: number[]; // Liste des chantiers assignés au chef de chantier
    photoURL?: string; // URL de la photo de profil (facultatif)
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
    vehicles: string[]; // Liste des identifiants des véhicules nécessaires
    materials: string[]; // Liste des identifiants des matériels nécessaires
    team: string[]; // Liste des identifiants des membres de l'équipe
    defects?: Defect[]; // Liste des anomalies signalées
    pictures?: Picture[]; // Liste des photos du chantier
}

export interface Vehicle {
    id: number; // Identifiant unique du véhicule
    model: string; // Modèle du véhicule
    availability: Date[]; // Disponibilité du véhicule
    status: "disponible" | "En maintenance" | "En utilisation"; // Statut du véhicule
}

export interface Material {
    id: number; // Identifiant unique du matériel
    name: string; // Nom du matériel
    quantity: number; // Quantité disponible
    status: "Disponible" | "En utilisation" | "En reparation"; // Statut du matériel
}

export interface Defect {
    id: number; // Identifiant unique de l'anomalie
    description: string; // Description de l'anomalie
    date: string; // Date de signalement
    reportedBy: string; // Utilisateur ayant signalé l'anomalie
}

export interface Picture {
    id: number; // Identifiant unique de la photo
    url: string; // URL de la photo stockée
    description?: string; // Description de la photo (facultatif)
    uploadedBy: string; // Identifiant de l'utilisateur ayant uploadé la photo
    date: string; // Date d'upload
}
