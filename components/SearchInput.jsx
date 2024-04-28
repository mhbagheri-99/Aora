import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ value, placeholder, handleChangeText, keyboardType,
  otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      <View className="w-full h-16 bg-black-100 rounded-2xl px-4 flex-row border-2 border-black-100 focus:border-secondary items-center space-x-4">
        <TextInput
          className="flex-1 text-white font-pregular text-base mt-0.5"
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          {...props}
        />
        <TouchableOpacity>
          <Image 
            source={icons.search}
            className="w-5 h-5"
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
    )
}

export default SearchInput