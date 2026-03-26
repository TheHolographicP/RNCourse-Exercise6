import { ActivityIndicator, View, Text, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { useEffect, useState } from 'react';


import { fetchPlaceById } from 'store/database';
import { OutlinedButton } from 'components/OutlinedButton';

import { Colors } from 'constants/colors';
import LAYOUT from 'constants/layout';


import { PlaceDetailsScreenProps } from 'types/navigation';
import { Place } from 'model/place';
import { IconButton } from 'components/IconButton';


export function PlaceDetails({route, navigation}: PlaceDetailsScreenProps) {
    const [placeDetails, setPlaceDetails] = useState<Place|undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [screenName, setScreenName] = useState('Place Details');

    function handleViewOnMap() {
        navigation.navigate('Map', {
            location: {
                lat: placeDetails!.location.lat,
                lng: placeDetails!.location.lng
            },
            readOnly: true
        });
    }

    async function fetchPlaceDetails() {
        const placeId = route.params.placeId;
        try {
            const place = await fetchPlaceById(placeId);
            setPlaceDetails(place);
            setScreenName(place?.title || 'Place Details');
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch place details', [
                { text: 'Go Back', onPress: () => navigation.goBack() }
            ]);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchPlaceDetails();
    }, [route.params.placeId]);

    useEffect(() => {
        navigation.setOptions({ title: screenName,
            headerRight: ({tintColor}) => (
                <IconButton 
                    icon="pencil"
                    size={24}
                    onPress={() => navigation.navigate('AddPlace', { existingPlace: placeDetails })}
                    iconColor={tintColor}
                />
            )
         });
    }, [navigation, screenName]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary500} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.form}>
            <View style={styles.imagePreview}>
                <Image src={placeDetails?.imageUri} style={styles.image} />
            </View>

            <View>
                <Text style={styles.titleText}>{placeDetails?.title}</Text>
                <Text style={styles.addressText}>{placeDetails?.address}</Text>
            </View>
            <OutlinedButton icon="map" onPress={handleViewOnMap}>View on Map</OutlinedButton>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: LAYOUT.padding,
        gap: LAYOUT.gap
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary500,
        marginBottom: 8
    },
    addressText: {
        marginBottom: 4,
        color: Colors.primary500
    },
    imagePreview: {
        borderRadius: LAYOUT.borderRadius,
        backgroundColor: Colors.primary100,
        width: '100%',
        aspectRatio: 16 / 9,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});