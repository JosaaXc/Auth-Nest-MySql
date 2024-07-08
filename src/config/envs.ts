import 'dotenv/config'
import * as joi from 'joi'

interface EnvConfig {
    PORT : number,
    MYSQL_PORT : number,
    MYSQL_DATABASE : string,
    MYSQL_USER : string,
    MYSQL_PASSWORD : string,
    MYSQL_HOST : string,
    JWT_SECRET : string,
}

const envVarsSchema = joi.object({
    PORT: joi.number().required(),
    MYSQL_DATABASE: joi.string().required(),
    MYSQL_USER: joi.string().required(),
    MYSQL_PASSWORD: joi.string().required(),
    MYSQL_PORT: joi.number().required(),
    MYSQL_HOST: joi.string().required(),
    JWT_SECRET: joi.string().required(),
}).unknown(true);

const { error, value } = envVarsSchema.validate( process.env ) 

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvConfig = value;

export const envs = {
    port: envVars.PORT,
    database: envVars.MYSQL_DATABASE,
    user: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASSWORD,
    dbport: envVars.MYSQL_PORT,
    host: envVars.MYSQL_HOST,
    jwtSecret: envVars.JWT_SECRET,
}