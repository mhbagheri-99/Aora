import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="px-4 justify-center items-center">
      <Image 
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode='contain'
      />
      <Text className="text-xl text-center text-white font-psemibold mt-2">
        {title}
      </Text>
      <Text className="text-sm text-gray-100 font-pmedium">
        {subtitle}
      </Text>
      <CustomButton 
        title="Create video"
        handlePress={() => {router.push('/create')}}
        containerStyles={"mt-5 w-full"}
      />
    </View>
  )
}

export default EmptyState