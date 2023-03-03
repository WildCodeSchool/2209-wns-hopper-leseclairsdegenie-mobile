import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IProduct } from "../interfaces";
import { getProducts } from "../graphql/productQueries";
import { ProductCard } from "../components/products/ProductCard";
import { ProductDetails } from "../components/products/ProductDetails";
const { width, height } = Dimensions.get("window");
export function Products() {
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [researchInput, setResearchInput] = useState("");
  const [categorie, setCategorie] = useState("Montagne");
  const [researchResult, setResearchResult] = useState([]);
  const [productToOpen, setProductToOpen] = useState<IProduct>();
  const { loading, data, refetch } = useQuery<{ products: IProduct[] }>(
    getProducts
  );
  const products = data ? data.products.concat(data.products) : null;
  useEffect(() => {
    if (researchInput.length >= 3) {
      const inputUpperCase = researchInput.toUpperCase();
      const inputLowerCase = researchInput.toLowerCase();
      const firstLetter = researchInput.charAt(0);
      const firstLetterCap = firstLetter.toUpperCase();
      const remainingLetters = researchInput.slice(1);
      const capitalizedWord = firstLetterCap + remainingLetters;
      const productSorted = products.filter(
        (item) =>
          (item.name.includes(inputUpperCase) ||
            item.name.includes(inputLowerCase) ||
            item.name.includes(capitalizedWord) ||
            item.category.name.includes(capitalizedWord) ||
            item.description.includes(inputUpperCase) ||
            item.description.includes(inputLowerCase) ||
            item.description.includes(capitalizedWord) ||
            item.category.name.includes(capitalizedWord)) &&
          (categorie.length >= 1 ? item.category.name === categorie : item)
      );
      setResearchResult(productSorted);
    }
    if (products && categorie.length >= 1 && researchInput.length < 3) {
      const productSorted = products.filter(
        (item) => item.category.name === categorie
      );
      setResearchResult(productSorted);
    }
  }, [researchInput, categorie, data]);

  console.log(productToOpen);

  return (
    <View>
      {productToOpen && openModalProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModalProduct}
          onRequestClose={() => {
            setProductToOpen(undefined);
            setOpenModalProduct(false);
          }}
        >
          <ProductDetails
            addOnBasket={(productDATA) => {
              console.log(productDATA);
              refetch();
            }}
            closeProductDetails={() => {
              setProductToOpen(undefined);
              setOpenModalProduct(false);
            }}
            product={productToOpen}
          />
        </Modal>
      )}
      <View style={styles.productsResearchContainer}>
        <Ionicons name="search-outline" />
        <TextInput
          placeholder="Rechercher"
          style={styles.productsResearchInput}
          value={researchInput}
          onChangeText={(text) => setResearchInput(text)}
        />
      </View>
      <SafeAreaView style={styles.productsResultsContainer}>
        <FlatList
          data={researchResult}
          renderItem={({ item }) => (
            <ProductCard
              addOnBasket={(productDATA) => {
                console.log(productDATA);
                refetch();
              }}
              openProduct={(productDATA) => {
                setProductToOpen(productDATA);
                setOpenModalProduct(true);
              }}
              product={item}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}
const white = "#ffffff";
const styles = StyleSheet.create({
  productsResearchContainer: { backgroundColor: "red" },
  productsResearchIcon: {},
  productsResearchInput: {},
  productsResultsContainer: { backgroundColor: "yellow" },
  productsResultsItemContainer: {},
});
