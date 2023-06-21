import express, { Express } from "express";
import bodyParser from "body-parser";
import productRoutes from "./Routes/ProductRoutes";
import cors from "cors";
import { config } from "./ormconfig";
import path from "path";

const app: Express = express();
const PORT = config.server.port || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(productRoutes);
app.use(express.static(path.join(__dirname + "/dist")));

app.use("/", express.static(path.join(__dirname + "/dist/ecom-admin-panel")));
app.use("/uploads", express.static(path.join(__dirname, "/dist/assets")));

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname + "/dist", "ecom-admin-panel", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
