import { setUserHasOnboarded } from "@/storage";
import { router } from "expo-router";
import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function Page() {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#FF6347",
          image: (
            <Image
              source={require("../../assets/images/onboarding/Humaaans-2-Characters.png")}
            />
          ),
          title: "React Native + Expo",
          subtitle: "A match made in heaven!",
        },
        {
          backgroundColor: "#008080",
          image: (
            <Image
              source={require("../../assets/images/onboarding/Humaaans-Space.png")}
            />
          ),
          title: "Tanstack Query",
          subtitle: "Working with data has never been this easy!",
        },
        {
          backgroundColor: "#4f46e5",
          image: (
            <Image
              source={require("../../assets/images/onboarding/Humaaans-Wireframe.png")}
            />
          ),
          title: "Automated Releases",
          subtitle: "EAS Builds + Github Actions = ❤️",
        },
      ]}
      onDone={async () => {
        await setUserHasOnboarded(true);
        console.log("User onboarded successfully.");
        router.replace("/home");
      }}
    />
  );
}
