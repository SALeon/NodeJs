import City from '../models/city';

class CitiesController {
    async getRandomCity() {
        const cities = await City.find();
        const cityNum = Math.floor(Math.random() * cities.length);
        return cities[cityNum];
    }
    getCities() {
        return City.find();
     }

     getCityById(id) {
         return City.findById(id);
     }

     setCity(cityData) {
         return new City({ ...cityData }).save();
     }

     updateCityById(id, updatedData) {
         return City.findByIdAndUpdate(id, updatedData, { upsert: true});
    }

    deleteCityById(id) {
        return City.findByIdAndDelete(id);
    }
}

export default CitiesController;
