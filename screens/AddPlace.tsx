import { PlaceForm } from 'components/Places/PlaceForm';
import { Place } from 'model/place';
import { AddPlaceScreenProps } from 'types/navigation';

import { upsertPlace } from 'store/database';
import { useEffect } from 'react';
import { IconButton } from 'components/IconButton';

export function AddPlace({ route, navigation }: AddPlaceScreenProps) {
    function handleCreatePlace(place: Place) {
        upsertPlace(place);
        navigation.navigate('AllPlaces', {}, { pop: true });
    }
    
    useEffect(() => {
        if (route.params?.existingPlace) {
            navigation.setOptions({ title: 'Edit Place' });
        } else {
            navigation.setOptions({ title: 'Add Place' });
        }
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <IconButton
                    icon="save"
                    size={24}
                    onPress={() => {}}
                    iconColor={tintColor}
                />
            )
        });
    }, [navigation, route.params?.existingPlace]);

    return (
        <PlaceForm onCreatePlace={handleCreatePlace} existingPlace={route.params?.existingPlace} />
    );
}