import { View, Text } from 'react-native';
import { PlaceDetailsScreenProps } from 'types/navigation';


export function PlaceDetails({ route }: PlaceDetailsScreenProps) {
    const selectedPlaceId = route.params.placeId;

    return (
        <View>
            <Text>PlaceDetails</Text>
            <Text>{selectedPlaceId}</Text>
        </View>
    )
}