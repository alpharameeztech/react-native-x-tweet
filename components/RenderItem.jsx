import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import {ThemedText} from "./ThemedText";
import {formatDistanceToNowStrict} from "date-fns";
import formatDistance from "../helpers/formatDistanceCustom";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import {router} from "expo-router";

export default function RenderItem({item: item}) {
    function goToProfile(userId){
        router.push({
            pathname: '/profile/[userId]',
            params: { userId }
        });
    }

    function goToSingleTweet(tweetId){
        router.push(`/tweet/${tweetId}`);
    }

    return (
        <View style={styles.tweetContainer}>
            <TouchableOpacity onPress={() => goToProfile(item.user.id)}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: item.user.avatar
                    }} />
            </TouchableOpacity>
            <View style={{ flex:1 }}>
                <TouchableOpacity style={styles.flexRow} onPress={() => goToProfile(item.user.id)}>
                    <ThemedText numberOfLines={1} style={styles.tweetName}>{item.user.name}</ThemedText>
                    <ThemedText numberOfLines={1} style={styles.tweetHandle}>@{item.user.username}</ThemedText>
                    <ThemedText>&middot;</ThemedText>
                    <ThemedText numberOfLines={1} style={styles.tweetHandle}>
                        {formatDistanceToNowStrict(new Date(item.created_at), {
                            addSuffix: true,
                            locale: { formatDistance },
                        })}
                    </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tweetContentContainer} onPress={() => goToSingleTweet(item.id)}>
                    <ThemedText style={styles.tweetContent}>
                        {item.body}
                    </ThemedText>
                </TouchableOpacity>

                <View style={styles.tweetEngagement}>
                    <TouchableOpacity style={styles.flexRow}>
                        <ThemedText>
                            <EvilIcons name="comment" size={24} color="gray" />
                        </ThemedText>
                        <ThemedText style={styles.textGray}>456</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                        <ThemedText>
                            <EvilIcons name="retweet" size={24} color="gray" />
                        </ThemedText>
                        <ThemedText style={styles.textGray}>456</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                        <ThemedText>
                            <EvilIcons name="heart" size={24} color="gray" />
                        </ThemedText>
                        <ThemedText style={styles.textGray}>188</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                        <ThemedText>
                            <EvilIcons name={Platform.OS === 'ios'? 'share-apple' : 'share-google'} size={24} color="gray" />
                        </ThemedText>
                        <ThemedText style={styles.textGray}>188</ThemedText>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
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
    },
    flexRow:{
        flexDirection: 'row'
    },
    tweetName:{
        fontWeight: 'bold',
        color: '#222222'
    },
    tweetHandle:{
        marginHorizontal: 8,
        color: 'gray'
    },
    tweetContentContainer:{
        marginTop: 4,
    },
    tweetSeparator:{
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
    },
    tweetContent:{
        lineHeight: 20
    },
    textGray: {
        color: 'gray',
    },
    tweetEngagement:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12
    },
    ml4:{
        marginLeft: 16
    },
    floatingButton:{
        width:60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d9bf1',
        position: 'absolute',
        bottom: 100,
        right: 12,
    }
});