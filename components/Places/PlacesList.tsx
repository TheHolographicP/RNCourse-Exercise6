import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PlaceItem } from 'components/Places/PlaceItem';

import { Place } from 'model/place';
import LAYOUT from 'constants/layout';
import { RootStackParamList } from 'types/navigation';



export function PlacesList({ places }: { places: Place[] }) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function renderPlaceItem(item: Place) {
        return <PlaceItem place={item} onSelect={() => handleSelectPlace(item.id)} />;
    }
    
    function handleSelectPlace(placeId: string) {
        navigation.navigate('PlaceDetails', { placeId });
    }


    if (places.length === 0) {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.fallbackContainer}>
                    <Text style={styles.fallbackText}>No places found. Start adding some!</Text>
                </View>
            </View>
        );
    }  

    return (
        <View style={styles.rootContainer}>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderPlaceItem(item)}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: LAYOUT.padding
    },
    fallbackContainer: {
        padding: LAYOUT.padding,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: '#888'
    }
});