import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons"
import { TextInput } from 'react-native-gesture-handler'
import { auth, db } from '../firebase'
import firebase from "firebase"

const Chat = ({ navigation, route }) => {
    const [input, setinput] = useState("")
    const [messages, setMessages] = useState([])
    const scrollViewRef = useRef();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerRight: () => (
                <View style={{
                    marginRight: 20,
                    alignItems: 'center',
                    justifyContent: "space-between",
                    width: 70,
                    flexDirection: "row"
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={{ marginLeft: 10 }}
                >
                    <AntDesign
                        name="arrowleft"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>

                    <Avatar
                        rounded
                        source={{

                            uri: messages[(messages).length - 1]?.data.photoUrl || "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
                        }}

                    />
                    <Text
                        style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
                    >{route.params.chatName}</Text>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = () => {
        if (!input) {
            alert("hnin ekteb message")
        }
        else {
            Keyboard.dismiss();
            db.collection("chats").doc(route.params.id).collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoUrl: auth.currentUser.photoURL
            })
        }
        setinput('');

    }
    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ));

        scrollViewRef.current.scrollToEnd()

        return unsubscribe;
    }, [])

    return (

        <View style={{ flex: 1, backgroundColor: "white" }}>

            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView

                            ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
                            contentContainerStyle={{
                                paddingTop: 15
                            }}
                        >
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar source={{
                                            uri: data.photoUrl
                                        }}
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -15,
                                                right: -5
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            size={35}
                                            position="absolute"
                                            rounded
                                        />
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar source={{
                                            uri: data.photoUrl
                                        }}
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -15,
                                                left: -5
                                            }}
                                            bottom={-15}
                                            left={-5}
                                            size={35}
                                            position="absolute"
                                            rounded
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>

                        <View style={styles.footer}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                            >
                                <Ionicons
                                    name="add"
                                    size={30}
                                    color="grey"
                                />
                            </TouchableOpacity>

                            <TextInput
                                placeholder="Signal message"
                                style={styles.textInput}
                                onChangeText={setinput}
                                onSubmitEditing={sendMessage}
                                value={input}
                            />
                            <TouchableOpacity
                                activeOpacity={0.5}
                            >
                                <Ionicons
                                    name="camera-outline"
                                    size={30}
                                    color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={{ marginLeft: 10 }}
                            >
                                <Ionicons
                                    name="ios-mic-outline"
                                    size={30}
                                    color="black" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>

    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: "#f5f5f5",
        height: 80,
        padding: 10,
        bottom: 0

    },
    textInput: {
        height: 40,
        flex: 1,
        marginRight: 12,
        marginLeft: 12,
        backgroundColor: "#ECECEC",
        borderColor: "transparent",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 10
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "%80",
        position: "relative"

    },
    sender: {
        padding: 15,
        backgroundColor: "#2868E6",
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: "%80",
        position: "relative"
    },
})
