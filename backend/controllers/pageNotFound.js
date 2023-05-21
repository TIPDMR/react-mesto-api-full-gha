module.exports.pageNotFound = (req, res) => {
  res.status(404).send({
    message: 'Страница не найдена',
  });
};
