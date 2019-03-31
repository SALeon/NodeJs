import mongoose from 'mongoose';
import config from '../config/mongoSettings'

let mongoDB;
try {
    const connectDB = async () => {
        const mongoDB = await mongoose.connect(
            `mongodb://localhost:${config.mongoPort}/${config.mongoDatabase}`,
            {
                useNewUrlParser: true
            }
        );

        console.log("Mongodb has been connected");
        return mongoDB;
    };

    mongoDB = connectDB();

} catch (err) {
    console.log('Error while trying to connect with mongodb');
}

export default mongoDB;
