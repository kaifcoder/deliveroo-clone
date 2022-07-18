import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../Sanity';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import { ChevronRightIcon, LocationMarkerIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { selectRestaurant, setRestaurant } from '../features/restaurantSlice';
import { useSelector, useDispatch } from 'react-redux';

const RestaurantScreen = () => {
    const dispatch = useDispatch();
    const { params: {
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
    } } = useRoute();

    useEffect(() => {
        dispatch(setRestaurant({
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
        }))

    }, [dispatch])


    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View className="relative shadow">
                    <Image
                        source={{ uri: urlFor(imgUrl).url() }}
                        className="w-full h-64 p-4 bg-gray-300 rounded-md"

                    />
                    <TouchableOpacity className="absolute p-2 bg-gray-100 rounded-full top-14 left-5"
                        onPress={() => navigation.goBack()}
                    >
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <View className="px-4 pt-4">
                        <Text className="text-4xl font-bold">{title}</Text>
                        <View className="flex-row my-1 space-x-2">
                            <View className="flex-row items-center space-x-1">
                                <StarIcon color="green" size={22} opacity={0.5} />
                                <Text className="text-xs text-gray-500">
                                    <Text className="text-green-500">{rating}</Text> ･ {genre}</Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <LocationMarkerIcon color='gray' size={18} opacity={0.4} />
                                <Text className="text-xs text-gray-500">Nearby ･ {address}</Text>
                            </View>
                        </View>
                        <Text className="pb-4 mt-2 text-sm text-gray-500">{short_description}</Text>
                    </View>
                    <TouchableOpacity className="flex-row items-center p-4 space-x-2 border-gray-300 border-y">
                        <QuestionMarkCircleIcon color="gray" size={22} opacity={0.5} />
                        <Text className="flex-1 pl-2 font-semibold text-md">Have a Food Allergy ?</Text>
                        <ChevronRightIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className="pb-32">
                    <Text className="px-4 py-4 text-xl font-bold">
                        Menu
                    </Text>
                    {/* dish row */}
                    {dishes.map((dish) => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen