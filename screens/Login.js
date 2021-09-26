import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';


const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsebscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
        })
        return unsebscribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => alert(error))

    }
    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={styles.container}>
            <StatusBar style='light' />
            <Image source={{
                uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
            }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    autoFocus
                    type='email'
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type='password'
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />

            </View>
            <Button
                title="Login"
                containerStyle={styles.button}
                onPress={signIn}
            />
            <Button
                title="Register"
                type="outline"
                containerStyle={styles.button}
                onPress={() => navigation.navigate('Register')}
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white"

    },

    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,

    }

})
