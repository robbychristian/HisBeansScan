import React from "react";
import { View, Image, ScrollView } from "react-native";
import { Text, Modal, Button, Card } from "@ui-kitten/components";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { api } from "../../config/api";
import { Alert } from "react-native";
import CustomTextInput from "../components/CustomTextInput";

const Payment = ({ navigation }) => {
  const route = useRoute();
  const { userDetails } = useSelector((state) => state.customer);
  const [totalPrice, setTotalPrice] = useState(route.params.totalPrice);
  const [refNo, setRefNo] = useState("");
  const [mode, setMode] = useState("Cash");
  const [orderInput, setOrderInput] = useState([route.params]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTotalPrice(route.params.drink_price);
      setOrderInput([route.params]);
    });
    return unsubscribe;
  }, [navigation]);

  const onSubmitPayment = () => {
    const formdata = new FormData();
    formdata.append("user_id", userDetails.id);
    formdata.append("total_price", route.params.drink_price);
    formdata.append("mode_of_payment", mode);
    formdata.append("order_items", JSON.stringify(orderInput));
    formdata.append("voucher_id", 0);
    formdata.append("gcash_ref_number", refNo);

    api
      .post("api/addStaffOrder", formdata)
      .then((response) => {
        console.log(response.data);
        Alert.alert("Order Sent!", "The drink has been queued!");
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            justifyContent: "center",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#fff",
              paddingHorizontal: 25,
              paddingVertical: 15,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="account-box" size={30} color="#F25D3B" />
              <Text category="h5">Customer Details</Text>
            </View>
            <Text category="h6">
              Name:{" "}
              <Text
                style={{
                  fontWeight: "normal",
                }}
              >{`${userDetails.fname} ${userDetails.lname}`}</Text>
            </Text>
            <Text category="h6">
              Contact No:{" "}
              <Text style={{ fontWeight: "normal" }}>
                {userDetails.cnumber}
              </Text>
            </Text>
            <Text category="h6">
              Username:{" "}
              <Text style={{ fontWeight: "normal" }}>
                {userDetails.username}
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#fff",
              paddingHorizontal: 25,
              paddingVertical: 15,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="view-list-outline" size={30} color="#F25D3B" />
              <Text category="h5" style={{ marginLeft: 5 }}>
                Order Details
              </Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() =>
                mode == "Cash" ? setMode("GCash") : setMode("Cash")
              }
            >
              <Text category="h6">Mode of payment: </Text>
              <Text category="h6" style={{ fontWeight: "400" }}>
                {mode}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text category="h6">Total Price: </Text>
              <Text category="h6" style={{ fontWeight: "400" }}>
                P{totalPrice}
              </Text>
            </View>
            {mode == "GCash" ? (
              <CustomTextInput
                value={refNo}
                onChangeText={(value) => setRefNo(value)}
                label={`GCash Ref. No.`}
              />
            ) : null}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 20,
          }}
        >
          <Button
            disabled={mode == "" ? true : false}
            style={{
              width: "85%",
              backgroundColor: mode == "" ? "#dedede" : "#F25D3B",
              borderColor: mode == "" ? "#dedede" : "#F25D3B",
            }}
            onPress={() => onSubmitPayment()}
          >
            Order
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Payment;
