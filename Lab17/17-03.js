const redis = require('redis');

async function main() {
    
const client = redis.createClient({
    username: 'default',
    password: 'Ypl1uMuDY4O8KGzLvWc33DEEYc17Awlr',
    socket: {
        host: 'redis-19846.c13.us-east-1-3.ec2.cloud.redislabs.com',
        port: 19846
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();
console.log("Connected to Redis");
const COUNT = 10000;

    
    await client.set('incr', 0);

   
    let start = Date.now();

    for (let i = 0; i < COUNT; i++) {
    client.incr('incr');
    }

    let end = Date.now();
    console.log("INCR 10000 operations:", end - start, "ms");

        const finalValue1 = await client.get('incr');
    console.log("Final value:", finalValue1);

    

    
    start = Date.now();

    for (let i = 0; i < COUNT; i++) {
         client.decr('incr');
    }

    end = Date.now();
    console.log("DECR 10000 operations:", end - start, "ms");

    const finalValue = await client.get('incr');
    console.log("Final value:", finalValue);

    await client.quit();
}

main();