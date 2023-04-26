import React, { useContext } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MainContext } from "../../MainContexts";

export function Cart({
  onValidateCart,
}: {
  onValidateCart: Function;
}): JSX.Element {
  const Main = useContext(MainContext);
  return (
    <View
    // className="addressContainer"
    >
      <Text>Cart</Text>
      <TouchableOpacity
        // className="addressFormFieldAddress"
        // type="button"
        onPress={() => {
          onValidateCart();
        }}
      >
        <Text>VALIDER PANIER</Text>
      </TouchableOpacity>
      {Main?.user?.cart?.reservations.length > 0 && (
        <FlatList
          scrollEnabled={false}
          data={Main?.user?.cart?.reservations}
          renderItem={({ item }) => <Text>{item.id}</Text>}
          keyExtractor={(item, index) => item.id + index.toString()}
        />
      )}
    </View>
  );
}
