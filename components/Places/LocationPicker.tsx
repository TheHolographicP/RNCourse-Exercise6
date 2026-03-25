import { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { getCurrentPositionAsync, getLastKnownPositionAsync, LocationAccuracy, useForegroundPermissions } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

import { OutlinedButton } from 'components/OutlinedButton';

import type { Location } from 'model/place';
import { RootStackNavigationProp } from 'types/navigation';

import LAYOUT from 'constants/layout';
import { Colors } from 'constants/colors';


export function LocationPicker() {
    const navigation = useNavigation<RootStackNavigationProp>();
    const [location, setLocation] = useState<Location>();
    const [pickedLocation, setPickedLocation] = useState<Location>();

    const [permission, requestPermission] = useForegroundPermissions();
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);


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

        setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });

        setPickedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        
        setIsLoadingLocation(false);
    }

    function pickOnMapHandler() {
        const mapCenter = location
        navigation.navigate('Map', { location: mapCenter });

    }

    return (
        <View>
            <Text style={styles.inputLabel}>Location Picker:</Text>
            <View style={styles.locationPreview}>
                {isLoadingLocation ? (
                    <ActivityIndicator size="large" color={Colors.primary500} />
                ) : pickedLocation ? (
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: pickedLocation.lat,
                            longitude: pickedLocation.lng,
                            latitudeDelta: 0.366,
                            longitudeDelta: 0.16,
                        }} 
                    >
                        <Marker
                            coordinate={{
                                latitude: pickedLocation.lat,
                                longitude: pickedLocation.lng,
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