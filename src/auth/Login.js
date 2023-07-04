import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, Layout, Button } from "@ui-kitten/components";
import CustomTextInput from "../components/CustomTextInput";
import Loading from "../components/Loading";
import { api } from "../../config/api";
import axios from "axios";

const Login = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     (async () => {
  //       // console.log('nasa login ka');
  //       const username = await AsyncStorage.getItem("username");
  //       const password = await AsyncStorage.getItem("password");
  //       if (username !== undefined || password !== undefined) {
  //         const input = {
  //           username: JSON.parse(username),
  //           password: JSON.parse(password),
  //         };
  //         const response = await dispatch(loginUser(input));
  //         // console.log(response);
  //         if (response.type == "auth/login/fulfilled") {
  //           navigation.navigate("BottomNav");
  //         }
  //       } else if (username == "" || password == "") {
  //       }
  //     })();
  //   }, []);

  const onSubmit = async () => {
    setLoading(true);
    if (username == "" || password == "") {
      Alert.alert("Error!", "Please fill in the form to login.");
    } else {
      const input = {
        username,
        password,
      };
      api
        .post("api/login", input)
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          if (response.data.user.role != "Staff") {
            Alert.alert(
              "Error!",
              "Only Staffs are allowed to login to this mobile application!"
            );
          } else {
            navigation.navigate("Scanner");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response);
        });
    }
  };

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Loading loading={loading} />
        <View style={styles.contentContainer}>
          <Image
            source={require("../../assets/logo/logo-circle-white.png")}
            style={{ height: 200, width: 200 }}
          />
          <Text category="h4" style={{ color: "#F25D3B", marginTop: 20 }}>
            Staff Application
          </Text>
          <View style={{ width: "90%" }}>
            <CustomTextInput
              value={username}
              onChangeText={(value) => setUsername(value)}
              label={`Username`}
              my={10}
            />
            <CustomTextInput
              value={password}
              onChangeText={(value) => setPassword(value)}
              label={`Password`}
              isPassword
              my={10}
            />
            <Button
              onPress={() => onSubmit()}
              style={{
                width: "100%",
                marginBottom: 10,
                marginTop: 20,
                backgroundColor: "#F25D3B",
                borderColor: "#F25D3B",
              }}
            >
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ffecd3",
    flex: 1,
  },
  contentContainer: {
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
