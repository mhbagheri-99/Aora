import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const { user } = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false)

  const { data: posts, refetch: refetchAll } = useAppwrite(getAllPosts)
  const { data: latestPosts, refetch: refetchLatest } = useAppwrite(getLatestPosts)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetchAll()
    await refetchLatest()
    setRefreshing(false)
  }

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
                  {`Welcome back, ${user?.username}!`}
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  Here are some recommended posts for you.
                </Text>
              </View>
              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput placeholder={"Search for a video topic"}/>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []}/>
            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No videos found"
            subtitle="Be the first to upload a video!"
          />
        )}
        refreshControl={<RefreshControl 
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      />
    </SafeAreaView>
  )
}

export default Home