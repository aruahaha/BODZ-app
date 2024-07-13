import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const About = () => {
  const { colors } = useTheme();
  const [usActive, setUsActive] = useState(false);
  const [discActive, setDiscActive] = useState(false);

  const handleUsToggle = () => {
    setUsActive(!usActive);
  };
  const handleDiscToggle = () => {
    setDiscActive(!discActive);
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "About",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
        }}
      />
      <ScrollView>
        <View className="px-3 my-2">
          <View
            onStartShouldSetResponder={handleUsToggle}
            className={`bg-black p-4 ${usActive ? "rounded-t-lg" : "rounded-lg"
              } flex-row justify-between items-center mt-4`}
          >
            <Text style={{ color: colors.text, fontFamily: "Poppins" }}>
              Us
            </Text>
            <AntDesign
              name={usActive ? "up" : "down"}
              size={20}
              color={colors.text}
            />
          </View>
          {usActive && (
            <Animatable.View
              className="bg-black rounded-b-lg"
              animation="fadeIn"
            >
              <ScrollView>
                <Text
                  style={{ color: colors.text, fontFamily: "Poppins" }}
                  className="text-lg p-4"
                >
                  Best Online Dealz disclaims any guarantees, endorsements, or
                  warranties for external app content and products linked
                  from this App. We don't verify or endorse the accuracy or
                  quality of information and products shared here.{"\n\n"} The
                  authenticity of user-posted information and deals on our
                  app isn't verified, and inaccuracies may exist. We don't
                  make specific recommendations for the products and services
                  presented, and your decision to make a purchase is at your
                  discretion.{"\n\n"} All information is provided "as is"
                  without any obligation to ensure accuracy. Users assume all
                  risks regarding the information's usability, quality, and
                  suitability.
                  {"\n\n"} Users waive the right to make claims based on
                  reliance on information from this app. Your use signifies
                  acceptance of these terms, and you cannot claim ignorance.
                  {"\n\n"} The app's development is ongoing, and we are not
                  responsible for user access issues. Information may not always
                  be up-to-date.
                  {"\n\n"} The app is not intended for users in
                  jurisdictions with differing laws than those mandated by the
                  laws of India, and links to external app don't imply our
                  endorsement of their content or updates.
                </Text>
              </ScrollView>
            </Animatable.View>
          )}

          <View
            onStartShouldSetResponder={handleDiscToggle}
            className={`bg-black p-4 ${discActive ? "rounded-t-lg" : "rounded-lg"
              } flex-row justify-between items-center mt-4`}
          >
            <Text style={{ color: colors.text, fontFamily: "Poppins" }}>
              Disclaimer
            </Text>
            <AntDesign
              name={discActive ? "up" : "down"}
              size={20}
              color={colors.text}
            />
          </View>
          {discActive && (
            <Animatable.View
              className="bg-black rounded-b-lg"
              animation="fadeIn"
            >
              <ScrollView>
                <Text
                  style={{ color: colors.text, fontFamily: "Poppins" }}
                  className="text-lg p-4"
                >
                  In 2015, the Federal Trade Commission established disclosure
                  guidelines to enhance transparency in online content
                  engagement. These rules aim to inform
                  best-online-dealz.vercel.app readers about any affiliations
                  between the blogger/publisher and external companies, ensuring
                  awareness of financial gains tied to shared links or product
                  promotions.{"\n\n"} As per FTC guidelines, assume the
                  following about links and posts on this site:
                  best-online-dealz.vercel.app may contain affiliate links,
                  yielding modest compensation from specific item sales.{"\n\n"}{" "}
                  Affiliate Link Insights: Clicking these links redirects
                  readers to the seller's site, not completing the purchase
                  directly on best-online-dealz.vercel.app The site earns
                  commissions from companies like Amazon, maintaining consistent
                  prices for readers.{"\n\n"}BestOnlineDealz engages in two main
                  affiliate programs:{"\n\n"}
                  {"\u2022 "}Amazon Affiliate Links: A participant in the Amazon
                  Services LLC Associates Program, allowing website owners to
                  earn fees by linking to Amazon.in and its affiliated sites.
                  {"\n\n"}
                  {"\u2022 "}Product Affiliate Links: Clicking and purchasing
                  through these links results in Best Online Dealz earning a
                  percentage of the sale or other compensation.{"\n\n"}
                  Importantly, these affiliate links don't impact visitor
                  prices, operating independently of a "pay per click" model.
                  {"\n\n"}
                  Sponsored Content Policy: BestOnlineDealz doesn't produce
                  sponsored posts to uphold authenticity. Any sponsored content
                  is transparently disclosed at a post's beginning. Product
                  recommendations stem from personal use or endorsement for
                  family and friends.
                </Text>
              </ScrollView>
            </Animatable.View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
