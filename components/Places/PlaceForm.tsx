import { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

import LAYOUT from 'constants/layout';
import { Colors } from 'constants/colors';
import { ImagePicker } from 'components/Places/ImagePicker';
import { LocationPicker } from 'components/Places/LocationPicker';

import type { Location } from 'model/place';

export function PlaceForm({pickedLocation}: {pickedLocation?: Location}) {
    const [enteredTitle, setEnteredTitle] = useState('');

    function handleTitleChange(text: string) {
        setEnteredTitle(text);
    }


    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.inputLabel}>Title:</Text>
                <TextInput style={styles.textInput} onChangeText={handleTitleChange} value={enteredTitle} />
            </View>

            <ImagePicker />
            <LocationPicker />
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