import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    name: String,
    country: {
        type: String,
        minlength: 2,
    },
    capital: Boolean,
    location: {
        lat: {
            type: Number,
            min: -90,
            max: 90,
        },
        long: {
            type: Number,
            min: -180,
            max: 180,
        }
    }
});

const City = mongoose.model('City', citySchema);

export default City;
