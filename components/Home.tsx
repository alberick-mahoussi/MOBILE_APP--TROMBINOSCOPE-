import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Weather from './Weather'
import SwiperFlatList from 'react-native-swiper-flatlist';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

type Employee = {
  id: number,
  email: string,
  name: string,
  surname: string,
  birth_date: string,
  gender: string,
  work: string,
  subordinates: number[],
  photo: string,
};

export default function HomeScreen({accessToken}) {
  const navigation = useNavigation();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const nbOfProfil = 74;
  
  const profil = (item: Employee) => {
    navigation.navigate('ResearchProfil', { employeeItem: item });
  };

  useEffect(() => {
        const employeeDatas: Employee[] = [];

        for (let i = 1; i <= nbOfProfil; i++) {
          fetch(`https://masurao.fr/api/employees/${i}`, {
            method: "get",
            headers: {
              Accept: "application/json",
              "X-Group-Authorization": process.env.API_KEY,
              Authorization: `Bearer ${accessToken}`
            }
          }).then(response => response.json())
          .then(data => {
            fetch(`https://masurao.fr/api/employees/${i}/image`, {
              method: "get",
              headers: {
                Accept: "image/png",
                "X-Group-Authorization": process.env.API_KEY,
                Authorization: `Bearer ${accessToken}`
              }
            })
            .then(imageResponse => imageResponse.blob())
            .then(blob => {
              const reader = new FileReader();
              return new Promise<string>((resolve) => {
                reader.onload = () => {
                  const base64String = reader.result as string;
                  const base64Image = base64String.match(/base64,(.*)$/)?.[1] || '';
                  data.photo = base64Image;
                  resolve(base64Image);
                };
                reader.readAsDataURL(blob);
              });
            })
            .then(() => {
              employeeDatas.push(data);
              if (employeeDatas.length === nbOfProfil) {
                setEmployees(employeeDatas);
              }
            });
          });
        }
  }, []);


    const renderItem = ({ item }: { item: Employee }) => (
      <TouchableOpacity onPress={() => profil(item)} style={{flex:1, width: "100%"}}>
        <View style={styles.employeeItem}>
          <Image style={styles.employeeImage} source={{ uri: `data:image/png;base64,${item.photo}` }} />
          <View style={styles.employeeInfo}>
            <Text style={[styles.employeeName]}>{item.name}</Text>
            <Text style={[styles.employeeName]}>{item.surname}</Text>
            <Text style={[styles.employeePost]}></Text>
            <Text style={[styles.employeePost]}>{item.work}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <Weather/>
        <View style={[styles.container, {zIndex: 2}]}>
          <Image source={require('./../assets/logo.png')} style={[styles.logo, {top: 25, left: 25}]}></Image>
        </View>
        <Image source={require('./../assets/backgroundTrombi.png')} style={styles.background}></Image>
        <View style={styles.trombiContainer}>
          <SwiperFlatList
          index={0}
          data={employees}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        </View>
      </View>
    );
}

  const styles = StyleSheet.create({
    container: {flex: 1},
    background: {
      height: ScreenHeight,
      width: ScreenWidth
    },
    trombiContainer: {
      width: "100%",
      top: -ScreenHeight/1.25,
      borderColor: 'red',
      height: 620,
    },
    employeeItem: {
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
    },
    employeeImage: {
      width: ScreenWidth * 0.8,
      height: 350,
      borderRadius: 60,
      margin: ScreenWidth * 0.1
    },
    employeeInfo: {
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
    },
    employeeName: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    employeePost: {
      fontSize: 15,
      fontWeight: 'bold',
  },
    iconContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    buttonImageAgenda: {
      height: 40,
      width: 40,
      marginLeft: 10,
    },
    buttonImageMessage: {
      height: 40,
      width: 40,
    },
    buttonImageMenu: {
      height: 30,
      width: 30,
    },
    buttonImagePosition: {
      height: 40,
      width: 40,
      marginLeft: 10,
    },
    logo: {
      height: 80,
      width: 80,
    },
  });
