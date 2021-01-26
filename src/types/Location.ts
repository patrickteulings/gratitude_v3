interface ICoords {
  latitude: number;
  longitude: number;
}
export interface ILocation {
  coordinates: ICoords;
  city: string;
}
