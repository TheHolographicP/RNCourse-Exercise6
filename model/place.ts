

export type Location = {
    lat: number;
    lng: number;
}

export class Place {
    constructor(title: string, imageUri: string, address: string, location: Location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location;
    }
    id: string | undefined;
    title: string;
    imageUri: string;
    address: string;
    location: Location;
}