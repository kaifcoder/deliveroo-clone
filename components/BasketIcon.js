import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Currency from "react-currency-formatter"

const BasketIcon = () => {
    const navigation = useNavigation();
    const Items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);

    return (
        Items.length > 0 && (
            <View className="absolute bottom-10 w-full z-50">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Basket')}
                    className="mx-5 shadow-2xl bg-[#00CCBB] p-4 flex-row rounded-lg items-center space-x-1">
                    <Text className="bg-[#01A296] py-1 px-2 text-white font-extrabold">{Items.length}</Text>
                    <Text className="flex-1 text-white font-extrabold text-center text-lg">View Basket</Text>
                    <Text className="text-lg text-white font-extrabold">
                        <Currency quantity={basketTotal} currency="INR" />
                    </Text>
                </TouchableOpacity>
            </View>)

    )
}

export default BasketIcon