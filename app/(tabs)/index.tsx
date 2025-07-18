import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Button, FlatList, Platform, StyleSheet, TouchableOpacity, View, } from 'react-native';
export default function HomeScreen() {
  const router = useRouter();
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  function goToProfile (){
    router.push('profile');
  }
  const Item = ({ title }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToProfile()}>
        <Image
        style={styles.avatar} 
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png'
        }} />
      </TouchableOpacity>
      <ThemedText>{title}</ThemedText>
    </View>
  );
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title="Go to Profile" onPress={() => router.push('/profile')} />
        <Button title="View Tweet" onPress={() => router.push('/tweet')} />
        <Button title="Compose New Tweet" onPress={() => router.push('/new-tweet')} />
      </View>

      <FlatList
        data={DATA}
        renderItem={({item}) => 
          <>
          <Item title={item.title} />
          <Item title={item.title} />
          </>
        }
        keyExtractor={item => item.id}
      />
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container:{
    flex:1, alignItems: 'center', justifyContent: 'center'
  },
  tweetContainer:{
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  avatar:{
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 10
  }
});