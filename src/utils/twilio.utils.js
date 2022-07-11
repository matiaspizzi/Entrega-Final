const twilio = require('twilio');
const logger = require('./logger.utils.js');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);


const twilioAdmin = async (user) => {
    try {
        await client.messages.create({
            body: `Nuevo pedido de compra de ${user.name}, ${user.email}`,
            from: `whatsapp:${process.env.TWILIO_PHONE}`,
            to: `whatsapp:${process.env.PHONE_ADMIN}`
        }).then(logger.info("Mensaje a administrador enviado"));
    } catch (error) {
        logger.error(`${error}`);
    }
}

const twilioBuyer = async (receptor) => {
    try {
        await client.messages.create({
            body: 'Orden de compra recibida con éxito y en proceso',
            from: `whatsapp:${process.env.TWILIO_PHONE}`,
            to: `whatsapp:${receptor}`
        }).then(logger.info("Mensaje a comprador enviado"));
    } catch (error) {
        logger.error(`${error}`);
    }
}

module.exports = { twilioAdmin, twilioBuyer };
