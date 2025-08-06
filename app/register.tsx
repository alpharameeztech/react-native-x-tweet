import React from 'react';
import { View, Button } from 'react-native';

import { useRouter } from 'expo-router';
import {ThemedText} from "@/components/ThemedText";

export default function RegisterScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ThemedText>This is the register screen</ThemedText>
            <Button
                onPress={() => router.push('/login')}
                title="Go to Login Screen"
            />
        </View>
    );
}
