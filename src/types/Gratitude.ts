import { IUser } from '@/types/UserType'
import { IMood } from './Mood'
import { IWeather } from './Weather'

export interface IGratitude {
  body: string;
  color?: string;
  mood?: IMood | null;
  timeStamp: object | any;
  dayStamp: object | any;
  title: string;
  weather: IWeather;
  location: object;
  user?: IUser;
}

export interface IGratitudeWrapper {
  id: string;
  data: IGratitude;
}

interface ILongname {
  long_name: string;
}

export interface IAddresscomponents {
  address_components: Array<ILongname>;
  types: Array<string>;
}


export interface IResponse {
  plus_code?: any | null;
  results: Array<IAddresscomponents> | null;
  status: string | null;
}
