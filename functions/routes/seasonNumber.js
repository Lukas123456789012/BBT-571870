const bbt = require('big-bang-theory');

const seasonNumber = (req, res) => {
    res.status(200).json({
        success: true,
        
        index: bbt._embedded.episodes.filter(episodes => (episodes.season == req.params.index) === (episodes.number == req.params.index) )
      });
    
  }

module.exports = seasonNumber;