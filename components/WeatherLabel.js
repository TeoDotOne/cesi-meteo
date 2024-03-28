import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function WeatherLabel({ label }) {

    if (!label) return null;

    return (
        <View>
            <Text style={s.text}>{label}</Text>
        </View>
    );
}

const s = StyleSheet.create({
    text: {
        transform: [{ rotate: '-90deg' }],
        color: 'white',
    }
}); 