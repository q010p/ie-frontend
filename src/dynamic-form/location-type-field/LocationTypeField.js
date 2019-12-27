import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

/**
 * 
 * @param initialCenter props required 
 * @function onMarkerChanged(newPosition) props - not required
 */

export function LocationTypeField(props) {
    const [markerPosition, setMarkerPosition] = React.useState(props.initialCenter)
    return (
        <div style={{ position: 'relative', height: '40vh',minWidth:'60vh', maxWidth: '80vh' }}>
            <Map
                onClick={mapOnClick}
                google={props.google}
                zoom={14}
                initialCenter={props.initialCenter}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <Marker position={markerPosition} />

            </Map>
        </div>
    );
    function mapOnClick(mapProps, map, clickEvent) {
        const newPosition = { lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng() };
        setMarkerPosition(newPosition)
        if (props.onMarkerChanged !== undefined)
            props.onMarkerChanged(newPosition)
    }
}



const LoadingContainer = (props) => (
    <div style={{ height: '30vh', width: '30vh' }}>Loading map!</div>
)

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28'),
    LoadingContainer: LoadingContainer
})(LocationTypeField)