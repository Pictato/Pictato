import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import SignIn from "./SignIn";
import Register from "./Register";
import PictatoImage from "../assets/pictato.png";

const tabContents = {
  로그인: <SignIn />,
  회원가입: <Register />,
};

const Authenticate = () => {
  const [curTab, setCurTab] = useState("로그인");

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={PictatoImage} style={{ width: "auto", height: 80 }} resizeMode="contain" />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
        {Object.keys(tabContents).map((key) => (
          <TouchableOpacity
            key={key}
            style={{
              flex: 1,
              paddingBottom: 4,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 2,
              borderBottomColor:
                key === curTab ? "#a9a9a9" /* active color */ : "#d3d3d3" /* inactive color */,
            }}
            onPress={() => setCurTab(key)}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: key === curTab ? "#000000" /* active color */ : "#808080" /* inactive color */,
              }}
            >
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {tabContents[curTab]}
    </View>
  );
};

export default Authenticate;
