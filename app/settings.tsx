import { Stack } from 'expo-router';
import {Button, StyleSheet, Text, View} from 'react-native';
import { AuthContext } from './(screens)/context/AuthProvider';
import {useContext} from "react";
export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <View style={styles.container}>
        <Button title="Logout" onPress={logout} />
        <Text style={styles.heading}>Settings</Text>
        <Text style={styles.item}>• Account</Text>
        <Text style={styles.item}>• Notifications</Text>
        <Text style={styles.item}>• Privacy</Text>
        <Text style={styles.item}>• Help & Support</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    fontSize: 18,
    marginBottom: 12,
  },
});
