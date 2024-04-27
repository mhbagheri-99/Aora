import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, keyboardType,
  otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {title}
      </Text>
      <View className="w-full h-16 bg-black-100 rounded-2xl px-4 flex-row
      border-2 border-black-100 focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image 
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
              resizeMode='contain'
            />
          </TouchableOpacity>  
        )}
      </View>
    </View>
  )
}

export default FormField