import { StyleSheet, View, Text, Image } from "react-native";
import CityTitle from "../components/CityTitle";
import Temperature from "../components/Temperature";
import React from "react";
import WeatherLabel from "../components/WeatherLabel";
import Clock from "../components/Clock";
import { useState, useEffect } from "react";
import { MeteoAPI } from "../utils/Meteo";
import { Coordinates } from "../utils/Sensors";
import { GeoCodingAPI } from "../utils/GeoCoding";

export default function Home({ }) {

    const [coords, setCoords] = useState();
    useEffect(() => {

        async function getUserCoords() {
            const coordinatesResponse = await Coordinates.getUserCoords();
            setCoords(coordinatesResponse);
        }

        getUserCoords();
    }, []);

    const [city, setCity] = useState();
    useEffect(() => {

        async function getCity() {
            const cityResponse = await GeoCodingAPI.getCityFromCoords(coords);
            setCity(cityResponse);
        }

        getCity();
    }, [coords]);

    const [weather, setWeather] = useState();
    useEffect(() => {

        async function fetchWeather() {
            const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(coords);
            setWeather({
                j0: {
                    temperature: weatherResponse.current_weather.temperature,
                    windspeed: weatherResponse.current_weather.windspeed,
                    sunrise: weatherResponse.daily.sunrise[0].slice(-5),
                    sunset: weatherResponse.daily.sunset[0].slice(-5),
                    label: MeteoAPI.interpretWeather(weatherResponse.current_weather.weathercode).label,
                    image: MeteoAPI.interpretWeather(weatherResponse.current_weather.weathercode).image,
                }
            });
        }
        fetchWeather();
        const interval = setInterval(() => {
            fetchWeather();
        }, 1000 * 60 * 5);
        return () => {
            clearInterval(interval);
        }
    }, [coords]);

    return (
        <View style={s.mainContainer}>
            <View style={s.topContainer}>
                <View style={s.topSubContainer}>
                    <View style={s.leftSideContainer}>
                        <CityTitle city={city}></CityTitle>
                        <Temperature weather={weather?.j0.temperature} />
                    </View>
                    <View style={s.rightSideContainer}>
                        <View style={{ gap: 30 }}>
                            <Clock />
                            <WeatherLabel label={weather?.j0.label} />
                        </View>
                        <Image
                            source={weather?.j0.image}
                            style={{ width: 100, height: 100, }}
                        />
                    </View>
                </View>
            </View >
            <View style={s.bottomContainer}>
                <View style={s.bottomElement}>
                    <Text style={s.bottomTitle}>{weather?.j0.sunrise}</Text>
                    <Text style={s.bottomText}>Aube</Text>
                </View>
                <View style={s.bottomElement}>
                    <Text style={s.bottomTitle}>{weather?.j0.sunset}</Text>
                    <Text style={s.bottomText}>Crépuscule</Text>
                </View>
                <View style={s.bottomElement}>
                    <Text style={s.bottomTitle}>{weather?.j0.windspeed} km/h</Text>
                    <Text style={s.bottomText}>Vent</Text>
                </View>
            </View>
        </View >
    );
}

const s = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
        flexGrow: 4.25,
    },
    topSubContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    leftSideContainer: {
        paddingTop: 25,
        flex: 1,
        gap: 30,
        flexGrow: 2,
    },
    rightSideContainer: {
        flex: 1,
        alignItems: 'flex-end',
        gap: 60,
        flexGrow: 1,
    },
    bottomContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'white',
        flexGrow: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 15,
        flexDirection: 'row',

    },
    bottomElement: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTitle: {
        color: 'white',
        fontSize: 20,
    },
    bottomText: {
        color: 'white',
        fontSize: 12.5,
    }
});