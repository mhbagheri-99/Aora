import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setIsLoggedIn, setUser } = useGlobalContext()

  const submitForm = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
    }
    setIsSubmitting(true)
    try {
      const result = await createUser(form.username, form.email, form.password)
      setUser(result)
      setIsLoggedIn(true)
      
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', Error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image 
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode='contain'
          />
          <Text className="text-2xl text-white mt-10 font-psemibold">
            Sign up
          </Text>
          <FormField 
            title='Username'
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyles='mt-10'
          />
          <FormField 
            title='Email'
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles='mt-7'
          />
          <CustomButton 
            title='Sign Up'
            containerStyles='mt-7'
            handlePress={submitForm}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 text-lg font-pregular">
              Already have an account?
            </Text>
            <Link className="text-secondary font-psemibold text-lg" 
            href={"/sign-in"}>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp