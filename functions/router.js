
const router = require('express').Router();
const seasonNumber = require('./routes/seasonNumber');
const episodeIndex = require('./routes/episodeIndex');
const seasonIndex = require('./routes/seasonIndex');
const episodes = require('./routes/episodes');
const { byName } = require('us-baby-names-2');
const { byYear } = require('us-baby-names-2');
const { yearsByName } = require('us-baby-names-2');
// Transform the data object elements into an
// HTML table
const formatToHTML = function(dataArr) {
    // If dataArr is undefined or null, make an empty array
    if (!dataArr) {
      dataArr = [];
    }
    // Use the Array.map function to convert each record 
    // into an HTML table element.
    dataArr = dataArr.map(item => {
      // Create the HTML here
      let html = '<tr>'
      html += (item.name) ? '<td>'+item.name+'</td>' : '';
      html += (item.year) ? '<td>'+item.year+'</td>' : '';
      html += (item.sex) ? '<td>'+item.sex+'</td>' : '';
      html += (item.count) ? '<td>'+item.count+'</td>' : '';
      html += '</tr>';
      return html
    })
    // Now join all the elements together inside the 
    // <table><tbody> elements.
    return '<table><tbody>'+
      dataArr.join('')+'</tbody></table>';
  }

  
  // Transform name with first character capitalized and the 
  // rest lower case
  const fixName = function(name) {
    let newName = name.toLowerCase();
    newName = newName.charAt(0).toUpperCase() +
      newName.substr(1)
    return newName
  }
  // Path 1: /baby-name/${name}
router.get('/baby-name/:name', function(req, res) {
    let data = byName[fixName(req.params.year)];
    res.send(formatToHTML(data));
  })
  // Path 2: /baby-year/<year>
router.get('/baby-name/:name/:year', function(req, res) {
    let data = byName[fixName(req.params.name)];
    data = data.filter((names) => names.year == req.params.year)
    res.send(formatToHTML(data));
  })
router.get('/baby-name/:name/after/:year', function(req, res) {
    let data = byName[fixName(req.params.name)];
    data = data.filter((names) => names.year >= req.params.year)
    res.send(formatToHTML(data));
  })
  router.get('/baby-name/:name/before/:year', function(req, res) {
    let data = byName[fixName(req.params.name)];
    data = data.filter((names) => names.year <= req.params.year)
    res.send(formatToHTML(data));
  })
  router.get('/baby-year/:year', function(req, res) {
    let data = byYear[req.params.year];
    res.send(formatToHTML(data));
  })
  router.get('/baby-year/:year/:name', function(req, res) {
    let data = byName[fixName(req.params.name)];
    data = data.filter((names) => names.year == req.params.year)
    res.send(formatToHTML(data));
  })
  router.get('/baby-year-start/:year/:letter', function(req, res) {
    let data = byYear[req.params.year]
    let lette = req.params.letter
    data = data.filter((names) => names.name.substr(0,1) == lette.toUpperCase());
    res.send(formatToHTML(data));
  })
  router.get('/baby-year-end/:year/:letter', function(req, res) {
    let data = byYear[req.params.year]
    let lette = req.params.letter
    data = data.filter((names) => names.name.substr(names.name.length-1,names.name.length) == lette.toLowerCase());
    res.send(formatToHTML(data));
  })
router.get("/season-Number/:index", seasonNumber);
router.get("/season-index/:index", seasonIndex);
router.get("/episode-index/:index", episodeIndex);
router.get("/episodes", episodes);

module.exports = router;
