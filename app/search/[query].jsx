import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { searchPosts } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard 
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row mb-6 justify-between items-start">
              <View>
                <Text className="text-sm text-gray-100 font-pmedium">
                  Search results for
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  "{query}"
                </Text>
              </View>
            </View>
            <SearchInput 
              initialQuery={query}
              placeholder={"Search for a video topic"}
            />

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No videos found"
            subtitle="Be the first to upload a video!"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search