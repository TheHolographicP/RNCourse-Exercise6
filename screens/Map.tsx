import { View, Text } from 'react-native';
import { MapScreenProps } from 'types/navigation';

export function Map({ route }: MapScreenProps) {
    const isReadOnly = route.params?.isReadOnly ?? false;

    return (
        <View>
            <Text>Map</Text>
            <Text>{isReadOnly ? 'Read only map' : 'Interactive map'}</Text>
        </View>
    );
};