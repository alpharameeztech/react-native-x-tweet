import { ThemedText } from '@/components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import { formatDistanceToNowStrict } from 'date-fns';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {useContext, useEffect, useRef, useState} from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import axiosConfig from '../../helpers/axiosConfig';
import formatDistance from '../../helpers/formatDistanceCustom';
import RenderItem from "@/components/RenderItem";

export default function TabTwoScreen() {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
    const flatListRef = useRef(null);

    const { newTweetAdded } = useLocalSearchParams();

    useEffect(() => {
        getAllTweetsRefresh();

        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: 0, animated: true });
            }
        }, 100);

    }, [newTweetAdded]);

    useEffect(() =>{
        getAllTweets()
    }, [page])

    function getAllTweetsRefresh(){
        setPage(1);
        setIsAtEndOfScrolling(false);
        setIsRefreshing(true);

        axiosConfig.get(`/tweets_all`)
            .then(response => {
                setData(response.data.data);
                setIsLoading(false);
                setIsRefreshing(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                setIsRefreshing(false);
            })
    }

    function getAllTweets(){

        axiosConfig.get(`/tweets_all?page=${page}`)
            .then(response => {
                if(page == 1){
                    setData(response.data.data);
                } else{
                    setData([...data, ...response.data.data])
                }

                if(!response.data.next_page_url){
                    setIsAtEndOfScrolling(true);
                }

                setIsLoading(false);
                setIsRefreshing(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                setIsRefreshing(false);
            })
    }

    function handleRefresh(){
        setPage(1);
        setIsAtEndOfScrolling(false);
        setIsRefreshing(true);
        getAllTweets();
    }

    function handleEnd(){
        setPage(page + 1);
    }


    function goToNewTweet(){
        router.push('/new-tweet');
    }

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            {isLoading ? (
                <ActivityIndicator style={{marginTop:10}} size="large" />
            ):(
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={({item}) =>
                        <>
                            <RenderItem item={item} />
                        </>
                    }
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={()=> <View style={styles.tweetSeparator}></View>}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    onEndReached={handleEnd}
                    onEndReachedThreshold={0}
                    ListFooterComponent={() => !isAtEndOfScrolling && (
                        <ActivityIndicator size="large" color="gray" />
                    )}
                />
            )}

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => goToNewTweet()}
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
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