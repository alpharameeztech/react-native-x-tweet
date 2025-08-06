import React, { useContext, useState } from 'react';
import { View, TextInput, Button, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ThemedText>Login Screen</ThemedText>

                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        width: 250,
                        padding: 10,
                        marginBottom: 10,
                        backgroundColor: 'white',
                    }}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        width: 250,
                        padding: 10,
                        marginBottom: 10,
                        backgroundColor: 'white',
                    }}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />

                <Button onPress={() => login(email, password)} title="Login" />
                <Button onPress={() => router.push('/register')} title="Go to Register Screen" />
            </View>
        </SafeAreaView>
    );
}
