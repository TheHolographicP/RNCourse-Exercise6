import { PlaceForm } from 'components/Places/PlaceForm';
import { useNavigation } from '@react-navigation/native';
import { Place } from 'model/place';
import { AddPlaceScreenProps } from 'types/navigation';

import { upsertPlace } from 'store/database';

export function AddPlace({ route, navigation }: AddPlaceScreenProps) {
    function handleCreatePlace(place: Place) {
        upsertPlace(place);
        navigation.navigate('AllPlaces', {}, { pop: true });
    }
    
    return (
        <PlaceForm onCreatePlace={handleCreatePlace}/>
    );
}