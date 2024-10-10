const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser'); // For parsing JSON bodies
const path = require('path'); // For resolving directory paths
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json()); // Use this if you're not using express.json()

// Set the view engine to EJS
app.set('view engine', 'ejs'); // Set EJS as the default view engine
app.set('views', path.join(__dirname, 'views')); // Set the directory for views

app.post('/instagram', async (req, res) => {
    const username = req.body.username;
    console.log('Username:', username);

    if (!username) {
        return res.status(400).send('Username is required');
    }

    try {
        const response = await axios.get(`https://www.instagram.com/${username}/?__a=1`);

        // Check if the response contains the specific meta tag
        const isTaken = response.data.includes(`<meta property="og:type" content="profile" />`);

        // Log the result
        console.log('Is Taken:', isTaken);

        // Send the response with the availability status
        return res.status(200).send(isTaken); // Send boolean response
    } catch (error) {
        console.error('Error fetching data from Instagram:', error.message);
        return res.status(500).send('Error fetching data from Instagram');
    }
});



app.get('/', (req, res) => {
    res.render('index'); // Render the index view
});

app.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
