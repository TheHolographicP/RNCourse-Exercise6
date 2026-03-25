import { PlaceForm } from 'components/Places/PlaceForm';
import { useNavigation } from '@react-navigation/native';
import { Place } from 'model/place';
import { AddPlaceScreenProps } from 'types/navigation';

export function AddPlace({ route, navigation }: AddPlaceScreenProps) {
    function handleCreatePlace(place: Place) {
        navigation.navigate('AllPlaces', { newPlace: place }, { pop: true });
    }
    
    return (
        <PlaceForm onCreatePlace={handleCreatePlace}/>
    );
}