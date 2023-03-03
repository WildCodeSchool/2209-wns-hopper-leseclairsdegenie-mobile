import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export function Cart({
  onValidateCart,
}: {
  onValidateCart: Function;
}): JSX.Element {
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
    </View>
  );
}
