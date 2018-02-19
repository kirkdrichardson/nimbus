const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const googleTrends = require('google-trends-api');

const getInterestOverTime = keyword => {
  return googleTrends.interestOverTime({ keyword })
  .then(function(results){
    const timelineData = JSON.parse(results).default.timelineData
    return timelineData;
  })
  .catch(function(err){
    console.error('Oh no there was an error', err);
  });
}


const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    const searchQuery = req.query.searchQuery;
    console.log(searchQuery)
    res.set('Content-Type', 'application/json');
    getInterestOverTime(searchQuery)
    .then((results) => res.send(JSON.stringify(results)));
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
