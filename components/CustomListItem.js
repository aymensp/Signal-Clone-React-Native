import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessags] = useState([])
    useEffect(() => {
        const unsebscribe =
        db.collection('chats').doc(id).collection('messages').orderBy('timestamp', "desc").onSnapshot(
            (snapshot) =>
                setChatMessags(snapshot.docs.map((doc) => doc.data()))
        )
        return unsebscribe
    }, [])

    return (
        <ListItem
            key={id}
            bottomDivider
            onPress={() => enterChat(id, chatName)}
        >
            <Avatar
                rounded
                source={{ 
                    uri: chatMessages?.[0]?.photoUrl ||  
                     "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
                }}

            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                   {!chatMessages[0] ? "Start chatting" :  chatMessages?.[0]?.displayName  +":"+ chatMessages?.[0]?.message} 
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
