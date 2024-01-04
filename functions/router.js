
const router = require('express').Router();
const seasonNumber = require('./routes/seasonNumber');
const episodeIndex = require('./routes/episodeIndex');
const seasonIndex = require('./routes/seasonIndex');
const episodes = require('./routes/episodes');
router.get("/season-Number/:index", seasonNumber);
router.get("/season-index/:index", seasonIndex);
router.get("/episode-index/:index", episodeIndex);
router.get("/episodes", episodes);

module.exports = router;
