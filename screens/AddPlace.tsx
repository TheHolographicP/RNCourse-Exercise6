import { useCallback, useState } from 'react';

import { PlaceForm } from 'components/Places/PlaceForm';
import { Place } from 'model/place';
import { AddPlaceScreenProps } from 'types/navigation';

import { upsertPlace } from 'store/database';
import { useLayoutEffect } from 'react';
import { IconButton } from 'components/IconButton';

export function AddPlace({ route, navigation }: AddPlaceScreenProps) {
    const [placeObject, setPlaceObject] = useState<Place>();
    
    const handleCreatePlace = useCallback(() => {
        if (placeObject) {
            if (route.params?.existingPlace?.id) {
                placeObject.id = route.params.existingPlace.id;
            }
            upsertPlace(placeObject);
            navigation.navigate('AllPlaces', {}, { pop: true });
        }
    }, [navigation, placeObject, route.params?.existingPlace?.id]);
    
    useLayoutEffect(() => {
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
                    onPress={handleCreatePlace}
                    iconColor={tintColor}
                />
            )
        });
    }, [handleCreatePlace, navigation, route.params?.existingPlace]);

    return (
        <PlaceForm setPlace={setPlaceObject} existingPlace={route.params?.existingPlace} />
    );
}