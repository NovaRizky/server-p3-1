const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')
const {authentication} = require('../middleware/auth')
const postRoutes = require('./post')
const categoryRoutes = require('./category')
const tagsRouter = require('./tags')

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Server up",
    });
});
router.post('/users', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.get('/users', ControllerUser.getAllUser)
router.use(authentication)
router.use('/posts', postRoutes);
router.use('/category', categoryRoutes);
router.use('/tags', tagsRouter)

module.exports = router