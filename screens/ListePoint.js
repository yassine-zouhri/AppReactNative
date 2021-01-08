import React, { Component } from 'react';
import { FlatList, ActivityIndicator,TouchableOpacity,TouchableHighlight,Container, Content, Form, Item,Label, TextInput, View, Text, Button, StyleSheet,Alert ,SafeAreaView,Platform, PermissionsAndroid} from 'react-native';

//import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/app'
//import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { UrlTile,PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from "react-native-geolocation-service";
import{ Marker } from "react-native-maps";
import PointItem from './ItemPoint'
//import Icon from 'react-native-ionicons'

import Icon from 'react-native-vector-icons/FontAwesome';

class ListePoint extends Component{


    state={}
    constructor(props){
        super(props)
        this._loadUsers()
        
       this.subscriber = firestore().collection("PointsCord").onSnapshot(data1 =>{
            const MyList=[]
            data1.forEach(documentData => {
              if(documentData.data().date){MyList.push(documentData)}

              console.log('User ID: ', documentData.id, documentData.data().date);
            });
            this.setState({
              MyListPoint: MyList,
            })
          
            
            console.log(this.state)
        })
        this.state = {
          MyListPoint: [],
          isLoading: true
        }
    }

    
  GetPointByFilter(ValueFilter){
    console.log(ValueFilter)
    const MyList1=[]
    if(ValueFilter!=null){
      firestore().collection('PointsCord').where('type', '==',ValueFilter)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(data =>{
          console.log(data)
          if(data.data().date){ MyList1.push(data)}
        })
        console.log(querySnapshot)
        this.setState({
          MyListPoint: MyList1,
        })
      });
    }
    
  } 
  
  DeleteFilter(){
    const MyList1=[]
    firestore().collection('PointsCord').get()
    .then(querySnapshot => {
      querySnapshot.forEach(data =>{
        console.log(data)
        if(data.data().date){ MyList1.push(data)}
      })
      console.log(querySnapshot)
      this.setState({
        MyListPoint: MyList1,
      })
    });
  }
 
      
  

    
 
    _loadUsers=async () =>{
      //const userDocument=await firestore().collection("PointsCord").doc("iohpEs0vi3mMrPkRBH32").get()
      const MyList=[]
      const userDocument=await firestore().collection("PointsCord").get().then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        
        querySnapshot.forEach(documentSnapshot => {
          MyList.push(documentSnapshot)
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
        this.setState({
          MyListPoint: MyList,
          isLoading: false
        })
      });

      
  } 

  _displayDetailForPoint = (myPoint) => {
    //console.log("Display film with id " + myPoint.id)
    this.props.navigation.navigate('PointDetail',{ myPoint:myPoint })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color="#0000ff"/>
        </View>
      )
    }
  }

  test(){
    console.log("fffffffffffff88888888ffff")
  }


    render(){
     
        return(
            <View style={styles.container}>
              <View style={{ flex: 1, flexDirection: 'row', height:100}}>
                
                <View style={{ flex: 6, height:70 }}>
                  <DropDownPicker
                      items={[
                          {label: 'Type1', value: 'type1', hidden: true},
                          {label: 'Type2', value: 'type2'},
                          {label: 'Type3', value: 'type3'},
                      ]}
                      defaultValue={this.state.country}
                      containerStyle={{height: 50,margin: 10}}
                      style={{backgroundColor: '#fafafa',borderColor: '#CF5731',borderWidth: 3}}
                      itemStyle={{
                          justifyContent: 'flex-start'
                      }}
                      placeholder="Choisir un type"
                      //dropDownStyle={{backgroundColor: '#CF5731'}}
                      onChangeItem={item => {this.setState({selectedType: item.value}),this.GetPointByFilter(item.value)}}
                  />
                </View>
                <View style={{ flex: 2,height:70,flexDirection: 'row', }}>
                  <View style={{ flex: 1,height:70,backgroundColor:'#E9DCC3' }}> 
                    <TouchableOpacity style={{height:70}} onPress={() => this.GetPointByFilter(this.state.selectedType)}>
                      <View  style={{height:70,marginTop:15,marginLeft:10}}>
                      <Icon  name="filter" size={30} color="#900" >
                        
                      </Icon>
                      </View>
                      
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1,height:70,backgroundColor:'#F2C167'}}> 
                    <TouchableOpacity style={{height:70}} onPress={() => this.DeleteFilter()}>
                      <View  style={{height:70,marginTop:15,marginLeft:10}}>
                        <Icon  name="close" size={30} color="#900" >
                        
                      </Icon>
                      </View>
                      
                    </TouchableOpacity>
                  </View>
                  

                  
                </View>
              </View>
              <FlatList style={{marginTop:-150}}
                data={this.state.MyListPoint}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <PointItem MYpoint={item} displayDetailForPoint={this._displayDetailForPoint}/>}
                //onEndReachedThreshold={1}
                /*onEndReached={() => {
                    if (this.page < this.totalPages) {
                      console.log("baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa9i")
                      this._loadFilms()
                    }
                }}*/
              />
               
                {this._displayLoading()}            
            </View>
            
        )
    }
}


export default ListePoint;

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
});

/*
<Button  onPress={() => this.test()}
                    icon={{
                      name: "filter",
                      size: 15,
                      color: "white"
                    }}
                    iconRight
                    title="Filter"
                  />*/