const mongoose = require("mongoose");

//connexion à la bdd mongo
mongoose.connect(`mongodb://localhost:27017/racing_maze`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Successfully connected to DB "Racing Maze"`);
}).catch(() => {
    console.log(`Connection to DB "Racing Maze" not successful`);
});

module.exports = mongoose;