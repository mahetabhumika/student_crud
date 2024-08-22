const express = require('express');
const mongoose = require("mongoose");
const routes = require('./routes/routes');
const serviceAccount = require('./middleware/firebase_config.json');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "customer-relationship-ce3d2.appspot.com"
});


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect("mongodb://localhost:27017/student", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
