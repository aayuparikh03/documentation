const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/merged-api-docs", async (req, res) => {
    try {
        const service1 = await axios.get("http://localhost:8082/v3/api-docs");
        const service2 = await axios.get("http://localhost:8080/v3/api-docs");

        // Merge tags, avoiding duplicates
        const tags = [
            ...(service1.data.tags || []),
            ...(service2.data.tags || [])
        ].filter((tag, index, self) =>
            index === self.findIndex(t => t.name === tag.name) // Remove duplicates
        );

        const mergedSpec = {
            openapi: "3.1.0", // Upgraded version to match your expected output
            info: {
                title: "Combined API",
                description: "Merged API documentation",
                version: "1.0.0"
            },
            servers: [
                { url: "http://localhost:8082", description: "Generated server url" },
                { url: "http://localhost:8080", description: "Generated server url" }
            ],
            tags: tags,
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

        res.json({
            message: "Merged API documentation generated successfully!",
            mergedSpec
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching API specs" });
    }
});

app.listen(PORT, () =>
    console.log(`Merged API running on http://localhost:${PORT}/merged-api-docs`)
);

