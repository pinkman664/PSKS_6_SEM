const redis = require("redis");

const client = redis.createClient({
    username: 'default',
    password: 'Ypl1uMuDY4O8KGzLvWc33DEEYc17Awlr',
    socket: {
        host: 'redis-19846.c13.us-east-1-3.ec2.cloud.redislabs.com',
        port: 19846
    }
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect()
    .then(() => {
        console.log("Publisher подключен к Redis");

        let i = 1;
        setInterval(() => {
            client.publish("channel1", "Message " + i)
                .then(() => console.log("Отправлено сообщение:", i++))
                .catch(err => console.log(err));
        }, 1000);
    })
    .catch(err => console.log(err)); 