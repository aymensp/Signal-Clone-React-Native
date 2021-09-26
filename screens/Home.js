import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native'
import { Avatar, Input } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

const Home = ({ navigation }) => {
    const SignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerLeft: () => (
                <View >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={SignOut}
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

                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                     activeOpacity={0.5}
                     onPress={()=>navigation.navigate("AddChat")}
                     >
                        <SimpleLineIcons name='pencil' size={22} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])
    return (
        <SafeAreaView>
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
            <ScrollView>
                <CustomListItem
                />
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
    }
})
