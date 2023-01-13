import { View, ScrollView } from "react-native";
import { Skeleton } from "@rneui/themed";
import React from "react";

export default function SkeletonLoading() {
  return (
    <ScrollView className="bg-primary px-2">
      <View className="flex flex-row items-center space-x-2 ml-2">
        <Skeleton circle width={65} height={65} animation="pulse" />
        <Skeleton animation="pulse" width={80} height={40} />
        <Skeleton animation="wave" width={80} height={40} />
        <Skeleton animation="none" width={80} height={40} />
      </View>
      <View className="flex flex-col gap-4 justify-center items-center mt-4 grow">
        <Skeleton width={375} height={14} animation="wave" />
        <Skeleton width={375} height={14} animation="pulse" />
        <Skeleton width={375} height={14} animation="wave" />
        <Skeleton width={375} height={14} animation="pulse" />
        <Skeleton width={375} height={14} animation="wave" />
      </View>
    </ScrollView>
  );
}
