import { Tabs } from 'expo-router';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Platform, SafeAreaView, View} from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext } from '../(screens)/context/AuthProvider';
import LoginScreen from "@/app/(screens)/Auth/LoginScreen";
import * as SecureStore from 'expo-secure-store';

export default function TabLayout() {
  const colorScheme = useColorScheme();

    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => {
        // check if user is logged in or not.
        // Check SecureStore for the user object/token
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);

        SecureStore.getItemAsync('user')
            .then(userString => {
                if (userString) {
                    setUser(JSON.parse(userString));
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
        });

    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="gray" />
            </View>
        );
    }

  return (
      <>
          {user ? (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
      ):(
        <SafeAreaView style={{ flex: 1 }}>
            <LoginScreen />
        </SafeAreaView>
      )}
      </>
  );
}
