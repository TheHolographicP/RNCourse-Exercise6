
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AllPlaces } from 'screens/AllPlaces';
import { AddPlace } from 'screens/AddPlace';
import { PlaceDetails } from 'screens/PlaceDetails';
import { Map } from 'screens/Map';
import { RootStackParamList } from 'types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AllPlaces" component={AllPlaces} options={{ title: 'Your Favorite Places' }} />
        <Stack.Screen name="AddPlace" component={AddPlace} options={{ title: 'Add a New Place' }} />
        <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{ title: 'Loading Place...' }} />
        <Stack.Screen name="Map" component={Map} options={{ title: 'Map' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
