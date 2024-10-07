export interface User {
    uid: string; // Identifiant unique généré par Firebase Auth
    role: "Chef de chantier" | "Responsable"; // Rôle de l'utilisateur
    name: string; // Nom de l'utilisateur
    email: string; // Email de l'utilisateur
    assignedChantiers: string[]; // Liste des chantiers assignés au chef de chantier
    photoURL?: string; // URL de la photo de profil (facultatif)
}

export interface Chantier {
    id: string; // Identifiant unique du chantier
    title: string; // Titre du chantier
    description: string; // Description du chantier
    status: "Non réalise" | "En cours" | "Interrompu" | "Terminé"; // Statut actuel
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
    anomalies?: Anomaly[]; // Liste des anomalies signalées
    photos?: Photo[]; // Liste des photos du chantier
}

export interface Vehicle {
    id: string; // Identifiant unique du véhicule
    model: string; // Modèle du véhicule
    availability: Date[]; // Disponibilité du véhicule
    status: "disponible" | "En maintenance" | "En utilisation"; // Statut du véhicule
}

export interface Material {
    id: string; // Identifiant unique du matériel
    name: string; // Nom du matériel
    quantity: number; // Quantité disponible
    status: "Disponible" | "En utilisation" | "En reparation"; // Statut du matériel
}

export interface Anomaly {
    id: string; // Identifiant unique de l'anomalie
    message: string; // Description de l'anomalie
    date: Date; // Date de signalement
    reportedBy: string; // Utilisateur ayant signalé l'anomalie
}

export interface Photo {
    id: string; // Identifiant unique de la photo
    url: string; // URL de la photo stockée
    description?: string; // Description de la photo (facultatif)
    uploadedBy: string; // Identifiant de l'utilisateur ayant uploadé la photo
    date: Date; // Date d'upload
}
