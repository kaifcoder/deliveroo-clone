import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import store from "./store";
import { Provider } from 'react-redux'

import BasketScreen from './screens/BasketScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Basket" component={BasketScreen}
              options={{
                presentation: "containedTransparentModal", animationDuration: 200,
                headerShown: false, animation: "fade_from_bottom",
                contentStyle:
                {
                  marginTop: 50,
                  backgroundColor: "white",
                  borderTopEndRadius: 20,
                  borderTopStartRadius: 20,
                  paddingTop: 8,
                  elevation: 150,
                  // shadowOffset: { width: 100, height: 16 },
                },

              }}

            />
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}

