const express = require('express');
const cors = require('cors');
const app = express();

const mongoDBConnection = require('./api/utils/mongodb_connection');
const index_routes = require("./api/routes/index_routes");
const users_routes = require("./api/routes/users_routes");
const parties_routes = require("./api/routes/parties_routes");
app.use(cors());

app.set('port',3001);

//API Racing Maze
app.use(express.json());
app.use('/',index_routes);
app.use('/users',users_routes);
app.use('/parties',parties_routes);

app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`)
});
