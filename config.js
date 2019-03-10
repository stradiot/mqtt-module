module.exports = Object.freeze({
    clientId: process.env.MQTT_CLIENT_ID,
    topics: process.env.MQTT_TOPICS.split(','),
    brokerAddress: process.env.MQTT_BROKER,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    rejectUnauthorized: process.env.MQTT_REJECT_UNAUTHORIZED === 'true'
});
