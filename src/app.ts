import express from 'express'; 
import productSearch from './product-search'; 
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";


const app = express();
const swaggerDocument = YAML.load(path.resolve(__dirname, "../swagger.yaml"));

app.use(cors());

app.use('/api/product-search', productSearch);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs are available on http://localhost:${port}/api-docs`);
});

