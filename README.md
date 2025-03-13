Merging API Documentation from Multiple Spring Boot Services

Overview
This project merges API documentation from two different Spring Boot services using a Node.js server and displays it using ReDoc.

Prerequisites
- Node.js installed
- npm installed
- Two running Spring Boot services with Swagger enabled

Steps to Set Up

1. Create Two Spring Boot Services
Ensure both Spring Boot services have Swagger enabled and are running on different ports (e.g., `8080` and `8082`).

2. Install Required npm Packages
Run the following command to install dependencies:

    npm install express axios swagger-merger


3. Create `server.js`
This Node.js server fetches OpenAPI specs from both services and merges them into a single API documentation.

4. Create `redoc.html`
This HTML file will use ReDoc to render the merged API documentation.

5. Start the Node Server
Run the following command:

  node server.js


6. View Merged API Documentation
- JSON Spec: [http://localhost:5000/merged-api-docs](http://localhost:5000/merged-api-docs)
- ReDoc UI: [http://localhost:5000/redoc.html](http://localhost:5000/redoc.html)

Dynamic Service Configuration
Instead of hardcoding service URLs, consider using an environment variable or a configuration file to manage the services dynamically.

Conclusion
This setup allows you to merge multiple API specifications into a single ReDoc documentation, making it easier to view and manage APIs from different services.

