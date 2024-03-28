import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import background from './assets/images/background.png';
import { s } from './App.styles';
import Home from './screens/Home';


export default function App() {
  return (
    <ImageBackground
      source={background}
      style={s.imgBackground}
      imageStyle={s.img}
    >
      <Home />
    </ImageBackground>
  );
}
