const mongoose = require('mongoose');
require('dotenv').config();

void mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export default mongoose.connection;
