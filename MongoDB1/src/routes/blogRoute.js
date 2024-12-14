const { Router } = require('express')
const {
    createBlog,
    getBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    getBlogByUserId
} = require('../controllers/blogsController')

const router = Router()

router.post('/', createBlog)
router.get('/', getBlogs)
router.get('/:id', getBlog)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)
router.get('/author/:id', getBlogByUserId)

module.exports = router;