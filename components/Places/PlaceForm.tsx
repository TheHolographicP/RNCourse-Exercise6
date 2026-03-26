import { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

import LAYOUT from 'constants/layout';
import { Colors } from 'constants/colors';
import { ImagePicker } from 'components/Places/ImagePicker';
import { LocationPicker } from 'components/Places/LocationPicker';

import { Button } from 'components/Button';

import { Location, Place } from 'model/place';

type Props = {
    onCreatePlace: (place: Place) => void;
    existingPlace?: Place;
}

export function PlaceForm({onCreatePlace, existingPlace}: Props) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImageURI, setSelectedImageURI] = useState<string>();
    const [selectedLocation, setSelectedLocation] = useState<Location>();
    const [selectedAddress, setSelectedAddress] = useState<string>();

    const handleTitleChange = useCallback((text: string) => {
        setEnteredTitle(text);
    }, []);

    const handleLocationChange = useCallback((location: Location) => {
        setSelectedLocation(location);
    }, []);

    const handleImageChange = useCallback((uri: string) => {
        setSelectedImageURI(uri);
    }, []);

    const handleAddressChange = useCallback((address: string) => {
        setSelectedAddress(address);
    }, []);

    useEffect(() => {
        if (existingPlace) {
            setEnteredTitle(existingPlace.title);
            setSelectedImageURI(existingPlace.imageUri);
            setSelectedLocation(existingPlace.location);
            setSelectedAddress(existingPlace.address);
        }
    }, [existingPlace]);

    function savePlaceHandler() {
        const savedPlace: Place = new Place(
            enteredTitle,
            selectedImageURI!,
            selectedAddress!,
            selectedLocation!
        );
        if (existingPlace) {
            savedPlace.id = existingPlace.id;
        }
        onCreatePlace(savedPlace);

    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.inputLabel}>Title:</Text>
                <TextInput style={styles.textInput} onChangeText={handleTitleChange} value={enteredTitle} />
            </View>

            <ImagePicker onChangeImage={handleImageChange} initialValue={existingPlace?.imageUri} />
            <LocationPicker onChangeLocation={handleLocationChange} onChangeAddress={handleAddressChange} initialLocation={existingPlace?.location} initialAddress={existingPlace?.address} />
            <Button onPress={savePlaceHandler}>Save Place</Button>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: LAYOUT.padding,
        gap: LAYOUT.gap
    },
    inputLabel: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 16,
        color: Colors.primary500
    },
    textInput: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 1,
        backgroundColor: Colors.primary100,
    },
});