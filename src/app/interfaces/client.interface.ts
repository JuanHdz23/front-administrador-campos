export interface Client {
    id: string;
    client: string;
    name: string;
    location: string;
    coords: Coords[];
    create_date: Date;
}

export interface Coords {
    lat: number;
    lng: number;
}