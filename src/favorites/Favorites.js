import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { api } from "../../config/api";
import FeaturedCard from "../components/FeaturedCard";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const Favorites = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { userDetails } = useSelector((state) => state.customer);
  useEffect(() => {
    api
      .post("api/getUserFavorites", {
        user_id: userDetails.id,
      })
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    const unsubscribe = navigation.addListener("focus", () => {
      api
        .post("api/getUserFavorites", {
          user_id: userDetails.id,
        })
        .then((response) => {
          setFavorites(response.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Layout style={{ flex: 1 }}>
      <Loading loading={loading} />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {favorites.length > 0
              ? favorites.map((item, index) => {
                  return (
                    <FeaturedCard
                      onPress={() =>
                        navigation.navigate("FavoritesCustomization", {
                          id: item.id,
                          name: item.item_name,
                          price: item.price,
                          description: item.item_description,
                          image: item.image_path,
                        })
                      }
                      menuImage={`https://hbnaevis.online/HISBEANSapp-main/public/image/menu/${item.image_path}`}
                      key={item.id}
                      name={item.item_name}
                      description={item.item_description}
                      price={item.price}
                    />
                  );
                })
              : null}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Favorites;
