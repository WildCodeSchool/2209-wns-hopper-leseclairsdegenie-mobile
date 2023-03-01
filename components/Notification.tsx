import React, { useEffect, useState } from "react";
import { Button, Text, Image, View } from "react-native";
// import "./notification.css";
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
  const [iconChosed, setIconChose] = useState(require(""));
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
    // className="notificationContainer"
    >
      {type === "validation" && (
        <View
        // className="notificationContainerContain"
        >
          <Image
            source={{ uri: iconChosed }}
            // className="notificationIcon"
          />

          <Text
          // className="notificationMessage"
          >
            {message}
          </Text>
          <Button
            title={textButton}
            // className="notificationFormSubmit"
            onPress={(): void => onValidate()}
          />
        </View>
      )}
    </View>
  );
}
