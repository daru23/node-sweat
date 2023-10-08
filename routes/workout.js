const Joi = require('joi');
const WorkoutSession = require('../schemas/workoutSession');

const workoutSessionValidator = Joi.object({
    _id: Joi.object().description("Document identifier.").optional(),
    userId: Joi.number().required().description("User identifier."),
    date: Joi.date().required().description(" Date when the workout session occurred."),
    duration: Joi.number().required().description("Duration of the workout session in minutes."),
    caloriesBurned: Joi.number().required().description("Calories burned in the workout session."),
    __v: Joi.number().optional()
});

module.exports = [
    {
        method: 'GET',
        path: '/workouts/{id}',
        handler: async (request, h) => {
            try {
                // Get the userId from the request
                const {userId} = request;
                // Get workout id from the route parameters
                const {id} = request.params;

                // Find the workout by Id in the database
                const workoutSession = await WorkoutSession.findById(id).where({userId});

                if (!workoutSession) {
                    return h.response({error: 'Workout not found'}).code(404);
                }

                return h.response(workoutSession.toObject());

            } catch (error) {
                console.log(error);
                return h.response({error: 'Failed to get workout'}).code(500);
            }
        },
        config: {
            auth: 'jwt', // Require JWT authentication
            tags: ['api', 'workout', 'session', 'userId'],
            description: 'Fetch workout session for a user by giving a userId.',
            response: {
                schema: workoutSessionValidator.label('WorkoutSession'),
            },
            validate: {
                headers: Joi.object({
                    authorization: Joi.string()
                        .required()
                        .description('JWT Token in the Authorization header'),
                }).options({allowUnknown: true}),
                params: Joi.object({
                    id: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/workouts',
        handler: async (request, h) => {
            try {
                // Create a new workout using data from the request payload
                const newWorkoutSession = new WorkoutSession(request.payload);

                // Save the new workout to the database
                const savedWorkoutSession = await newWorkoutSession.save();

                // Transforming objectId to String to be able to validate it using Joi Schema
                const workoutSession = savedWorkoutSession.toObject();

                return h.response(workoutSession).code(201);
            } catch (error) {
                console.log(error);
                return h.response({error: 'Failed to create workout'}).code(500);
            }
        },
        config: {
            auth: 'jwt', // Require JWT authentication
            tags: ['api', 'workout', 'session', 'userId'],
            description: 'Create a workout session for a user.',
            response: {
                schema: workoutSessionValidator.label('WorkoutSession'),
            },
            validate: {
                headers: Joi.object({
                    authorization: Joi.string()
                        .required()
                        .description('JWT Token in the Authorization header'),
                }).options({allowUnknown: true}),
                payload: workoutSessionValidator.label('WorkoutSession'),
            }
        }
    }
];
