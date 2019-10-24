const amqp = require('amqplib');

const queue1 = 'queue1';
const queue2 = 'queue2';

const printDataQueue1 = (msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log('rabbitmq:queue1', JSON.parse(data).results[0]);
};

const printDataQueue2 = (msg) => {
     const data = JSON.parse(msg.content.toString());
    console.log('rabbitmq:queue2', JSON.parse(data).results[0]);
};

const init = async () => {    

    try {
        const rabbitmq = await amqp.connect('amqp://localhost:5672');
        const channel = await rabbitmq.createChannel();

        await channel.assertQueue(queue1);
        await channel.assertQueue(queue2);

        await channel.consume(queue1, printDataQueue1, { noAck: true });
        await channel.consume(queue2, printDataQueue2, { noAck: true });
    } catch (err) {
        debug('rabbitmq:error', err.message);
    }
};

init();