import { View, Text, TouchableOpacity, Image, ProgressBarAndroidComponent } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    return (
        <View className="bg-[#00CCBB] flex-1">
            <SafeAreaView className="z-50">
                <View className="flex-row items-center justify-between p-5">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}>
                        <XIcon color="white" size={40} />
                    </TouchableOpacity>
                    <Text className="text-lg font-light text-white">Order Help</Text>
                </View>
                <View className="z-50 p-6 mx-5 my-2 bg-white rounded-md shadow-md">
                    <View className="flex-row justify-between">

                        <View>
                            <Text className="text-lg text-gray-400">Estimate Arrival</Text>
                            <Text className="text-3xl font-bold">45-55 Minutes</Text>
                        </View>
                        <Image
                            source={{ uri: "https://links.papareact.com/fls" }}
                            className="w-20 h-20"
                        />
                    </View>
                    <Progress.Bar size={30} indeterminate={true} color="#00CCBB" />
                    <Text className="mt-3 text-sm text-gray-500">Your order at {restaurant.title} is being prepared...</Text>
                </View>
            </SafeAreaView>
            <MapView
                initialRegion={
                    {
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }
                }
                className="z-0 flex-1 -mt-10"
                mapType='mutedStandard'
            >
                <Marker
                    coordinate={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                    }}
                    title={restaurant.title}
                    description={restaurant.short_description}
                    identifier="origin"
                    pinColor='#00CCBB'
                />
            </MapView>
            <SafeAreaView className="flex-row items-center space-x-5 bg-white h-28">
                <Image
                    source={{ uri: "https://links.papareact.com/wru" }}
                    className="w-12 h-12 p-4 ml-4 bg-gray-400 rounded-full"
                />
                <View>
                    <Text className="text-lg">Anonymus person</Text>
                    <Text className="text-gray-400">Your Rider</Text>
                </View>
                <Text className="text-[#00CCBB] text-lg font-bold mr-5">
                    Call
                </Text>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen