import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corregir los iconos de marcadores que podrían estar causando problemas
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const position = [6.41278681361915, -75.37939263995182]; // Coordenadas de El Hatillo, Barbosa

const MapWidget = () => {
    useEffect(() => {
        // Forzar un resize del mapa cuando el componente se monta
        const handleResize = () => {
            window.dispatchEvent(new Event('resize'));
        };

        // Esperar a que el DOM esté completamente cargado
        setTimeout(handleResize, 300);

        return () => {
            // Limpieza al desmontar
        };
    }, []);

    return (
        <div className="w-full h-full" style={{ position: 'relative', minHeight: '300px' }}>
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                whenCreated={(mapInstance) => {
                    // Invalidar el tamaño del mapa después de que se crea
                    setTimeout(() => {
                        mapInstance.invalidateSize();
                    }, 100);
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        ¡Estamos aquí! Hosteria Los Lagos Spa.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapWidget;