import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/index";
import CustomForm from "@/components/customform";
import CustomButton from "@/components/custombutton";
import { Link, router } from "expo-router";
import { createuser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIslogged } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Please fill all fields");
    }
    setSubmitting(true);
    try {
      const res = await createuser({
        email: form.email,
        password: form.password,
        username: form.username,
      });
      setUser(res);
      setIslogged(true);
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("An error occured");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full px-5 mt-[14vh] ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[74px] mx-auto"
          />
          <Text className="text-3xl text-white font-bold text-center mt-4">
            Sign Up to Aora
          </Text>
          <CustomForm
            tittle="Username"
            value={form.username}
            handlechange={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            placeholder=""
            key={1}
          />
          <CustomForm
            tittle="Email"
            value={form.email}
            handlechange={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
            placeholder="example@gmail.com"
            key={2}
          />
          <CustomForm
            tittle="Password"
            value={form.password}
            handlechange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyBoardType="password"
            placeholder="********"
            key={3}
          />

          <CustomButton
            tittle="Sign Up"
            handlePress={submit}
            containerStyles="mt-14"
            textStyles=""
            isLoading={submitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account Already?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
