const Blog = require("../models/Blog.Js")

const createBlog = async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.status(201).json({
            message: 'Blogs Created!',
            blog: newBlog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getBlogByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.find({author: id}).populate('author');
        res.status(201).json({
            message: `Blog Fetched! for User:${id}`,
            blog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(201).json({
            message: 'All Blog Fetched!',
            blogs
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.status(201).json({
            message: 'Blog Fetched! by blog Id',
            blog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(201).json({
            message: 'Blog Updated!',
            blog: updatedBlog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        res.status(201).json({
            message: 'Blog Deleted!',
            blogId: id
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports =  {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    getBlogByUserId
}