import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Workout Tracker API",
            version: "1.0.0",
            description: "API pour gérer les workouts et exercices"
        },
        servers: [
            {
                url: "http://localhost:5000", // Mets l'URL de ton API
            }
        ]
    },
    apis: ["./routes/*.js"] // Scanner tous les fichiers de routes
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
