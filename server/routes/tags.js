const router = require('express').Router()
const ControllerTag = require('../controllers/controllerTags')


router.get('/', ControllerTag.getAllTags)
router.post('/', ControllerTag.addTag)
router.delete('/:id', ControllerTag.deleteTag)

module.exports = router;