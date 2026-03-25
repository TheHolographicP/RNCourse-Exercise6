import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

import { Colors } from 'constants/colors';
import  LAYOUT  from 'constants/layout';
import { Place } from 'model/place';


export function PlaceItem({ place, onSelect }: { place: Place, onSelect: () => void }) {
    return (
        <View style={styles.rootContainer}>
            <Pressable onPress={onSelect}>
                <View style={styles.innerContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: place.imageUri }} style={styles.image} />
                    </View>
                    
                    <Text style={styles.title}>{place.title}</Text>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: LAYOUT.padding,
        backgroundColor: Colors.primary100,
        borderRadius: LAYOUT.borderRadius
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: LAYOUT.borderRadius
    },
    innerContainer: {},
    title: {},
    address: {},
    image: {},
})