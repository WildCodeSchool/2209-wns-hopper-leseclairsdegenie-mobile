import React from "react";
import { Text, View } from "react-native";
import { Footer } from "../components/footer/Footer";
import { Notification } from "../components/Notification";
export function Connection() {
  return (
    <View>
      <Text>hello dear</Text>
      <Notification
        type="validation"
        icon="succes"
        message="HELLO"
        textButton="asas"
        onValidate={() => {}}
      />
      <Footer/>
    </View>
  );
}
