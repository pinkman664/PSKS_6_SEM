const redis = require("redis");

const client = redis.createClient({
    username: 'default',
    password: 'Ypl1uMuDY4O8KGzLvWc33DEEYc17Awlr',
    socket: {
        host: 'redis-19846.c13.us-east-1-3.ec2.cloud.redislabs.com',
        port: 19846
    }
});

const subscriber = client.duplicate();

client.on('error', err => console.log('Redis Client Error', err));
subscriber.on('error', err => console.log('Subscriber Error', err));

client.connect()
    .then(() => subscriber.connect())
    .then(() => {
        subscriber.subscribe("channel1", (message) => {
            console.log("Получено сообщение:", message);
        })
            .then(() => {
                console.log("Subscriber готов к получению сообщений...");
            });
    })
    .catch(err => console.log(err));