import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

export class Coordinates {

    static async getUserCoords() {
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        const location = await getCurrentPositionAsync();
        return {
            lat: location.coords.latitude,
            lng: location.coords.longitude
        }
    }

}