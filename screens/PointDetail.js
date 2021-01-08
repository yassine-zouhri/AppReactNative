
import React, { Component }  from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView} from 'react-native'
import MapView, { UrlTile,PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import{ Marker } from "react-native-maps";
//import moment from 'moment'
//import numeral from 'numeral'

class PointDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Point: null,
      isLoading: true
    }
    this._displayLoading()
  }

  componentDidMount() {
    //console.log(this.props.route.params.myPoint._data)
    this.setState({
      Point:this.props.route.params.myPoint._data,
      isLoading: false
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color="#0000ff" />
        </View>
      )
    }
  }

  _displayPoint() {
    const Point1 = this.state.Point
    console.log(this.state.Point)
    if (Point1 != undefined) {
      
      return (
        <ScrollView style={styles.scrollview_container}>
          <Text style={styles.default_text}>Nom : {Point1.nom}</Text>
          <Text style={styles.default_text}>Type : {Point1.type}</Text>
          <Text style={styles.default_text}>Sorti le {Point1.date}</Text>
          <Text style={styles.default_text}>Description : {Point1.description} </Text>
          <View style={{width:'100%',height:500,marginBottom:10}}>
          { this.state.Point.latitude && 
          <MapView
                    provider={PROVIDER_GOOGLE}
                  
                    style={{flex: 1}}
                    region={{
                      latitude: this.state.Point.latitude,
                      longitude: this.state.Point.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}>
                    
                     <Marker 
                        coordinate={{
                          latitude: this.state.Point.latitude,
                          longitude: this.state.Point.longitude,
                        }}>
                    </Marker>
                    
                </MapView>}
                </View>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayPoint()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    fontSize: 20,
  }
})

export default PointDetail