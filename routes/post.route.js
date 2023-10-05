const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');

const {body, param, validationResult} = require('express-validator');

const idValidator = () => {
    return [
        param('id').isNumeric().withMessage('Enter only number') 
    ];
}

const text_and_title_Validator = () => {
    return[
        body('title').not().isEmpty().withMessage('The field is required'),
        body('title').isString().withMessage('Enter only letters'),
        body('text').not().isEmpty().withMessage('The field is required'),
        body('text').isString().withMessage('Enter only letters')
    ];
}


//Post-Create
router.post('/',text_and_title_Validator(), (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: false,
            data: errors.array()
        });
    }
    next();
},postController.create);

//Get All
router.get('/', postController.findAll);

//Get One
router.get('/:id',idValidator(), (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: false,
            data: errors.array()
        });
    }
    next();
}, postController.findOne);

//Update Post
router.patch('/:id', postController.updatePost);

//Update Category
router.patch('/:id/category',idValidator(), (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: false,
            data: errors.array()
        });
    }
    next();
}, postController.updateCategory);

//Delete
router.delete('/:id',idValidator(), (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: false,
            data: errors.array()
        });
    }
    next();
}, postController.deletePost);

//Delete Categories
router.delete('/:id/categories',idValidator(), (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: false,
            data: errors.array()
        });
    }
    next();
}, postController.deleteCategories);


module.exports = router;