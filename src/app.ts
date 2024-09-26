import express from 'express'; 
import keywordSearch from './keyword-search'; 
import cors from "cors";

const app = express();
app.use(cors());

app.use('/api/keyword-search', keywordSearch);


export default app;
