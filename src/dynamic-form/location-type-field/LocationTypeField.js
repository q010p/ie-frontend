import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class LocationTypeField extends React.Component {

    render() {
        return (
            <div style= {{position:'relative' ,height:'40vh' ,width:'100vh'}}>
                <Map
                    google={this.props.google} zoom={14}
                    initialCenter={{
                        lat: 42.39,
                        lng: -72.52
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                </Map>
            </div>
        );
    }
}

const LoadingContainer = (props) => (
    <div style={{ height: '30vh', width: '30vh' }}>Fancy loading container!</div>
)

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28'),
    LoadingContainer: LoadingContainer
})(LocationTypeField)