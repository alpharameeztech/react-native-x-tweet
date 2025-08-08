
import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axiosConfig from "@/helpers/axiosConfig";
import { useRouter } from 'expo-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                error,
                isLoading,
                login: (email, password) => {
                    setIsLoading(true);
                    // setUser('Rameez');
                    // communicate with backend and store token in SecureStore
                    axiosConfig
                        .post('/login', {
                            email,
                            password,
                            device_name: 'mobile',
                        })
                        .then(response => {
                            const userResponse = {
                                token: response.data.token,
                                id: response.data.user.id,
                                name: response.data.user.name,
                                username: response.data.user.username,
                                email: response.data.user.email,
                                avatar: response.data.user.avatar,
                            };

                            setUser(userResponse);
                            setError(null);
                            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
                            setIsLoading(false);
                        })
                        .catch(error => {
                            console.log(error.response);
                            setError(error.response.data.message);
                            setIsLoading(false);
                        });
                },
                logout: () => {
                    setIsLoading(true);
                    console.log(user);
                    axiosConfig.defaults.headers.common[
                        'Authorization'
                        ] = `Bearer ${user.token}`;
                    axiosConfig
                        .post('/logout')
                        .then(response => {
                            setUser(null);
                            SecureStore.deleteItemAsync('user');
                            setError(null);
                            setIsLoading(false);
                            router.push('/login');
                        })
                        .catch(error => {
                            console.log(error);
                            setUser(null);
                            SecureStore.deleteItemAsync('user');
                            setError(error.response.data.message);
                            setIsLoading(false);
                        });
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};