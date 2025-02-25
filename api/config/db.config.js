const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => console.info(`Connection to database is ALL GOOD ${MONGO_URI}`))
.catch((error) => {
    console.error(`An error occurred trying to connect to the database ${MONGODB_URI}`, error);
    process.exit(0);
});
