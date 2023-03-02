import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");

// import "./notification.css"
interface INotification {
  type: "validation" | "form";
  icon: "succes" | "error";
  message: string;
  textButton: string;
  onValidate: Function;
}
export function Notification({
  type,
  icon,
  message,
  textButton,
  onValidate,
}: INotification) {
  const [iconChosed, setIconChose] = useState();
  console.log(height);
  const [backgroundDissable, setBackgroundDissable] = useState(false);
  useEffect(() => {
    if (icon === "succes") {
      setIconChose(require("../assets/succes.png"));
    }
    if (icon === "error") {
      setIconChose(require("../assets/error.png"));
    }
  }, [icon]);

  return (
    <View
      style={styles.notificationContainer}
    >
      <View style={styles.background} />
      {type === "validation" && (
        <View
          style={styles.notificationContainerContain}
        >
          <Image
            style={styles.notificationIcon}
            source={iconChosed}
          />
          <Text
            style={styles.notificationMessage}
          >
            {message}
          </Text>
          <View style={styles.notificationFormSubmit}>
            <Button
              color="#343a55"
              title={textButton}
              onPress={(): void => onValidate()}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    width: width,
    height: height - 117.11,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
    position: "absolute",
    opacity: 0.3,
    zIndex: 1,
  },
  notificationContainerContain: {
    width: "80%",
    height: "50%",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#AEF3DA",
    zIndex: 2,
    opacity: 1,
  },
  notificationIcon: {
    marginTop: 20,
    width: 70,
    height: 70,
    zIndex: 2,
    opacity: 1,
  },
  notificationMessage: {
    flex: 1,
    marginTop: 20,
  },
  notificationFormSubmit: {
    minWidth: "50%",
    marginBottom: 10,
  },
});
