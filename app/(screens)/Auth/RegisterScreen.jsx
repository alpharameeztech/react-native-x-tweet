import React from 'react';
import { View, Button } from 'react-native';
import {ThemedText} from "../../../components/ThemedText";

export default function RegisterScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ThemedText>This is the register screen</ThemedText>
            <Button
                onPress={() => navigation.navigate('Login Screen')}
                title="Go to Login Screen"
            />
        </View>
    );
}