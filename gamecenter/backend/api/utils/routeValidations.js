const Joi = require('@hapi/joi');

const registerUser = (data) => {
    const schema = {
        nom: Joi.string().required(),
        email: Joi.string().required.email(),
        prenom: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    };
    return Joi.validate(data,schema);
};