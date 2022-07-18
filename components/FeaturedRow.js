import { View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../Sanity'

const FeaturedRow = ({ id, title, description }) => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured" && _id == $id] {
            ...,
            restaurants[]->{
              ...,
              dishes[] ->,
                type->{
                name
              }
              },
            }[0]
        `, { id }).then((data) => {
            setRestaurants(data?.restaurants)
        })
    }, [id])

    // console.log(restaurants)

    return (
        <View className="">
            <View className="flex-row items-center justify-between px-4 mt-4 ">
                <Text className="text-xl font-bold ">{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>
            <Text className="px-4 text-gray-500 text-s">{description}</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                className="pt-4"
            >
                {/* restaurant cards... */}
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        title={restaurant.name}
                        imgUrl={restaurant.image}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}

            </ScrollView>


        </View>

    )
}

export default FeaturedRow