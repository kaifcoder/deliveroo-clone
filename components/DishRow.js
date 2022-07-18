import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Currency from "react-currency-formatter"
import { urlFor } from '../Sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice'


const DishRow = ({
    id,
    name,
    description,
    price,
    image,
}) => {

    const [isPressed, setIsPressed] = useState(false);

    const dispatch = useDispatch();
    const Items = useSelector((state) => selectBasketItemsWithId(state, id)).length;

    const removeItemFromBasket = () => {
        if (!Items > 0) return;
        dispatch(removeFromBasket({ id }))
    }

    const addItemToBasket = () => {
        dispatch(addToBasket({
            id,
            name,
            description,
            price,
            image
        }));
    }

    return (
        <>
            <TouchableOpacity onPress={() => {
                setIsPressed(!isPressed)
            }} className={`p-4 bg-white border border-gray-200 ${isPressed && "border-b-0"}`}>
                <View className="flex-row">

                    <View className="flex-1 pr-2">
                        <Text className="mb-1 text-lg font-semibold">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="mt-2 text-gray-500">
                            <Currency quantity={price} currency="INR" />
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: "#f3f3f4"
                            }}
                            source={{ uri: urlFor(image).url() }}
                            className="w-20 h-20 p-4 bg-gray-200 rounded-xl"
                        />
                    </View>
                </View>

            </TouchableOpacity>
            {isPressed && (
                <View className="px-4 bg-white">
                    <View className="flex-row items-center pb-3 space-x-2">
                        <TouchableOpacity
                            onPress={removeItemFromBasket}
                            disabled={!Items}
                        >
                            <MinusCircleIcon
                                color={Items > 0 ? "#00CCBB" : "gray"} size={40}
                            />
                        </TouchableOpacity>
                        <Text>{Items}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon color="#00CCBB" size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

export default DishRow