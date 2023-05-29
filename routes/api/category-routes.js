const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{Product}]

      
      })
      .then((categories) => res.json(categories))
      .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category_id = req.params.id;
  Category.findOne({
    where: { id: category_id },
    include: 'Product'
   
    })
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json(category);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((categories) => res.json(categories))
.catch((err) => res.status(500).json(err));
});



router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, { where: { id: req.params.id } })
  .then((categories) => res.json(categories))
.catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
  .then((categories) => res.json(categories))
.catch((err) => res.status(500).json(err));
});

module.exports = router;
