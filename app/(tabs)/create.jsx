import { Text, ScrollView, View, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import React, { useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { createPost } from '../../lib/appwrite'

const Create = () => {
  const [isUploading, setIsUploading] = useState(false)
  const { user } = useGlobalContext()
  const [form, setForm] = useState({
    title: '',
    prompt: '',
    video: null,
    thumbnail: null,
    creator: user?.$id
  })

  const openPicker = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
      quality: 1
    })
    if(!result.canceled) {
      if(type === 'video') {
        setForm({ ...form, video: result.assets[0] })
      } else {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
    }
  }

  const handleUpload = async () => {
    if(!form.title || !form.prompt || !form.video || !form.thumbnail) {
      return Alert.alert('Error', 'Please fill in all fields')
    }
    setIsUploading(true)
    try {
      await createPost(form)
      Alert.alert('Success', 'Post uploaded successfully!')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsUploading(false)
      setForm({
        title: '',
        prompt: '',
        video: null,
        thumbnail: null,
        creator: user?.$id
      })
    }
    
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Create a Post
        </Text>
        <FormField 
          title={"Video Title"}
          value={form.title}
          placeholder={"Enter a title for your video"}
          handleChangeText={(text) => setForm({ ...form, title: text })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form?.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl
              justify-center items-center">
                <View className="w-14 h-14 border border-secondary-100
                border-dashed justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode='contain'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form?.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode='cover'
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl
              justify-center items-center border-2 border-black-200
              flex-row space-x-2">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode='contain'
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField 
          title={"AI Prompt"}
          value={form.prompt}
          placeholder={"Enter the prompt used for the video"}
          handleChangeText={(text) => setForm({ ...form, prompt: text })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit and Publish"
          handlePress={() => handleUpload()}
          containerStyles="mt-10"
          isLoading={isUploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create