const { connect } = require('async-mqtt');
const config = require('./config');
const { EventEmitter } = require('events');

class MqttClient extends EventEmitter {
    constructor() {
        super();
        this.broker = config.brokerAddress;
        this.options = {
          clientId: config.clientId,
          rejectUnauthorized: config.rejectUnauthorized,
          username: config.username,
          password: config.password
        };

        this.client = connect(this.broker, this.options);

        this.client.on('connect', () => {
            config.topics.forEach((topic) => client.subscribe(topic, { qos: 2 }));
            publish('allModules', 'identifyModule');
        });

        this.client.on('reconnect', () => {
          console.log('mqtt reconnecting');
        });

        this.client.on('disconnect', () => {
          console.log('mqtt disconnected');
        });

        this.client.on('error', (err) => {
          console.error(err);
        });

        this.client.on('message', (topic, message) => {
          try {
            this.resolve(topic, JSON.parse(message.toString()));
          } catch (err) {
            console.error(err);
          }
        });
    }

    resolve(topic, message){
        switch (topic) {
          case 'moduleManagement':
            this.emit(message.type, message);
            break;
          case 'Z-Wave':
            this.emit('resolve Z-Wave MQTT', message);
            break;
        }
    }

    publish(topic, request, parameters){
      client.publish(
        topic,
        JSON.stringify({ request, parameters }),
        { retain: false, qos: 2 }
      );
    };
}

module.exports = new MqttClient();
