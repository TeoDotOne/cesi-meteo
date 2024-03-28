export class GeoCodingAPI {

    static async getCityFromCoords(coords) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`;
        const res = await fetch(url);
        const data = await res.json();
        const { city, town, village } = data.address;
        return city || town || village || 'Unknown';
    }
}