import server from './server'

server.start((info) => {
  console.log('Server started at port:', info.port);
});
