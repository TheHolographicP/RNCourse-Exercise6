import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: undefined;
  PlaceDetails: { placeId: string };
  Map:
    | {
        initialLat?: number;
        initialLng?: number;
        isReadOnly?: boolean;
      }
    | undefined;
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