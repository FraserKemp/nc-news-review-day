const { fetchAllArticles } = require('../models/articlesModel');

const getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(articles => {
      //length = 12
      res.status(200).send({ articles });
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports = { getAllArticles };
