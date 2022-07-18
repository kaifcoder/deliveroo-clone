import { Text, View, Image, StatusBar, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    UserIcon,
    ChevronDownIcon,
    SearchIcon,
    AdjustmentsIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../Sanity'
import BasketMiniIcon from '../components/BasketMiniIcon'


const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        sanityClient.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[] ->,
          }
        }
      `).then(data => {
            setFeaturedCategories(data)
        })
    }, []);
    return (
        <>
            <BasketMiniIcon />
            <SafeAreaView className="bg-white">
                {/* header */}
                <View className="flex-row items-center pb-3 mx-2 space-x-2">
                    <Image
                        source={{ uri: 'https://links.papareact.com/wru' }}
                        className='p-4 bg-gray-300 rounded-full h-9 w-9'
                    />
                    <View className="flex-1">
                        <Text className="font-bold text-gray-400 text-s">Deliver now!</Text>
                        <Text className="text-xl font-medium">Current Location
                            <TouchableOpacity className="ml-2">

                                <ChevronDownIcon size={20} color="#00CCBB" />
                            </TouchableOpacity>
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <UserIcon size={30} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                {/* search */}
                <View className="flex-row items-center px-2 pb-2 space-x-2 shadow-b-xl">
                    <View className="flex-row flex-1 p-3 space-x-2 bg-gray-200 rounded-lg">
                        <SearchIcon color="gray" size={24} />
                        <TextInput placeholder='Restaurant and cuisines' multiline={false} className="w-full" />
                    </View>
                    <TouchableOpacity>
                        <AdjustmentsIcon color="#00CCBB" size={24} />
                    </TouchableOpacity>
                </View>
                {/* Body */}
                <ScrollView className="bg-gray-100"
                    contentContainerStyle={{
                        paddingBottom: 130,
                    }}
                >
                    {/* categories */}
                    <Categories />
                    {/* featured */}

                    {featuredCategories?.map((featured, index) => {
                        return (
                            <FeaturedRow
                                key={index}
                                id={featured._id}
                                title={featured.name}
                                description={featured.short_description}
                            />
                        )
                    },
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default HomeScreen;
