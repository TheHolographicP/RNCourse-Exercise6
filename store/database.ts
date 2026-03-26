import * as SQLLite from 'expo-sqlite';

import { Place } from 'model/place';

const db = SQLLite.openDatabaseSync('places.db');

export function init() {
    db.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT,
            imageUri TEXT,
            address TEXT,
            lat REAL,
            lng REAL
        )
    `)
}

export async function upsertPlace(place: Place) {
    if (place.id) {
        const result = await db.runAsync(`
            UPDATE places SET title = ?, imageUri = ?, address = ?, lat = ?, lng = ? WHERE id = ?
        `, [place.title, place.imageUri, place.address, place.location.lat, place.location.lng, place.id])
        if (result.changes === 0) {
            throw new Error('Place not found');
        } else {
            return;
        }
    } else {
        const result = await db.runAsync(`
            INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)
        `, [place.title, place.imageUri, place.address, place.location.lat, place.location.lng])
        if (result.changes === 0) {
            throw new Error('Failed to insert place');
        } else {
            const id = result.lastInsertRowId;
            place.id = id.toString();
            return place;
        }
    }
}

export async function deletePlace(placeId: string) {
    const result = await db.runAsync(`
        DELETE FROM places WHERE id = ?
    `, [placeId])
    if (result.changes === 0) {
        throw new Error('Place not found');
    } else {
        return;
    }
}

export async function fetchPlaces() {
    const result = await db.getAllAsync<{ id: number; title: string; imageUri: string; address: string; lat: number; lng: number }>(`SELECT * FROM places`);
    const places = [];
    for (const row of result) {
        const place = new Place(row.title, row.imageUri, row.address, { lat: row.lat, lng: row.lng });
        place.id = row.id.toString();
        places.push(place);
    }
    return places;
}

export async function fetchPlaceById(placeId: string) {
    const result = await db.getAllAsync<{ id: number; title: string; imageUri: string; address: string; lat: number; lng: number }>(`SELECT * FROM places WHERE id = ?`, [placeId]);
    if (result.length > 0) {
        const row = result[0];
        const place = new Place(row.title, row.imageUri, row.address, { lat: row.lat, lng: row.lng });
        place.id = row.id.toString();
        return place;
    } else {
        throw new Error('Place not found');
    }
}