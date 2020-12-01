
const express = require("express");

const router = express.Router();

const { register, login } = require("../controller/auth");
const { readBooks, createBooks, deleteBooks, readOne, updateBooks } = require('../controller/books');
const { getCategory, createCategory, deleteCategory, detailsCategory, updateCategory } = require('../controller/categories');
const { getUsers, deleteUser, detailUser, updateUser } = require("../controller/user");
const { authenticated } = require("../middleware/authentication");




//Books router
router.get('/books', authenticated, readBooks);
router.get('/books/:id', authenticated, readOne);
router.post('/books/post', authenticated,createBooks);
router.delete('/books/:id', authenticated,deleteBooks);
router.patch('/books/edit/:id', authenticated, updateBooks);


//categories router
router.get('/categories', getCategory);
router.get('/categories/:id', detailsCategory)
router.post('/categories/post', createCategory);
router.delete('/categories/:id', deleteCategory);
router.patch('/categories/edit/:id', updateCategory);

//User router
router.get('/users', getUsers);
router.delete('/user/:id', deleteUser);
router.get('/user/:id', detailUser);
router.patch('/user/edit/:id', updateUser);

//auth
router.post("/register", register);
router.post("/login", login);





module.exports = router;