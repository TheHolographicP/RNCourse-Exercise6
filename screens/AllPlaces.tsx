import { PlacesList } from 'components/Places/PlacesList';
import { AllPlacesScreenProps } from 'types/navigation';


export function AllPlaces(_props: AllPlacesScreenProps) {
  return (
    <PlacesList places={[]} />
  );
}