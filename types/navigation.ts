import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Location, Place } from 'model/place';

export type RootStackParamList = {
  AllPlaces: {places?: Place[]; };
  AddPlace: { pickedLocation?: Location | undefined};
  PlaceDetails: { placeId: string };
  Map: {location: Location| undefined, readOnly?: boolean};
};

export type AllPlacesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AllPlaces'
>;
export type AddPlaceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddPlace'
>;
export type PlaceDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PlaceDetails'
>;

export type MapScreenProps = NativeStackScreenProps<RootStackParamList, 'Map'>;

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;