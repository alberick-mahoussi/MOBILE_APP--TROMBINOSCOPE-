import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const predefinedWebViews = [
  { id: 1, url: 'https://www.google.com', image: require('./../assets/google_icon.png') },
  { id: 2, url: 'https://www.facebook.com', image: require('./../assets/facebook_icon.png') },
  { id: 3, url: 'https://www.twitter.com', image: require('./../assets/twiter_icon.png') },
  { id: 4, url: 'https://www.instagram.com', image: require('./../assets/instagram_icon.png') },
  { id: 5, url: 'https://www.linkedin.com', image: require('./../assets/linkdin_icon.png') },
  { id: 6, url: 'https://www.youtube.com', image: require('./../assets/youtube_icon.png') },
  { id: 7, url: 'https://discord.com/login/tester-site-mobile.html', image: require('./../assets/discord_icon.png') },
];

const extractSiteName = (url) => {
    const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g;
    const match = regex.exec(url);
    if (match && match[1]) {
      return match[1];
    } else {
      return '';
    }
  };

const googleWebView = { id: 7, url: 'https://www.google.com', image: require('./../assets/calendar_icon.png') };

export default function CustomWebViews() {
  const [selectedUrl, setSelectedUrl] = useState('');
  const [webViews, setWebViews] = useState([]);
  const [addTextVisible, setAddTextVisible] = useState(false);
  const [newWebViewUrl, setNewWebViewUrl] = useState('');

  const openWebView = (url) => {
    setSelectedUrl(url);
  };

  const closeWebView = () => {
    setSelectedUrl('');
  };

  const addWebView = () => {
    if (newWebViewUrl.trim()) {
      const newWebViewImage = require('./../assets/favori_icon.png');
      setWebViews([...webViews, { id: Date.now(), url: newWebViewUrl, image: newWebViewImage }]);
      setNewWebViewUrl('');
    }
    setAddTextVisible(false);
  };

  const removeWebView = (id) => {
    const updatedWebViews = webViews.filter((webView) => webView.id !== id);
    setWebViews(updatedWebViews);
    closeWebView();
  };

  const allWebViews = [...predefinedWebViews, ...webViews];


  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < allWebViews.length; i += 2) {
      const button1 = allWebViews[i];
      const button2 = i + 1 < allWebViews.length ? allWebViews[i + 1] : null;
      buttons.push(
        <View key={i} style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => openWebView(button1.url)}
            >
              <Image
                source={button1.image}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <Text style={styles.siteName}>{extractSiteName(button1.url)}</Text>
          </View>
          {button2 && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => openWebView(button2.url)}
              >
                <Image
                  source={button2.image}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
              <Text style={styles.siteName}>{extractSiteName(button2.url)}</Text>
            </View>
          )}
        </View>
      );
    }
  
    return buttons;
  };  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>{renderButtons()}</ScrollView>

      {selectedUrl ? (
        <View style={styles.webViewContainer}>
          <WebView source={{ uri: selectedUrl }} />
          <View style={styles.closeButtonContainer}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeWebView(allWebViews.find((webView) => webView.url === selectedUrl)?.id)}
              >
                <Text style={styles.removeButtonText}>Supprimer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeWebView}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
              {selectedUrl === googleWebView.url && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setAddTextVisible(true)}
                >
                  <Text style={styles.addButtonText}>Ajouter</Text>
                </TouchableOpacity>
              )}
            </View>
            {addTextVisible && (
              <View>
                <TextInput
                  placeholder="Entrez une URL"
                  onChangeText={(text) => setNewWebViewUrl(text)}
                  value={newWebViewUrl}
                  style={styles.textInput}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addWebView}
                >
                  <Text style={styles.addButtonText}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  background: {
    height: ScreenHeight,
    width: ScreenWidth,
  },
  scrollView: {
    width: '100%',
    marginBottom: '10%',
    top: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B79ECF',
    borderRadius: 25,
  },
  closeButton: {
    backgroundColor: '#A0ADDD',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#E37B7B',
    padding: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#86AEA2',
    padding: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  textInput: {
    backgroundColor: 'white',
    width: '80%',
    padding: 8,
    marginTop: 16,
    borderRadius: 8,
  },
  webViewContainer: {
    position: 'absolute',
    top: 35,
    width: 420,
    height: 738,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  closeButtonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  siteName: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
