import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Github() {

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://github.com/login' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});