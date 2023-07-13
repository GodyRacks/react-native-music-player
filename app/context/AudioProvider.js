import { Text, View, Alert, StyleSheet } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext();
export class AudioProvider extends Component {
  



    constructor(props){
        super(props);
        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider : new DataProvider((r1, r2) => r1 !== r2)
        }
    }
    permissionAlert = ()=>{
        Alert.alert("Permission Required!", "This app needs to access audio files",
                    [{
                        text: "Allow",
                        onPress: () => this.getPermission()
                    },
                {
                    text: "Cancel",
                    onPress: () => this.permissionAlert()
                }])
    }

    getAudioFiles = async () =>{
        const { dataProvider, audioFiles} = this.state
        let media =    await  MediaLibrary.getAssetsAsync({
            mediaType: "audio"
           });
            media =    await  MediaLibrary.getAssetsAsync({
            mediaType: "audio",
            first: media.totalCount
           });
        this.setState({...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets])
            , audioFiles: [...audioFiles, ...media.assets] })
    }


        getPermission = async () =>{
                            // {"canAskAgain": true, 
                    // "expires": "never", 
                    // "granted": false, 
                    // "status": "undetermined"
                    //     }
            const permission = await MediaLibrary.getPermissionsAsync()
           if(permission.granted){
            //get audio files
            this.getAudioFiles ();
           }
           if(!permission.canAskAgain && !permission.granted){
            this.setState({...this.state, permissionError: true})
           }
           if(!permission.granted && permission.canAskAgain){
           const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
                if(status== 'denied' && canAskAgain){
                            //display alert that user must allow this permission to work this app
                        this.permissionAlert()
                }
            if(status === 'granted'){
                    //access all audio files
                    this.getAudioFiles ();
            }
            if(status === 'denied' && !canAskAgain){
                //display some error to the user
                this.setState({...this.state, permissionError: true})
        }

           }
        }

    componentDidMount(){
        this.getPermission();
    }
  render() {
    const {audioFiles, dataProvider, permissionError} = this.state
    if(permissionError) return (<View style={styles.errorCard}>
        <Text style={styles.textWarning}>It seems that you've not accepted the permission</Text>
    </View>);
    return (
     <AudioContext.Provider value={{audioFiles, dataProvider}}>
        {this.props.children}
     </AudioContext.Provider>
    )
  }
}


const styles = StyleSheet.create({
    errorCard: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
    },
    textWarning:{
            fontSize: 25,
            textAlign: 'center',
            color: '#B4161B',
    },

})

export default AudioProvider
