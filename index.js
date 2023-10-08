const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Bell = require('@hapi/bell');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const mongoose = require('mongoose');
const {glob} = require('glob');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

const init = async () => {
    const server = Hapi.server({
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT
    });

    // Register plugins
    await server.register([
        Inert,
        Vision,
        HapiAuthJwt2,
        Bell,
        require('hapi-auth-cookie'),
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'Node Sweat Documentation',
                    version: '0.0.1',
                },
            },
        },
    ]);

    // JWT authentication strategy
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validate: async (decoded, request, h) => {
            // Simple check if the jwt has a userId in the payload
            // TODO check against the database if it is a real user
            if (decoded.userId) {
                // Injecting userId to use in validations later in requests
                request.userId = decoded.userId;

                return {isValid: true};
            }
            return {isValid: false};
        },
        verifyOptions: {algorithms: ['HS256']}, // Verify the token using HS256 algorithm
    })

    // Set the default authentication strategy to 'jwt'
    server.auth.default('jwt');

    // Declaring views engine to use handlebars and views directory
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views'
    });

    // MongoDB connection
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    // Registering routes
    // Using glob to dynamically load and register routes
    console.log("Registering routes... ");
    const routes = await glob('./routes/*.js');

    routes.forEach((routePath) => {
        console.log(routePath);
        const route = require(path.resolve(routePath));
        server.route(route);
    });

    await server.start();
    console.log(`Server running on ${server.info.uri}`);

};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
