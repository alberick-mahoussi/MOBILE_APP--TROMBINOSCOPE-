import React from'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default function News() {
     
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://www.thetimes.co.uk/' }}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });