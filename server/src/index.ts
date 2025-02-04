import express, {Request, Response} from "express";
import http from "http";
import cors from "cors";

const port = 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});