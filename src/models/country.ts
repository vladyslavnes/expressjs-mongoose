import { model, Schema, Document } from "mongoose";

interface ICountry extends Document {
  name: string;
  location: {
    altitude: number;
    altitudeAccuracy: number;
    latitude: number;
    accuracy: number;
    longitude: number;
    heading: number | null;
    speed: number | null;
  };
}

const CountrySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  iso2code: {
    type: String,
  },
});

const CountryModel = model<ICountry>("Country", CountrySchema);

export { CountryModel, ICountry };
