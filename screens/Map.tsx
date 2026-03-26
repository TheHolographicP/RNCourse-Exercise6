import { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';


import { MapScreenProps } from 'types/navigation';
import { Location as PlaceLocation } from 'model/place';
import { IconButton } from 'components/IconButton';

export function Map({ route, navigation }: MapScreenProps) {
    const [selectedLocation, setSelectedLocation] = useState<PlaceLocation | undefined>(() => route.params?.location);

    const initialLocation = route.params?.location;
    const readOnly = route.params?.readOnly;

    const region = {
        latitude: initialLocation?.lat || 51.105813,
        longitude: initialLocation?.lng || -115.342326,
        latitudeDelta: 0.366,
        longitudeDelta: 0.16
    };

    const selectLocationHandler = (event: MapPressEvent) => {
        const selectedLocation = {
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        };

        setSelectedLocation(selectedLocation);
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            // Show an alert or toast to inform the user to select a location
            return;
        }

        navigation.navigate('AddPlace', { pickedLocation: selectedLocation }, {pop: true});
    }, [navigation, selectedLocation]);

    
    useLayoutEffect(() => {
        if (readOnly) {
            return;
        }
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <IconButton
                    icon="save"
                    size={24}
                    iconColor={tintColor}
                    onPress={savePickedLocationHandler}
                />
            ),
        }); 
    }, [navigation, savePickedLocationHandler]);

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={region}
            showsMyLocationButton={true}
            showsUserLocation={true}
            onPress={readOnly ? undefined : selectLocationHandler}
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