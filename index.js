import express from "express";
import path from "path";
import { requestTime } from "./middlewares.js";
import serverRoutes from "./routes/server.js";

const PORT = 20202;
const __dirname = path.resolve();
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/static"));

app.use(requestTime);
app.use(serverRoutes);

app.get("/", (req, res) => {
    console.log(req.requestTime);
    res.render("index", { title: "Tour Agency" });
});

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}...`);
});
