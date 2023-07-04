import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/Login";
import Scanner from "../scanner/Scanner";
import Home from "../home/Home";
import Favorites from "../favorites/Favorites";
import FavoritesCustomization from "../favorites/FavoritesCustomization";
import Claim from "../claim/Claim";
import ClaimCustomization from "../claim/ClaimCustomization";
import Payment from "../payment/payment";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerTintColor: "#F25D3B", headerTitle: "Home" }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerTintColor: "#F25D3B",
            headerTitle: "Punch Card Scanner",
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{
            headerTintColor: "#F25D3B",
            headerTitle: "Favorites",
          }}
        />
        <Stack.Screen
          name="Claim"
          component={Claim}
          options={{
            headerTintColor: "#F25D3B",
            headerTitle: "Claim Free Drink",
          }}
        />
        <Stack.Screen
          name="ClaimCustomization"
          component={ClaimCustomization}
          options={{
            headerTintColor: "#F25D3B",
            headerTitle: "Customize The Drink",
          }}
        />
        <Stack.Screen
          name="FavoritesCustomization"
          component={FavoritesCustomization}
          options={{
            headerTintColor: "#F25D3B",
            headerTitle: "Favorites Customization",
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerTintColor: "#F25D3B",
            headerTitle: "Payment",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
