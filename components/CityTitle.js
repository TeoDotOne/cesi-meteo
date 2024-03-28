import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function CityTitle({ city }) {

    if (!city) return null;

    return (
        <View>
            <Text style={s.text}>{city}</Text>
        </View>
    );
}

const s = StyleSheet.create({

    text: {
        color: 'white',
        fontSize: 30,
    }

});