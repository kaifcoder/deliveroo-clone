import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 4000)
    }, [])

    return (
        <SafeAreaView className="bg-[#ffffff] flex-1 justify-center items-center">
            <Animatable.Image
                source={require("../assets/foodpreparing.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="w-64 h-64"
            />
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-lg text-[#00CCBB] font-semibold text-center my-10"
            >
                Waiting For Restaurant to accept your Order!
            </Animatable.Text>
            <Progress.Circle size={60} indeterminate={true} color="#00CCBB" />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen