import express from 'express'; 
import keywordSearch from './keyword-search'; 
import cors from "cors";


const app = express();
app.use(cors());

app.use('/api/keyword-search', keywordSearch);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

