import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

import { Colors } from 'constants/colors';
import  LAYOUT  from 'constants/layout';
import { Place } from 'model/place';


export function PlaceItem({ place, onSelect }: { place: Place, onSelect: () => void }) {
    return (
        <View style={styles.rootContainer}>
            <Pressable onPress={onSelect} style={({ pressed }) => [styles.innerContainer, pressed ? { opacity: 0.9 } : null]}>
                <View style={styles.innerContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: place.imageUri }} style={styles.image} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{place.title}</Text>
                        <Text style={styles.address} numberOfLines={2} ellipsizeMode="tail">{place.address}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: LAYOUT.borderRadius
    },
    innerContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        flex:1,
        borderRadius: LAYOUT.borderRadius,
        overflow: 'hidden',
    },

    textContainer: {
        flex: 2,
        padding: LAYOUT.padding,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700
    },
    address: {
        fontSize: 12,
        color: Colors.gray700
    },
    image: {
        aspectRatio: 16/9,
        height: 100,
    },
})