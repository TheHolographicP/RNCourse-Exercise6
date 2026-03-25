import { PlaceForm } from 'components/Places/PlaceForm';
import { AddPlaceScreenProps } from 'types/navigation';

export function AddPlace({ route }: AddPlaceScreenProps) {
    return (
        <PlaceForm pickedLocation={route.params?.pickedLocation} />
    );
}