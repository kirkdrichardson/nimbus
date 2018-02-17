const googleTrends = require('google-trends-api');

console.log(googleTrends);

googleTrends.interestOverTime({keyword: 'Women\'s march'})
.then(function(results){
  const timelineData = JSON.parse(results).default.timelineData;
  console.log(timelineData);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
