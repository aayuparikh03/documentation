const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname))); 


app.get('/merged-api-docs', async (req, res) => {
    try {
        const service1 = await axios.get('http://localhost:8082/v3/api-docs');
        const service2 = await axios.get('http://localhost:8080/v3/api-docs');

        const mergedSpec = {
            openapi: "3.1.0",
            info: {
                title: "Combined API",
                description: "Merged API documentation using Redoc",
                version: "1.0"
            },
            servers: [
                ...service1.data.servers || [],
                ...service2.data.servers || []
            ],
            tags: [
                ...service1.data.tags || [],
                ...service2.data.tags || []
            ], 
            paths: {
                ...service1.data.paths,
                ...service2.data.paths
            },
            components: {
                schemas: {
                    ...service1.data.components?.schemas,
                    ...service2.data.components?.schemas
                }
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
