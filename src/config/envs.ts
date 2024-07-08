import 'dotenv/config'
import * as joi from 'joi'

interface EnvConfig {
    PORT : number,
    MYSQL_DATABASE : string,
    MYSQL_USER : string,
    MYSQL_PASSWORD : string,
    MYSQL_PORT : number,
}

const envVarsSchema = joi.object({
    PORT: joi.number().required(),
    MYSQL_DATABASE: joi.string().required(),
    MYSQL_USER: joi.string().required(),
    MYSQL_PASSWORD: joi.string().required(),
    MYSQL_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envVarsSchema.validate( process.env ) 

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvConfig = value;

export const envs = {
    port: envVars.PORT,
    mysql: {
        database: envVars.MYSQL_DATABASE,
        user: envVars.MYSQL_USER,
        password: envVars.MYSQL_PASSWORD,
        port: envVars.MYSQL_PORT,
    },
}