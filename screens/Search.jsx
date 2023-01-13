import { View, Text, ScrollView, FlatList } from "react-native";
import { SearchBar } from "@rneui/themed";
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { endpoints } from "../store/services/api";
import { useDispatch } from "react-redux";
import { SearchResult } from "../components";

export default function Search({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const searchUsers = async (text) => {
    if (!text) {
      setData();
      return;
    }
    setLoading(true);
    const { data } = await dispatch(endpoints.getUsers.initiate(text));
    setData(data);
    setLoading(false);
  };

  const onEndReached = () => {
    if (data?.next) {
      dispatch(endpoints.getNextPage.initiate({ url: data.next }))
        .then((res) => {
          console.log(res);
          setData({
            ...data,
            results: [...data.results, ...res.data.results],
            next: res.data.next,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const debouncedSearch = useCallback(debounce(searchUsers, 150), []);

  return (
    <View className="bg-primary px-2 h-full">
      <FlatList
        data={data?.results}
        renderItem={({ item }) => (
          <SearchResult user={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.username}
        onEndReached={onEndReached}
        ListHeaderComponent={
          <SearchBar
            platform="ios"
            containerStyle={{
              backgroundColor: "transparent",
              // marginTop: 65,
            }}
            inputContainerStyle={{
              backgroundColor: "#334756",
              height: 10,
            }}
            inputStyle={{
              color: "#fff",
            }}
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              debouncedSearch(text);
            }}
            onClear={() => setSearch("")}
            showLoading={loading}
          />
        }
      />
    </View>
  );
}
