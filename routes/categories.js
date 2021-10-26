var express = require('express');
var router = express.Router();

const categoriesRepositories = require("../repositories/categories-repository");

router.get('/', async function(req, res, next) {
  try {
    const categories = await categoriesRepositories.selectCategories();

    if (categories.length == 0) { 
      formatResponse(204, "No categories found.", res); 
    } else {
      formatResponse(200, categories, res);
    }
  } catch (err) { formatResponse(err.status ?? 404, err.message ?? "Unknown error.", res); }
});

router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params['id'];
    const category = await categoriesRepositories.selectCategoryById(id);
    
    if(category.length == 0) { 
      formatResponse(204, `No category found with Id ${id}.`, res); 
    } else {
      formatResponse(200, category[0], res);
    }
  } catch (err) { console.log(err); formatResponse(err.status ?? 404, err.message ?? "Unknown error.", res); }
});

router.post('/', async function(req, res, next) {
  try {
    const newCategory = req.body;

    if (newCategory == null) { formatResponse(400, "Request without body.", res) }

    if (!isJson(newCategory)) { formatResponse(400, "Request not contains a valid Json body.", res) } 

    const saveCategory = await categoriesRepositories.saveCategory(newCategory);

    if (saveCategory.affectedRows != undefined) {
      if (saveCategory.affectedRows > 0) {
        formatResponse(200, `Category with Id ${saveCategory.insertId} was inserted.`, res);
      } else {
        formatResponse(500, `An error occurred while processing your request.`, res);
      }
    } else {
      formatResponse(500, `An error occurred while processing your request.`, res);
    }
  } catch (err) { formatResponse(err.status ?? 404, err.message ?? "Unknown error.", res); }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const id = req.params['id'];
    const removeCategory = await categoriesRepositories.removeCategoryById(id);
    
    if (removeCategory.affectedRows != undefined) {
      if (removeCategory.affectedRows > 0) {
        formatResponse(200, `Category with Id ${id} was removed.`, res);
      } else {
        formatResponse(404, `No category found with Id ${id}.`, res)
      }
    } else {
      formatResponse(500, `An error occurred while processing your request.`, res);
    }
  } catch (err) { formatResponse(err.status ?? 404, err.message ?? "Unknown error.", res); }
})

function formatResponse(status, message, res) {
  res.status(status).json({
    status,
    message
  });
}

function isJson(object) {
  try {
      JSON.parse(JSON.stringify(object));
  } catch {
      return false;
  }
  return true;
}

module.exports = router;
