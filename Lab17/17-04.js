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

  let start = Date.now();

  for (let i = 1; i <= COUNT; i++) {
    client.hSet(
          i.toString(),
          {
              id: i.toString(),
              val: "val-" + i,
              name: "Artem"
          }
      );
  }

  let end = Date.now();
  console.log("HSET 10000 operations:", end - start, "ms");



  start = Date.now();

    for (let i = 1; i <= COUNT; i++) {
      client.hGet(i.toString(), "val"); 
    }

  end = Date.now();
  console.log("HGET 10000 operations:", end - start, "ms");


  await client.quit();
}

main();
