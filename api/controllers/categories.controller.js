const Category = require("../models/category.model");
const createError = require("http-errors");

module.exports.getCategories = (req, res, next) => {
  Category.find()
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      next(createError(500, "Error al obtener las categorías"));
    });
};

module.exports.createCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
  }

  const newCategory = new Category({ name });

  newCategory
    .save()
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((error) => {
      next(createError(500, "Error al crear la categoría"));
    });
};
