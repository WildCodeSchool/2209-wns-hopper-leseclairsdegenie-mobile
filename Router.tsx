import { createStackNavigator } from "@react-navigation/stack";
import { Connection } from "./screens/Connection";
import { Home } from "./screens/Home";
import { Products } from "./screens/Products";
import { PurchaseProces } from "./screens/PurchaseProces";

const Stack = createStackNavigator<{
  Connection: undefined;
  Home: undefined;
  Products: undefined;
  PurchaseProces: undefined;
}>();

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Connection" component={Connection} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="PurchaseProces" component={PurchaseProces} />
    </Stack.Navigator>
  );
}

export default Router;
