import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, TextInput, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, MaterialCommunityIcons } from 'react-native-vector-icons'
import HomeScreen from './components/Home';
import axios from 'axios';
import Profil from './components/Profil';
import { API_KEY } from '@env'
import Widgets from './components/Widgets';
import HomeProfil from './components/profil_home';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

function Home_app() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Login')}>
      <View style={login_style_page.container}>
        <Image source={require('./assets/backgroundLoad.png')} style={{ height: ScreenHeight + 50, width: ScreenWidth }}></Image>
      </View>
      <Image source={require('./assets/logo.png')} style={[styles_log.logo, { top: -380 }]}></Image>
    </TouchableOpacity>
  );
}

function Login({ accessToken, setAccessToken }) {
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  run = false;
  const navigation = useNavigation();
  const handleLogin = async () => {
    if (Email && Password && !run) {
      run = true;
      console.log(Email, Password);
      const data = {
        email: Email,
        password: Password,
      };
      try {
        const response = await axios.post(
          'https://masurao.fr/api/employees/login',
          {
            email: Email,
            password: Password,
          },
          {
            headers: {
              'X-Group-Authorization': API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 200) {
          const accessTokenData = await response.data;
          await setAccessToken(accessTokenData.access_token);
          // console.log(accessTokenData.access_token);
          console.log('Connexion réussie');
          navigation.navigate('Tabs');
        } else {
          console.log('Connexion échouée');
        }
      } catch (error) {
        console.log(error);
        run = false;
      }
    } else {
      alert('Veuillez saisir votre adresse mail et votre mot de passe');
    }
  };
  return (
    <ScrollView contentContainerStyle={login_style_page.container}>
      <Image source={require('./assets/backgroundLogin.png')} style={{ height: ScreenHeight + 50, width: ScreenWidth }}></Image>
      <Image source={require('./assets/logo.png')} style={[styles_log.logo, { top: -680 }]}></Image>
      <View style={styles_log.inputContainer}>
        <TextInput
          style={styles_log.input}
          placeholder="Entrez votre Adresse mail"
          placeholderTextColor="grey"
          textAlign="center"
          value={Email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles_log.input}
          placeholder="Saisissez votre mot de passe"
          placeholderTextColor="grey"
          textAlign="center"
          value={Password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles_log.buttonContainer}>
        <TouchableOpacity onPress={handleLogin}>
          <Text>Connection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

function Tabs({ accessToken }) {
  return (
    <Tab.Navigator initialRouteName='Trombi'
      screenOptions={{ headerShown: false, tabBarActiveTintColor: '#9370db' }}
    ><Tab.Screen name="Message" component={Widgets} options={{
      title: 'Widgets', tabBarIcon: ({ size, color }) => (
        <MaterialCommunityIcons name="widgets" size={size} color={color} />)
    }}>
      </Tab.Screen>
      <Tab.Screen name="Trombi" options={{
        title: 'Home', tabBarIcon: ({ size, color }) => (
          <Feather name="home" size={size} color={color} />
        )
      }}>
        {() => <HomeScreen accessToken={accessToken} />}
      </Tab.Screen>

      <Tab.Screen name="Profil" options={{
        title: 'Profile', tabBarIcon: ({ size, color }) => (
          <Ionicons name="ios-person" size={size} color={color} />)
      }}>
         {() => <HomeProfil accessToken={accessToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}


export default function App() {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home_screen'>
        <Stack.Screen name="Home_screen" component={Home_app} options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <Login {...props} accessToken={accessToken} setAccessToken={setAccessToken} />}
        </Stack.Screen>
        <Stack.Screen name="Tabs" options={{ headerShown: false }}>
          {(props) => <Tabs {...props} accessToken={accessToken} />}
        </Stack.Screen>
        <Stack.Screen name="ResearchProfil">
          {(props) => <Profil {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const login_style_page = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

const styles_log = {
  inputContainer: {
    top: -600,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center', // Vertical centering
    alignItems: 'center', // Horizontal centering
  },
  input: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: 'grey', // Add a border color if needed
    color: 'black',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    top: -520,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#7f19e6',
    marginLeft: '20%',
    marginRight: '20%',
    paddingBottom: 18,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 180,
    height: 100,
  },
};
