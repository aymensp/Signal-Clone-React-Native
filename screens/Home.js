import React ,{useLayoutEffect}from 'react'
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native'
import CustomListItem from '../components/CustomListItem'

const Home = ({navigation}) => {
    useLayoutEffect(() => {
   navigation.setOptions({
       title: "Signal",
       
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
