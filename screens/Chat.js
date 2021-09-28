import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons"
import { TextInput } from 'react-native-gesture-handler'

const Chat = ({ navigation, route }) => {
    const [input, setinput] = useState("")

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
                    alignSelf: "flex-start",
                    flexDirection: "row",
                    alignItems: "center",
                }}>

                    <Avatar rounded source={{
                        uri: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
                    }} />
                    <Text
                        style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
                    >{route.params.chatName}</Text>
                </View>
            )
        })
    }, [navigation])
    const sendMessage = () => {

    }
    return (

        <View style={{ flex: 1,backgroundColor:"white" }}>

            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <>
                    <ScrollView >

                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={sendMessage}>
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
                            value={input}
                        />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={sendMessage}>
                            <Ionicons
                                name="camera-outline"
                                size={30}
                                color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={sendMessage}
                            style={{ marginLeft: 10 }}
                        >
                            <Ionicons
                                name="ios-mic-outline"
                                size={30}
                                color="black" />
                        </TouchableOpacity>
                    </View>
                </>

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
        alignItems:"flex-start",
        width: "100%",
        backgroundColor: "#f5f5f5",
        height: 80,
        padding: 10
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
    }
})
