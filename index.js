const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const cors = require("cors");
const sequelize = require('./models/sequelize');
const categoryRouter = require("./routes/Categories/Categories");
sequelize.sync();

const config = {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET,POST","PUT"]
    }
}

app.use(cors(config));

//we use build in express body parser middleware
app.use(express.json());
app.use(express.urlencoded());


app.use("/api/categories",categoryRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));