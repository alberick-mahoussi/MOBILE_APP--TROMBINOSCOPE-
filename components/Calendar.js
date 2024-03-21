import React from'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Message() {
     

    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://calendar.google.com/calendar/u/0/r/week?pli=1' }}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });