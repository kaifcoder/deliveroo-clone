import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { selectRestaurant } from '../features/restaurantSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import Currency from "react-currency-formatter"
import { urlFor } from '../Sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const Items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const dispatch = useDispatch();
    const [groupedInBasket, setGroupedInBasket] = useState([]);

    useMemo(() => {
        const groupedItems = Items.reduce((results, Item) => {
            (results[Item.id] = results[Item.id] || []).push(Item);
            return results;

        }, {});
        setGroupedInBasket(groupedItems)
    }, [Items])

    return (
        <SafeAreaView className="flex-1 bg-white" style={{ borderTopStartRadius: 20, borderTopEndRadius: 20, }}>
            <View className="flex-1 bg-gray-100" style={{ borderTopStartRadius: 20, borderTopEndRadius: 20, }}>
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs" style={{ borderTopStartRadius: 20, borderTopEndRadius: 20, }}>
                    <View>
                        <Text className="text-2xl font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity className="absolute bg-gray-200 rounded-full top-1 right-3" onPress={navigation.goBack}>
                        <XCircleIcon color="#00CCBB" size={40} />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center px-3 py-4 my-2 space-x-4 bg-white">
                    <Image
                        source={{ uri: "https://links.papareact.com/wru" }}
                        className="w-12 h-12 p-4 bg-gray-100 rounded-full"
                    />
                    <Text className="font-semibold">Deliver in 50-75 mins!</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00CCBB] p-2 rounded-xl bg-gray-100">Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className="divide-y divide-gray-200">
                    {Object.entries(groupedInBasket).map(([key, items]) => (
                        <View key={key} className="flex-row items-center px-5 py-3 space-x-3 bg-white">
                            <Text>
                                {items.length} x
                            </Text>
                            <Image
                                source={{ uri: urlFor(items[0]?.image).url() }}
                                className="w-12 h-12 rounded-full"
                            />
                            <Text className="flex-1">{items[0]?.name}</Text>
                            <Text className="text-gray-600">
                                <Currency quantity={items[0]?.price} currency="INR" />
                            </Text>
                            <TouchableOpacity className="">
                                <Text
                                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                                    className="text-red-500 rounded-lg text-md">

                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <View className="p-5 border-t border-[#00CCBB] space-y-5 shadow z-50 bg-white">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={basketTotal} currency="INR" />
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Tax and Delivery charge</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={0.18 * basketTotal} currency="INR" />
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Total</Text>
                        <Text className="font-extrabold">
                            <Currency quantity={basketTotal + (0.18 * basketTotal)} currency="INR" />
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PreparingOrder")}
                        className="bg-[#00CCBB] p-4 rounded-xl">
                        <Text className="font-extrabold text-center text-white text-md">Place Order!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen