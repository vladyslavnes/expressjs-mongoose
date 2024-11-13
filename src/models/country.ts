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
  },
  location: {
    altitude: Number,
    altitudeAccuracy: Number,
    latitude: Number,
    accuracy: Number,
    longitude: Number,
    heading: { type: Number, default: null },
    speed: { type: Number, default: null }
  }
});

const CountryModel = model<ICountry>("Country", CountrySchema);

export { CountryModel, ICountry };
