const router = require('express').Router()
const ControllerCategory = require('../controllers/controllerCategory')


router.get('/', ControllerCategory.getAllCategory)
router.post('/', ControllerCategory.addCategory)
router.get('/:id', ControllerCategory.getOneCategory)
router.put('/:id', ControllerCategory.updateCategory)
router.delete('/:id', ControllerCategory.deleteCategory)

module.exports = router;