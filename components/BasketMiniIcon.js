import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Currency from "react-currency-formatter"
import { ShoppingCartIcon } from 'react-native-heroicons/solid'

const BasketMiniIcon = () => {
    const navigation = useNavigation();
    const Items = useSelector(selectBasketItems);
    // const basketTotal = useSelector(selectBasketTotal);

    return (
        Items.length > 0 && (
            <View className="absolute right-5 bottom-5 z-50">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Basket')}
                    className="shadow-2xl bg-[#00CCBB] p-3 rounded-full items-center justify-center">
                    <ShoppingCartIcon size={40} color="white" />
                    <Text className="absolute top-3 right-3 bg-[#138882] font-extrabold text-sm rounded-full px-1 text-white">{Items.length}</Text>
                </TouchableOpacity>
            </View>
        )

    )
}

export default BasketMiniIcon