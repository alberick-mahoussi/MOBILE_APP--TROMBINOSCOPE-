import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Outlook() {

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://outlook.office.com/' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});