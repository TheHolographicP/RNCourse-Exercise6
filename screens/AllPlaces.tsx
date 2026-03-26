import { useIsFocused } from '@react-navigation/native';
import { PlacesList } from 'components/Places/PlacesList';
import { Place } from 'model/place';
import { useEffect, useState } from 'react';
import { AllPlacesScreenProps } from 'types/navigation';
import { fetchPlaces } from 'store/database';

export function AllPlaces({ route }: AllPlacesScreenProps) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);

    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);


  return (
    <PlacesList places={loadedPlaces} />
  );
}