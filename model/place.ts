

export type Location = {
    lat: number;
    lng: number;
}

export class Place {
    constructor(title: string, imageUri: string, address: string, location: Location) {
        this.id = new Date().toString() + Math.random().toString();
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location;
    }
    id: string;
    title: string;
    imageUri: string;
    address: string;
    location: Location;
}