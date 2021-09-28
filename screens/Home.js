import React, { useLayoutEffect, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput, StatusBarIOS, StatusBar } from 'react-native'
import { Avatar, Input } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { db } from '../firebase'

const Home = ({ navigation }) => {
    const SignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    }
    const [chats, setchats] = useState([])
    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setchats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
        return unsubscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff", elevation: 0, shadowColor: 'transparent' },
            headerTitleStyle: { color: "black" },
            headerLeft: () => (
                <View >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={SignOut}
                        style={{ marginLeft: 10 }}
                    >
                        <Avatar
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL
                            }}

                        />
                    </TouchableOpacity>

                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 70,
                    marginRight: 10

                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("AddChat")}
                    >
                        <SimpleLineIcons name='pencil' size={22} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        })
    }
    return (

        <SafeAreaView >
            <StatusBar barStyle="dark-content" />
            <View style={{ backgroundColor: "white" }}>
                <View style={styles.inputLabel}>
                    <AntDesign name='search1' size={20} color="gray" />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="gray"
                    />
                </View>
            </View>
            <ScrollView style={styles.list}>
                {chats?.map(({ id, data: { chatName } }) => (
                    <CustomListItem
                        key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat}
                    />
                ))}

            </ScrollView>
        </SafeAreaView>

    )
}

export default Home

const styles = StyleSheet.create({
    input: {
        height: 40,
        flex: 1,
        fontSize: 20,
        marginLeft: 5,
    },
    inputLabel: {
        backgroundColor: '#ededed',
        height: 40,
        borderRadius: 10,
        margin: 10,
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    list: {
        height: "100%"
    }
})
