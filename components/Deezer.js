import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Deezer() {

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://connect.deezer.com/login.php' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});