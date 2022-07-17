import { Text, View, Image, StatusBar, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    UserIcon,
    ChevronDownIcon,
    SearchIcon,
    AdjustmentsIcon,
} from 'react-native-heroicons/outline'


const HomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
    return (
        <SafeAreaView className="bg-white">
            {/* header */}
            <View className="flex-row pb-3 items-center mx-2 space-x-2">
                <Image
                    source={{ uri: 'https://links.papareact.com/wru' }}
                    className='h-9 w-9 bg-gray-300 p-4 rounded-full'
                />
                <View className="flex-1">
                    <Text className="font-bold text-s text-gray-400">Deliver now!</Text>
                    <Text className="font-medium text-xl">Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>
                <UserIcon size={35} color="#00CCBB" />
            </View>
            {/* search */}
            <View className="flex-row items-center space-x-2 pb-2 px-2">
                <View className="flex-row flex-1 bg-gray-200 p-3 space-x-2 rounded-lg">
                    <SearchIcon color="gray" size={24} />
                    <TextInput placeholder='Restaurant and cuisines' />
                </View>
                <AdjustmentsIcon color="#00CCBB" size={24} />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;
