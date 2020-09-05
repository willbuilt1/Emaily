const express = require('express');
require('./services/passport');


const app = express();

require('./routes/authRoutes')(app);


//base path
app.get('/', (req,res) =>{
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Looky here</h1>');
    res.end();
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});