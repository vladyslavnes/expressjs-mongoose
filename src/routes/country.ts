import { Router } from "express";
import { CountryModel, ICountry } from "../models/country";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const countries: ICountry[] = await CountryModel.find().exec();
    return res.json(countries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.post("/", async (req, res) => {
  try {
    const locationData = req.body;
    
    // Generate a name from coordinates
    const name = `Location_${locationData.latitude.toFixed(4)}_${locationData.longitude.toFixed(4)}, ${Math.random().toString(36).substring(2, 15)}`;
    
    // Create country object with location data
    const countryData = {
      name,
      location: {
        altitude: locationData.altitude,
        altitudeAccuracy: locationData.altitudeAccuracy,
        latitude: locationData.latitude,
        accuracy: locationData.accuracy,
        longitude: locationData.longitude,
        heading: locationData.heading,
        speed: locationData.speed
      }
    };

    console.log('Saving location data:', countryData);
    const newCountry = await CountryModel.create(countryData);
    return res.status(201).json(newCountry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.delete("/clear", async (req, res) => {
  try {
    await CountryModel.deleteMany({});
    return res.status(200).json({ message: "All items have been removed." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

export default routes;
