import { ThemedText } from '@/components/ThemedText';
import { EvilIcons } from '@expo/vector-icons';
import { Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
          style={styles.backgroundImage} 
          source={{
            uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.18ixid=MnwxMjA%D0%97fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80'
          }} />

      <View style={styles.avatarContainer} >
        <Image
          style={styles.avatar} 
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png'
        }} />  
        <TouchableOpacity style={styles.followButton}>
          <ThemedText style={styles.followButtonText}>
          Follow
        </ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.nameContainer}>
        <ThemedText
        style={styles.profileName}>Rameez Israr🏇🏻
        </ThemedText>
        <ThemedText
          style={styles.profileHandle}>
          @rameezisrartech
        </ThemedText>
      </ View>

      <View style={styles.profileContainer}>
        <ThemedText style={styles.profileContainerText}>
          CEO
          of CEOs. PhD, MSc, SEO, HTML, CSS, JS Evangelist Pro Expert S Rank
          Elite
          Best of the best.
          </ ThemedText>
      </View>

      <View style={styles.locationContainer} >
        <EvilIcons name="location" size={24} color="gray" />
        <ThemedText style={styles.textGray}>Veghel, Netherlands</ThemedText>
      </View>


      <View style={styles.linkContainer}>
        <TouchableOpacity style={styles.linkItem}
          onPress={() => Linking.openURL('https://laracasts.com' )}>
          <EvilIcons name="link" size={24} color="gray" />
          <ThemedText style={styles.linkColor}>laracasts.com</ThemedText>
        </TouchableOpacity>
        <View style={[styles.linkItem, styles.ml4]}>
          <EvilIcons name="calendar" size={24} color="gray" />
          <ThemedText style={styles.textGray}>Joined March 2009</ThemedText>
        </ View>
      </View>

      <View
        style={styles.followContainer}>
        <View style={styles.followItem}>
          <ThemedText  style={styles.followItemNumber}>509</ThemedText>
          <ThemedText style={styles. followItemLabel}>Following</ThemedText>
        </View>
        <View style={[styles.followItem, styles.ml4]}>
          <ThemedText style={styles.followItemNumber}>2,354</ThemedText>
          <ThemedText style={styles. followItemLabel}>Followers</ThemedText>
        </View>
      </View>

      <View style={styles.separator}></View>

      
    </View>
  );
}


const styles = StyleSheet.create({
  textGray: {
    color: 'gray',
  },
  ml4:{
    marginLeft: 16
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage:{
    width: 800,
    height: 120,
  },
  avatarContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginTop: -30
  },
  avatar:{
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white'
  },

  followButton: {
    backgroundColor: '#0f1418',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  nameContainer: {
    paddingHorizontal: 10, paddingVertical: 2,
  },
  profileName: {
    fontWeight:
    'bold',
    fontSize: 22
  },
  profileHandle: {
    color: 'gray',
    marginTop: 1 
  },

  profileContainer: {
    paddingHorizontal:10,
     marginTop: 8
  },
  profileContainerText: {
    lineHeight: 20
  },
  locationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 12,
  },
  linkContainer: {
    flexDirection: 'row' ,
    paddingHorizontal: 10,
    marginTop: 10
  },

  linkColor: {
    color: '#1d9bf1'
  },
  linkItem: {
    flexDirection: 'row'
  },

  followContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  followItem: {
    flexDirection: 'row',
  },
  followItemNumber:{
    fontWeight: 'bold',
  },
  followItemLabel: {
    marginLeft: 4
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor:'#E5E7EB'
  }
})