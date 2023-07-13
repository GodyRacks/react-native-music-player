import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'

export class AudioList extends Component {
   
      static contextType = AudioContext
      layoutProvider = new LayoutProvider((i)=> 'audio', (type, dim)=>{
       switch(type){
        case 'audio' :
            dim.width = Dimensions.get('window').width;
            dim.height = 70;
            break;
            default:
            dim.width =0;
            dim.height = 0;
       }
            
      })
      rowRenderer = (type, item) =>{
        console.log(item)
        return <Text>{item.filename}</Text>
      }
   
  render() {
   return (<AudioContext.Consumer>
            {({dataProvider})=>{
                  return (
                    <View style={{flex: 1}}>
                      <RecyclerListView
                        dataProvider={dataProvider}
                        layoutProvider={this.layoutProvider}
                        rowRenderer={this.rowRenderer}
                      />
                    </View>
                  );
                  ;
            }}
   </AudioContext.Consumer>);
  } 
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    audioCard: {
      padding: 10,
      borderWidth: 1, // Specify the border width
      borderColor: '#383CC1', // Specify the border color
    },
  });
  

export default AudioList