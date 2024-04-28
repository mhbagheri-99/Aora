import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingPost = ({ activePost, post }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
  <Animatable.View className="mr-5" 
  animation={activePost === post.$id ? zoomIn : zoomOut}
  duration={500}>
    {isPlaying ? (
      <Video 
        source={{ uri: post.video }}
        className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
        shouldPlay
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => {
          if(status.didJustFinish) setIsPlaying(false)
        }}
      />
    ) : (
      <TouchableOpacity className="relative
      justify-center items-center" activeOpacity={0.7}
      onPress={() => {setIsPlaying(true)}}>
        <ImageBackground
          source={{ uri: post.thumbnail }}
          className="w-52 h-72 rounded-[35px] my-5
          overflow-hidden shadow-lg shadow-black/40"
          resizeMode='cover'
        />
        <Image 
          source={icons.play}
          className="w-12 h-12 absolute"
          resizeMode='contain'
        />
      </TouchableOpacity>
    )}
  </Animatable.View>
  )
}

const Trending = ({ posts }) => {
  const [activePost, setActivePost] = useState(posts[0])

  const viewablePostsChanged = ({ viewablePosts }) => {
    if (viewablePosts)
      if(viewablePosts.length > 0) 
        setActivePost(viewablePosts[0].key)
  }

  return (
    <FlatList 
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingPost 
        activePost={activePost}
        post={item}
        />
      )}
      onViewableItemsChanged={viewablePostsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  )
}

export default Trending