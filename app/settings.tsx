import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <View style={styles.container}>
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
