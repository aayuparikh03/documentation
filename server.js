const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname)));

const configPath = path.join(__dirname, 'config.json');
let SERVICE_URLS = [];

try {
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    SERVICE_URLS = configData.services;
} catch (error) {
    console.error("Error reading config.json:", error);
}

app.get('/merged-api-docs', async (req, res) => {
    try {
        const responses = await Promise.all(SERVICE_URLS.map(url => axios.get(url)));

        const mergedSpec = {
            openapi: "3.1.0",
            info: {
                title: "Combined API",
                description: "Merged API documentation using Redoc",
                version: "1.0"
            },
            servers: responses.flatMap(service => service.data.servers || []),
            tags: responses.flatMap(service => service.data.tags || []),
            paths: responses.reduce((acc, service) => ({ ...acc, ...service.data.paths }), {}),
            components: {
                schemas: responses.reduce((acc, service) => ({ ...acc, ...service.data.components?.schemas }), {})
            }
        };

        res.json(mergedSpec);
    } catch (error) {
        console.error("Error fetching API specs:", error);
        res.status(500).json({ error: "Error fetching API specs" });
    }
});

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` Merged API Docs: http://localhost:${PORT}/merged-api-docs`);
    console.log(` ReDoc UI: http://localhost:${PORT}/redoc.html`);
});
