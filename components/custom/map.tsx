import axios from "axios";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"; // Import des styles de MapLibre
import React, { useEffect, useRef } from "react";

const apiKey = "gGYYPqONHAle97pfHBV8"; // Remplacez par votre clé API MapTiler

const MapTilerMap = (props: { address: string }) => {
    const mapContainer = useRef<HTMLDivElement>(null); // Référence pour le conteneur de la carte
    const map = useRef<maplibregl.Map | null>(null);

    // Fonction pour récupérer les coordonnées à partir d'une adresse
    const getCoordinatesFromAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
        try {
            const response = await axios.get(
                `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${apiKey}`
            );

            if (response.data && response.data.features && response.data.features.length > 0) {
                const [lng, lat] = response.data.features[0].geometry.coordinates;
                console.log("Coordinates: ", { lat, lng });
                return { lat, lng };
            }
            return null;
        } catch (error) {
            console.error("Error fetching coordinates: ", error);
            return null;
        }
    };

    // Initialisation de la carte avec l'adresse et ajout du repère
    useEffect(() => {
        const initializeMap = async () => {
            const coordinates = await getCoordinatesFromAddress(props.address);

            if (coordinates && mapContainer.current) {
                // Création de la carte
                map.current = new maplibregl.Map({
                    container: mapContainer.current, // Conteneur HTML
                    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`, // Style MapTiler
                    center: [coordinates.lng, coordinates.lat], // Coordonnées obtenues
                    zoom: 14, // Zoom initial
                    maplibreLogo: false, // Masquer le logo MapLibre
                });

                // Ajout du repère
                new maplibregl.Marker({ color: "red" }) // Couleur du repère
                    .setLngLat([coordinates.lng, coordinates.lat]) // Coordonnées du repère
                    .addTo(map.current);
            } else {
                console.error("Impossible de charger la carte : adresse introuvable.");
            }
        };

        initializeMap();

        return () => {
            // Nettoyage
            map.current?.remove();
            map.current = null;
        };
    }, [props.address]); // Recharge la carte si l'adresse change

    return (
        <div
            ref={mapContainer}
            style={{
                width: "100%",
                height: "100%",
                minHeight: "500px",
            }}
        />
    );
};

export default MapTilerMap;