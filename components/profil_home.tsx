import React, { useState, useEffect} from'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image , Dimensions, FlatList, Modal, TouchableOpacity} from 'react-native';
import { EmitFlags } from 'typescript';
import axios from 'axios';

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

export default function homeProfil({accessToken}) {
  const [employee, setEmployee] = useState<Employee>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openPhotoModal = (photoUrl) => {
    setSelectedPhoto(photoUrl);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

    useEffect(() => {
      const randomNumberOfCalls = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
      const fetchPhotos = async () => {
        const photoPromises = [];
  
        for (let i = 0; i < randomNumberOfCalls; i++) {
          photoPromises.push(axios.get('https://picsum.photos/200'));
        }
  
        try {
          const responses = await Promise.all(photoPromises);
          const photoUrls = responses.map((response) => response.request.responseURL);
          setPhotos(photoUrls);
        } catch (error) {
          console.error('Erreur lors de la récupération des photos :', error);
        }
      };
  
          fetch(`https://masurao.fr/api/employees/me`, {
            method: "get",
            headers: {
              Accept: "application/json",
              "X-Group-Authorization": process.env.API_KEY,
              Authorization: `Bearer ${accessToken}`
            }
          }).then(response => {
            if (!response.ok) {
              throw new Error(`Fetch failed with status ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            fetch(`https://masurao.fr/api/employees/${data.id}/image`, {
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
              setEmployee(data);
              setIsLoading(false);
            });
          });
          fetchPhotos();
        }, [])
    return (
      <View style={styles.container}>
        <Image source={require('./../assets/backgroundTrombi.png')} style={styles.background}></Image>
        {isLoading ? (
          <Text></Text>
        ) : (
          <View style={styles.centeredView}>
            <View style={styles.employeeItem}>
              <Image style={styles.employeeImage} source={{ uri: `data:image/png;base64,${employee.photo}` }} />
              <View>
                <Text style={[styles.employeeName]}>{employee.name + " " + employee.surname + "\t\t" + employee.birth_date}</Text>
                <Text style={[styles.employeeName]}>{employee.email}</Text>
                <Text style={[styles.employeeName]}>{employee.work}</Text>
              </View>
                <View style={{flex: 1, width:"100%"}}>
                <FlatList
                  data={photos}
                  numColumns={3}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openPhotoModal(item)} activeOpacity={1}>
                      <Image style={styles.photo} source={{ uri: item }} />
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                />
                </View>
            </View>
          </View>
        )}
          <Modal visible={!!selectedPhoto} transparent={true} onRequestClose={closePhotoModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closePhotoModal}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
            <Image style={styles.fullScreenImage} source={{ uri: selectedPhoto }} resizeMode="contain"/>
          </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  background: {
    height: ScreenHeight,
    width: ScreenWidth
  }, 
  centeredView: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    marginTop: "10%"
  },
  employeeItem: {
    alignItems:'center',
  },
  employeeImage: {
    width: 200,
    height: 200,
    borderRadius: 70,
  },
  employeeName: {
    fontSize: 18,
    alignContent: 'center',
    marginVertical: 10,
    textAlign: 'center',
},  photo: {
  width: 120,
  height: 120,
  margin: 5,
 },
modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' },
closeButton: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
closeButtonText: { color: 'white', fontSize: 18 },
fullScreenImage: { width: '50%', height: '50%' },
});
