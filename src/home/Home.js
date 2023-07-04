import React, { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { api } from "../../config/api";

const Home = ({ navigation }) => {
  const { userDetails } = useSelector((state) => state.customer);
  const [loading, setLoading] = useState(false);
  const addPunchCard = () => {
    setLoading(true);
    api
      .get(`api/getUserPunchCard/${userDetails.id}`)
      .then((response) => {
        if (response.data[0].punch_card_count == 10) {
          Alert.alert(
            "Oops...",
            "The customer has reached the maximum amount of punch card stickers!"
          );
          setLoading(false);
        } else {
          api
            .post("api/getPunchCard", {
              user_id: userDetails.id,
            })
            .then(() => {
              setLoading(false);
              Alert.alert(
                "Punch Card Added!",
                `The punch card of user ${userDetails.fname} ${userDetails.lname} is incremented by one!`
              );
            })
            .catch((err) => {
              setLoading(false);
              console.log(err.response);
            });
        }
      })
      .catch((err) => setLoading(false));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ flex: 0.4, justifyContent: "center" }}>
        <Text category="h4" style={{ color: "#F25D3B" }}>
          Welcome, Staff! Choose an action to proceed.
        </Text>
      </View>
      <View
        style={{
          flex: 0.7,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#F25D3B",
              borderColor: "#F25D3B",
              width: "100%",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginVertical: 20,
            }}
            onPress={() => addPunchCard()}
          >
            <Text style={{ textAlign: "center", color: "#fff" }} category="h6">
              Add Punch Card
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "80%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#F25D3B",
              borderColor: "#F25D3B",
              width: "100%",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginVertical: 20,
            }}
            onPress={() => navigation.navigate("Claim")}
          >
            <Text style={{ textAlign: "center", color: "#fff" }} category="h6">
              Claim Free Drink
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "80%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#F25D3B",
              borderColor: "#F25D3B",
              width: "100%",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginVertical: 20,
            }}
            onPress={() => navigation.navigate("Favorites")}
          >
            <Text style={{ textAlign: "center", color: "#fff" }} category="h6">
              View Favorite Drinks
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
