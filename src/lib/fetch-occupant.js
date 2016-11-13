var axios = require('axios');
var cheerio = require('cheerio');
var _ = require('lodash');

function extractFromHtml(html) {
  var dom = cheerio.load(html);
  var scriptTag = dom('script[type="application/ld+json"]');
  if (!scriptTag) {
    return null;
  }

  try {
    return JSON.parse(scriptTag.contents());
  } catch (e) {
    console.error(e);
    return null;
  }
}

function extractOccupant(data) {
  return {
    name: _.get(data, '@graph.0.schema:name'),
    image: _.get(data, '@graph.0.schema:logo'),
    worksFor: _.get(data, '@graph.0.schema:worksFor')
  };
}

module.exports = function fetch(url) {
  var httpOptions = {
    headers: {
      'Accept': 'application/json, text/plain'
    }
  };

  return axios.get(url, httpOptions).then(function(response) {
    var data = response.data;
    var parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      parsedData = extractFromHtml(data);
    }

    return extractOccupant(parsedData);


  }).catch(function(err) {
    console.log(err);
    console.log('cormorant: GET ' + url + ' returned status ' + err.response.status);
    // stories[url] = null;
    return null;
  });
}
