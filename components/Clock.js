import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Clock() {


    const [time, setTime] = React.useState();
    React.useEffect(() => {

        function getTime() {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            setTime(`${hours}:${minutes}`);
        }
        getTime();

        const interval = setInterval(() => {
            getTime();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });




    return (
        <View>
            <Text style={s.text}>{time}</Text>
        </View>
    );
}

const s = StyleSheet.create({

    text: {
        color: 'white',
        fontSize: 15,
    }

});