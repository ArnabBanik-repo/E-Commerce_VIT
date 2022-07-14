const express = require('express');
const {
    getUser,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(addUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
