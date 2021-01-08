import React, { Component } from 'react';
import {Container, Content, Form, Item,Label, TextInput, View, Text, Button, StyleSheet,Alert ,SafeAreaView,Platform, PermissionsAndroid} from 'react-native';

//import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/app'
//import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { UrlTile,PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from "react-native-geolocation-service";
import{ Marker } from "react-native-maps";



class AddPoints extends Component{

    userID=null;

    state={user:{data:[]},
    NomPoint:null,
    DescriptionPoint:null,
    selectedLocationMode:null,
    inputlongitude:null,
    inputlatitude:null,
    showTheMap:false,
    showTheMapGPS:false,
    showTheMapPointerMarker:false,
    showInputCoord:false,
    latitude: 0,
    longitude: 0,
    latitudePointeMap:0,
    longitudePointeMap:0,
    coordinates: [],
    selectedType:"null"}
    constructor(props){
        super(props)
        this.getInfoPoint()
        this.requestPermissions
        this.getlocationReal()
        this.subscriber = firestore().collection("PointsCord").doc("iohpEs0vi3mMrPkRBH32").onSnapshot(doc =>{
            this.setState({
                user:{
                    data:doc._data
                }
            })
            console.log(this.state)
        })
    }
    requestPermissions=async () => {
      console.log('askkkkkkkkkkkkkk         GPS')
        if (Platform.OS === 'ios') {
          Geolocation.requestAuthorization();
          Geolocation.setRNConfiguration({
            skipPermissionRequests: false,
           authorizationLevel: 'whenInUse',
         });
        }
      
        if (Platform.OS === 'android') {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            
          
          );
        }
      }
      
      getlocationReal(){
        Geolocation.getCurrentPosition(
          position => {
            console.log(position)
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              coordinates: this.state.coordinates.concat({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })
            });
          },
          error => {
            Alert.alert(error.message.toString());
          },
          {
            showLocationDialog: true,
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
          }
        )
      }
      
    getInfoPoint=async () =>{
        //const userDocument=await firestore().collection("PointsCord").doc("iohpEs0vi3mMrPkRBH32").get()
        const userDocument=await firestore().collection("PointsCord").get()
        console.log("yassssssssssssssssssssssss")
        console.log(userDocument)
        
    }
    AddPoint(){
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
        if(this.state.showTheMapGPS){
            firestore().collection("PointsCord").add({
                IdUser:this.userID,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                nom:  this.state.NomPoint,
                type: this.state.selectedType, 
                date: year+"/"+month+"/"+date+"     "+hours+":"+min+":"+sec,
                description:this.state.DescriptionPoint,
            })
            .then(() => {
                Alert.alert('Point added!')
            });
        }
        else if(this.state.showTheMapPointerMarker){
            firestore().collection("PointsCord").add({
                IdUser:this.userID,
                latitude: this.state.latitudePointeMap,
                longitude: this.state.longitudePointeMap,
                nom:  this.state.NomPoint,
                type: this.state.selectedType,
                date: year+"/"+month+"/"+date+"     "+hours+":"+min+":"+sec,
                description:this.state.DescriptionPoint,
            })
            .then(() => {
                Alert.alert('Point added!')
            });
        }
        else if(this.state.showInputCoord){
            firestore().collection("PointsCord").add({
                IdUser:this.userID,
                latitude: this.state.inputlatitude,
                longitude: this.state.inputlongitude,
                nom:  this.state.NomPoint,
                type: this.state.selectedType,
                date: year+"/"+month+"/"+date+"     "+hours+":"+min+":"+sec,
                description:this.state.DescriptionPoint,
            })
            .then(() => {
                Alert.alert('Point added!')
            });
        }      
    }

    render(){
        const user = firebase.auth().currentUser;
        if (user) {this.userID=user._user.uid  }
        return(
            <View style={styles.container}>
                <TextInput placeholder="entrer un nom"
                    maxLength={20} style={styles.container00} onChangeText={(text) => this.setState({NomPoint: text})}
                 />
                <TextInput placeholder="Description"
                    maxLength={20} style={styles.container00} onChangeText={(text) => this.setState({DescriptionPoint: text})}
                 />   
                <DropDownPicker
                    items={[
                        {label: 'Type1', value: 'type1', hidden: true},
                        {label: 'Type2', value: 'type2'},
                        {label: 'Type3', value: 'type3'},
                    ]}
                    defaultValue={this.state.country}
                    containerStyle={{height: 50,marginVertical: 5}}
                    style={{backgroundColor: '#fafafa',borderColor: '#0000FF',borderWidth: 3}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    placeholder="Choisir un type"
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => {this.setState({selectedType: item.value}),console.log(this.state.selectedType)}}
                />
                <DropDownPicker
                    items={[
                        {label: 'GPS', value: 'gps', hidden: true},
                        {label: 'Saisir des coordonnées', value: 'saisir_coord'},
                        {label: 'Pointer sur la carte', value: 'pointer_carte'},
                    ]}
                    defaultValue={this.state.country}
                    containerStyle={{height: 50,marginVertical: 5}}
                    style={{backgroundColor: '#fafafa',borderColor: '#0000FF',borderWidth: 3}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    placeholder="Mode de localisation"
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                   
                    onChangeItem={item => {if(item.value=="gps"){this.setState({showTheMapGPS:true,showTheMapPointerMarker:false,showTheMap:true,showInputCoord:false})}
                                            else if( item.value=="pointer_carte"){this.setState({showTheMapPointerMarker:true,showTheMapGPS:false,showTheMap:true,showInputCoord:false})}
                                            else{this.setState({showTheMap:false,showInputCoord:true})}
                        console.log(item.value),this.setState({selectedLocationMode: item.value})}}
                />

                { this.state.showTheMap && 
                <View style={{width:'100%',height:320}}>
<MapView onPress={e =>{this.setState({ latitudePointeMap:e.nativeEvent.coordinate.latitude,longitudePointeMap:e.nativeEvent.coordinate.longitude}),console.log(e.nativeEvent.coordinate)}}
                    provider={PROVIDER_GOOGLE}
                  
                    style={{flex: 1}}
                    region={{
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}>
                    { this.state.showTheMapGPS &&
                     <Marker 
                        coordinate={{
                          latitude: this.state.latitude,
                          longitude: this.state.longitude,
                        }}>
                    </Marker> }
                    { this.state.showTheMapPointerMarker &&
                     <Marker 
                        coordinate={{
                          latitude: this.state.latitudePointeMap,
                          longitude: this.state.longitudePointeMap,
                        }}>
                    </Marker> }
                    
                </MapView>
                </View>
                    
                }
                {this.state.showInputCoord && 
                    <TextInput placeholder="saisir longitude"
                    maxLength={20} style={styles.container00} onChangeText={(text) => this.setState({inputlongitude: text})}
                    />
                }
                {this.state.showInputCoord && 
                    <TextInput placeholder="saisir latitude"
                    maxLength={20} style={styles.container00} onChangeText={(text) => this.setState({inputlatitude: text})}
                    />
                }
                
                <View style={styles.validationButton}>
                    <Button style={styles.StyleButton}
                    title="Enregistrer"
                    onPress={() => {this.AddPoint()}}
                    />  
                </View>
                           
            </View>
            
        )
    }
}


export default AddPoints;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginVertical: 8,
    marginHorizontal: 20,
  },
  container00:{
    borderColor: '#0000FF',
    borderWidth: 3,
    height: 50,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 8,
    //margin:20,
  },
  SelectType:{
    borderColor: '#0000FF',
    borderWidth: 3,
    height: 50,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom:10
    //margin:20,
  },
  StyleButton:{
    flex: 2, 
    marginHorizontal: 16,
    marginVertical: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginHorizontal: 20,
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    width:'100%',
    height:'60%',
  },

  validationButton: {
    //marginVertical: 150,
    flex:2,
    width: '100%',
    position: 'absolute',
    bottom:0,
    left:0,
    justifyContent: 'center',textAlign: 'center',
    marginVertical: 20,
  },
});