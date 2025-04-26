import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [6.4395, -75.3346]; // Coordenadas de El Hatillo, Barbosa

const MapWidget = () => {
    return (
        <div className="relative w-full h-full overflow-hidden shadow-lg rounded-xl">
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                className="z-0 w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        ¡Estamos aquí! Vereda El Cortado, Barbosa, Antioquia.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapWidget;
