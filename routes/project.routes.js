const {Router} = require('express')
const {Project} = require('../models')

const projectRouter = new Router();

projectRouter.get('/', async (req,res) =>{
    const projects = await Project.find({}).sort('-_id')
        .populate("techs", "name type -_id");

    res.status(200).json({
        status : 'success',
        data : projects
    })
})

projectRouter.post('/', async (req,res) =>{
    try {
        var newProject = req.body;
        const project = await Project.create(newProject);

        res.status(200).json({
            status : 'success',
            data : project
        })
    } catch (error) {
        res.status(error.code).json({
            status : 'error',
            error,
            data : null
        })
    }
})

projectRouter.delete('/:id', async (req,res) =>{
    try {
        var id = req.params.id;
        const project = await Project.findByIdAndDelete(id);
        if (!project)
            throw new Error("404 - Element not found");

        res.status(200).json({
            status : 'success',
            data : project
        })
    } catch (error) {
        var status = error.status | 500;

        res.status(status).json({
            status : 'error',
            error : error.message,
            data : null
        })
    }
})

module.exports = projectRouter