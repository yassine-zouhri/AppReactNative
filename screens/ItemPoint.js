// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image,TouchableOpacity } from 'react-native'


class PointItem extends React.Component {
  render() {
    console.log(this.props)
    const { MYpoint, displayDetailForPoint} = this.props
    return (

      
      <TouchableOpacity
      style={styles.main_container}
      onPress={() => displayDetailForPoint(MYpoint)}>
        
        <View style={styles.content_container}>

            <Text style={styles.MonText} >Nom :{MYpoint._data.nom}</Text>

            <Text style={styles.MonText}>Déclaré le :  {MYpoint._data.date}</Text>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 100,
    flexDirection: 'row'
  },
  content_container: {
    flex: 1,
    margin: 5,
    borderColor: '#F19F07',
    borderWidth: 3,
    padding: 5,
  },
  MonText:{
    fontSize: 20,
    fontWeight: "bold"
  }
})

export default PointItem