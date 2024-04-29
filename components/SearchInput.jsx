import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ placeholder, initialQuery }) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '')

    return (
      <View className="w-full h-16 bg-black-100 rounded-2xl px-4 flex-row border-2 border-black-100 focus:border-secondary items-center space-x-4">
        <TextInput
          className="flex-1 text-white font-pregular text-base mt-0.5"
          value={query}
          placeholder={placeholder}
          placeholderTextColor='#cdcde0'
          onChangeText={(q) => setQuery(q)}
        />
        <TouchableOpacity onPress={() => {
          if (!query) return Alert.alert('Missing query','Please enter a search query')
          if (pathname.startsWith('/search')) {
            router.setParams({ query })
          } else {
            router.push(`/search/${query}`)
          }
        }}>
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