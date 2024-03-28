import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Temperature({ weather }) {

    if (!weather) return null;

    weather = Math.round(weather);

    return (
        <View>
            <Text style={s.text}>{weather}°</Text>
        </View>
    );
}

const s = StyleSheet.create({

    text: {
        color: 'white',
        fontSize: 150,
    }

});