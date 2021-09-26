import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase'

const Home = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View >
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}

                    />

                </View>
            )
        })
    }, [])
    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem

                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
