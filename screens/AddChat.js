import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { db } from '../firebase'

const AddChat = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBacktitle: "chats",
        })

    }, [navigation])
    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input,
        }).then(() => {
            navigation.goBack();
        })
            .catch((error) => alert(error));
    }
    const [input, setInput] = useState("")
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter z chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon
                        name='wechat'
                        type="antdesign"
                        size={24}
                        color="black"
                    />
                }

            />
            <Button onPress={createChat} title="Create new chat" />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }
})
