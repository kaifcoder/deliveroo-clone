import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../Sanity'
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
    id,
    title,
    imgUrl,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity className="mr-3 bg-white shadow"
            onPress={() => {
                navigation.navigate('Restaurant', {
                    id,
                    title,
                    imgUrl,
                    rating,
                    genre,
                    address,
                    short_description,
                    dishes,
                    long,
                    lat,
                })
            }}
        >
            <Image
                source={{ uri: urlFor(imgUrl).url(), }}
                className="w-64 rounded-sm h-36"
            />
            <View className="px-3 pb-4">
                <Text className="pt-2 text-lg font-medium ">{title}</Text>
                <View className="flex-row items-center space-x-1">
                    <StarIcon color="green" size={22} opacity={0.5} />
                    <Text className="text-xs text-gray-500">
                        <Text className="text-green-500">{rating}</Text> ･ {genre}</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                    <LocationMarkerIcon color='gray' size={22} />
                    <Text className="text-xs text-gray-500">Nearby ･ {address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard