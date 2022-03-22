const router = require('express').Router()
const ControllerPost = require('../controllers/controllerPost')


router.get('/', ControllerPost.getAllPost)
router.post('/', ControllerPost.addPost)
router.get('/postTag', ControllerPost.searchTitle)
router.get('/post', ControllerPost.getPosts)
router.get('/:id', ControllerPost.getOnePost)
router.put('/:id', ControllerPost.editPost)
router.delete('/:id', ControllerPost.deletePost)

module.exports = router;