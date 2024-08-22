const express = require('express');
const router = express.Router();
const studentController = require('../controller/student_controller');
const authController = require('../controller/auth_controller');
const authentication = require('../middleware/authentication');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/sendEmail', authController.sendEmail);

router.get('/user/:name/get/:id', authentication, studentController.getData);
router.post('/createStudent', authentication, studentController.createStudent);
router.put('/editStudent/:id', authentication, studentController.editStudent);
router.delete('/deleteStudent/:id', authentication, studentController.deleteStudent);
router.get('/getStudent', authentication, studentController.getStudent);


module.exports = router;
