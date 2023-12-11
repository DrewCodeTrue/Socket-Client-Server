const net = require('net');
const fs = require('fs');
const PORT = 3000;
const AUTHOR_MSG = 'Server made by Drew. М3О-419Бк-20 💀'

let strTime = () => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  return `${date} ${time}`;
}

const server = net.createServer((socket) => {
  console.log(`[${strTime()}] Client connected with ip: ${socket.remoteAddress}`);
  fs.appendFile('server-log.txt', `[${strTime()}] Client connected with ip: ${socket.remoteAddress}` + '\n', () => {});
  socket.on('data', (data) => {
    strMsg = data.toString();
    console.log(`[${strTime()}] Message received: ${strMsg}`);
    fs.appendFile('server-log.txt', `[${strTime()}] Message received: ${strMsg}` + '\n', () => {});
    setTimeout(() => {
      if(!socket.closed) {
        socket.write(`${revertMsg(strMsg)} ${AUTHOR_MSG}`);
        console.log(`[${strTime()}] Message sent: ${revertMsg(strMsg)} ` + AUTHOR_MSG);
        fs.appendFile('server-log.txt', `[${strTime()}] Message sent: ${revertMsg(strMsg)} ` + AUTHOR_MSG + '\n', () => {});
        setTimeout(() => {
            socket.end();
        }, 3000);
      }
    }, 8000);
  });

  socket.on('close', () => {
    console.log(`[${strTime()}] Client closed`);
    fs.appendFile('server-log.txt', `[${strTime()}] Client closed` + '\n', () => {})
  });
  
  // socket.on('end', () => {
  //   console.log(`[${strTime()}] Client disconected`);
  // });
});

server.listen(PORT, () => {
  console.log(`[${strTime()}] Server listening on port ${PORT}`);
  fs.appendFile('server-log.txt', `[${strTime()}] Server listening on port ${PORT}` + '\n', () => {})
});

const revertMsg = (str) => str
.split(' ')
.map( word => word.split('').reverse().join('') )
.join(' ');