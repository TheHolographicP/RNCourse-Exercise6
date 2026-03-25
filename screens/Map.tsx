import { useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';


import { MapScreenProps } from 'types/navigation';
import { Location as PlaceLocation } from 'model/place';
import { IconButton } from 'components/IconButton';

export function Map({ route, navigation }: MapScreenProps) {
    const [selectedLocation, setSelectedLocation] = useState<PlaceLocation | undefined>(() => route.params?.location);
    

    const initialLocation = route.params?.location;

    const region = {
        latitude: initialLocation?.lat || 51.105813,
        longitude: initialLocation?.lng || -115.342326,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const selectLocationHandler = (event: MapPressEvent) => {
        const selectedLocation = {
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        };

        setSelectedLocation(selectedLocation);
    }

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={region}
            showsMyLocationButton={true}
            showsUserLocation={true}
            onPress={selectLocationHandler}
        >
            {selectedLocation && (
                <Marker
                    coordinate={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                    }}
                    
                />
            )}
        </MapView>
    );
};