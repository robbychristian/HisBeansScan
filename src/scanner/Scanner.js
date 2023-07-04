import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { TopNavigation, Text } from "@ui-kitten/components";
import { BarCodeScanner } from "expo-barcode-scanner";
import { api } from "../../config/api";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearUserDetails, setUserDetails } from "../store/customer/Customer";

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const userData = JSON.parse(data);
    dispatch(setUserDetails(userData));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {/* <TopNavigation
        appearance="control"
        alignment="center"
        title={`Punch Card Scanner`}
        style={{
          backgroundColor: "#F25D3B",
        }}
      /> */}
      <View style={{ flex: 1 }}>
        <View style={{ height: "100%", width: "100%" }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ ...StyleSheet.absoluteFillObject, height: 450 }}
          />
          {scanned && (
            <View
              style={{
                bottom: 0,
                position: "absolute",
                width: "100%",
                paddingHorizontal: 30,
                backgroundColor: "#dedede",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#F25D3B",
                  borderColor: "#F25D3B",
                  width: "100%",
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  marginTop: 20,
                }}
                onPress={() => {
                  setScanned(false);
                  dispatch(clearUserDetails());
                }}
              >
                <Text
                  category="h6"
                  style={{ color: "#fff", textAlign: "center" }}
                >
                  Tap to Scan Again
                </Text>
              </TouchableOpacity>
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
                onPress={() => navigation.navigate("Home")}
              >
                <Text
                  category="h6"
                  style={{ color: "#fff", textAlign: "center" }}
                >
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Scanner;
