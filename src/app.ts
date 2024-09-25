import express from 'express'; 
import keywordSearch from './keyword-search'; 

const app = express();

app.get('/', (req, res) => {
  res.send('HELLO!');
});

app.use('/api/keyword-search', keywordSearch);


export default app;
