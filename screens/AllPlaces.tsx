import { useIsFocused } from '@react-navigation/native';
import { PlacesList } from 'components/Places/PlacesList';
import { Place } from 'model/place';
import { useEffect, useState } from 'react';
import { AllPlacesScreenProps } from 'types/navigation';


export function AllPlaces({ route }: AllPlacesScreenProps) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused && route.params?.newPlace) {
      setLoadedPlaces((currentPlaces) => [...currentPlaces, route.params.newPlace!]);
    }
  }, [isFocused, route.params]);


  return (
    <PlacesList places={loadedPlaces} />
  );
}