import { Text, StyleSheet, View, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color'

const AudioListItem = ({title, duration})=> {
 
    return (
        <>
      <View style={styles.container}>
            <View style = {styles.leftContainer}>
                <View style={styles.thumbnail}>
                    <Text style={styles.thumbnailText}>A</Text>
                </View>
                <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.titleContainer}>This will be some long song text container</Text>
                        <Text style={styles.timeText}>
                          03:59
                        </Text>
                </View>
            </View>
            <View style = {styles.rightContainer}>
            <Entypo name="dots-three-vertical" size={20} color="color.FONT_MEDIUM" />
            </View>
            
        </View>
        <View style={styles.separator} />
        </>
    )
  }

const {width} = Dimensions.get('window')
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: width - 60,
      alignSelf : 'center',
      padding: 10,
      backgroundColor: color.APP_BG,
    //   borderBottomWidth: 1,
    //   borderBottomColor: color.FONT_LIGHT,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    thumbnail: {
      width: 50,
      height: 50,
      backgroundColor: color.PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      marginRight: 10,
    },
    thumbnailText: {
      fontSize: 24,
      color: color.FONT_LIGHT,
    },
    titleContainer: {
      flex: 1,
      width: width - 180,
    //   paddingLeft: 10
    },
    title: {
      fontSize: 16,
      color: color.FONT,
    },
    rightContainer: {
        flexBasis: 50,
      justifyContent: 'center',
      alignItems: 'center',
    height: 50,
    },
    separator:{
        width: width - 80,
        backgroundColor: '#333',
        opacity: 0.3,
        height: 0.5,
        alignSelf: 'center',
        marginTop: 10,

    },
    timeText:{
      fontSize: 14,
      color: color.FONT_LIGHT,
    }
  });
  

export default  AudioListItem