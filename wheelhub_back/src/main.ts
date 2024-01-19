import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "../db/data-source";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.APP_PORT;
const PREFIX_URI = '/api/v2';

app.use(express.json());
app.use(cors({ origin: "*"}));

// define a route handler for the default home page
app.get( "/", ( req: any, res: any ) => {
    res.redirect(PREFIX_URI);
} );

app.use(PREFIX_URI, routes);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }${PREFIX_URI}` );
    AppDataSource.initialize()
        .then(() => console.log("Initialized DB"))
        .catch((error) => console.log(error))
} );