const net = require('net');
const fs = require('fs');
const srvConf = require('./srv-config.json');
const clientMsg = 'My attack is very hard';
const client = new net.Socket();

let strTime = () => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  return `${date} ${time}`;
}

client.connect(srvConf.port, srvConf.ip, () => {
  console.log(`[${strTime()}] Connected to ${srvConf.ip}:${srvConf.port}`);
  fs.appendFile('client-log.txt', `[${strTime()}] Connected to ${srvConf.ip}:${srvConf.port}` + '\n', () => {});
  setTimeout(() => {
    client.write(clientMsg);
    console.log(`[${strTime()}] Message sent: ${clientMsg}`);
    fs.appendFile('client-log.txt', `[${strTime()}] Message sent: ${clientMsg}` + '\n', () => {});
  }, 2000);
});

client.on('data', (data) => {
  console.log(`[${strTime()}] Message received: ` + data.toString());
  fs.appendFile('client-log.txt', `[${strTime()}] Message received: ` + data.toString() + '\n', () => {});
  // client.end();
});

client.on('end', () => {
  console.log(`[${strTime()}] Disconnected from server`);
  fs.appendFile('client-log.txt', `[${strTime()}] Disconnected from server` + '\n', () => {});
});