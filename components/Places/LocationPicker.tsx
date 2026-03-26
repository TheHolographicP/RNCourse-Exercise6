import { use, useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { getCurrentPositionAsync, getLastKnownPositionAsync, LocationAccuracy, reverseGeocodeAsync, useForegroundPermissions } from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

import { OutlinedButton } from 'components/OutlinedButton';

import type { Location } from 'model/place';
import { AddPlaceScreenProps, RootStackNavigationProp } from 'types/navigation';

import LAYOUT from 'constants/layout';
import { Colors } from 'constants/colors';

type Props = {
    onChangeLocation: (location: Location) => void;
    onChangeAddress: (address: string) => void;
    initialLocation?: Location;
    initialAddress?: string;
}

export function LocationPicker({ onChangeLocation, onChangeAddress, initialLocation, initialAddress }: Props) {
    const navigation = useNavigation<RootStackNavigationProp>();
    const route = useRoute<AddPlaceScreenProps['route']>();
    
    const [location, setLocation] = useState<Location>();
    const [selectedLocation, setSelectedLocation] = useState<Location>();
    const [selectedAddress, setSelectedAddress] = useState<string>();

    const [permission, requestPermission] = useForegroundPermissions();

    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);

    async function verifyPermissions() {
        if (permission && permission.status !== 'granted') {
            const { status } = await requestPermission();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return false;
            }
        }
        return true;
    }
    
    useEffect(() => {
        async function fetchLocation() {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                return;
            }
            
            const position = await getCurrentPositionAsync({accuracy: LocationAccuracy.High});
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        }
        
        fetchLocation();
    }, []);

    useEffect(() => {
        if (initialLocation) {
            setSelectedLocation(initialLocation);
            setSelectedAddress(initialAddress);
            onChangeLocation(initialLocation);
        }
    }, [initialLocation]);

    useEffect(() => {
        const pickedLocation = route.params?.pickedLocation;
        if (pickedLocation) {
            setSelectedLocation(pickedLocation);
            onChangeLocation(pickedLocation);
            setIsLoadingAddress(true);
            determineAddress(pickedLocation);
        }
    }, [route.params?.pickedLocation]);
    
    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        setIsLoadingLocation(true);
        var position = await getLastKnownPositionAsync({maxAge: 1000 * 5});
        if (!position) {
            position = await getCurrentPositionAsync({accuracy: LocationAccuracy.High});
        }

        const locationResult: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        setLocation(locationResult);

        setSelectedLocation(locationResult);
        onChangeLocation(locationResult);
        setIsLoadingLocation(false);
        determineAddress(locationResult);
    }

    async function determineAddress(location: Location) {
        setIsLoadingAddress(true);
        const results = await reverseGeocodeAsync({
            latitude: location.lat,
            longitude: location.lng
        });
        if (results.length === 0) {
            return '';
        }
        const address = `${results[0].name}, ${results[0].city}, ${results[0].region}, ${results[0].country}`;
        setSelectedAddress(address);
        onChangeAddress(address);
        setIsLoadingAddress(false);
        return address;
    }

    function pickOnMapHandler() {
        var mapCenter = location
        if (selectedLocation) {
            mapCenter = selectedLocation;
        }

        navigation.navigate('Map', { location: mapCenter });

    }

    return (
        <View>
            <Text style={styles.inputLabel}>Location Picker:</Text>
            <View style={styles.locationPreview}>
                {isLoadingLocation ? (
                    <ActivityIndicator size="large" color={Colors.primary500} />
                ) : selectedLocation ? (
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }} 
                    >
                        <Marker
                            coordinate={{
                                latitude: selectedLocation.lat,
                                longitude: selectedLocation.lng,
                            }}
                        />
                    </MapView>
                ) : (
                    <Text>No location picked yet.</Text>
                )}
            </View>
            <View style={styles.buttonsContainer}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>Use Current Location</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
            <View style={styles.textContainer}>
                {isLoadingAddress ? (
                    <ActivityIndicator size="small" color={Colors.primary500} />
                ) : (
                    <Text>{selectedAddress ? `Address: ${selectedAddress}` : 'No address determined yet.'}</Text>
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        alignItems: 'center'
    },
    locationPreview: {
        borderRadius: LAYOUT.borderRadius,
        backgroundColor: Colors.primary100,
        width: '100%',
        aspectRatio: 16 / 9,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    textContainer:{
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 1,
        backgroundColor: Colors.primary100,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: LAYOUT.padding,
        gap: LAYOUT.gap
    },
    inputLabel: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 16,
        color: Colors.primary500,
        alignSelf: 'flex-start'
    }
});