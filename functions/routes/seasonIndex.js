const bbt = require('big-bang-theory');

const seasonIndex = (req, res) => {
    res.status(200).json({
        success: true,
        
        index: bbt._embedded.episodes.filter(episodes => episodes.season == req.params.index )
      });
    
  }

module.exports = seasonIndex;
