import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IProduct } from "../../interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IProductDetailsProps {
  product: IProduct | null;
  closeProductDetails: Function;
  addOnBasket: Function;
}

export function ProductDetails({
  product,
  closeProductDetails,
  addOnBasket,
}: IProductDetailsProps) {
  if (product !== null && product.disponibility) {
    return (
      <View key={product.id}>
        <TouchableOpacity
          onPress={() => {
            closeProductDetails();
          }}
        >
          <Image style={styles.tinyLogo} source={{ uri: product.image }} />
        </TouchableOpacity>
        <View>
          <Text>{product.name}</Text>
        </View>
        <View>
          <View>
            <Text>{product.price}€ / jour</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              addOnBasket(product);
            }}
          >
            <Text>+</Text>
            <Ionicons name="basket-outline" />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
