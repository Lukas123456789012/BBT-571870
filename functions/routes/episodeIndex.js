const bbt = require('big-bang-theory');

const episodeIndex = (req, res) => {
    res.status(200).json({
        success: true,
        index: req.params.index,

      });
    
  }

module.exports = episodeIndex;
