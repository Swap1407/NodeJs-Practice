const { Router } = require('express')
const userRoutes = require('./usersRoute')
const blogRoutes = require('./blogRoute')
const authRoutes = require('./authenticationRoute')

const router = Router()

router.use('/users', userRoutes)
router.use('/blogs', blogRoutes)
router.use('/authentication', authRoutes)

module.exports = router;