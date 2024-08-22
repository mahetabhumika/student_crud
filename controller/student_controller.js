const StudentModel = require('../model/student_model');


const createStudent = async (req, res) => {
    if (!req.body.firstName) {
        res.status(400).send({
            message: "First Name is required!!!"
        });
    } else if (!req.body.lastName) {
        res.status(400).send({
            message: "Last Name is required!!!"
        });
    } else if (!req.body.mobile) {
        res.status(400).send({
            message: "Mobile number is required!!!"
        });
    } else if (!req.body.email) {
        res.status(400).send({
            message: "Email is required!!!"
        });
    } else if (!req.body.password) {
        res.status(400).send({
            message: "Password is required!!!"
        });
    } else if (!req.body.address) {
        res.status(400).send({
            message: "Address is required!!!"
        });
    } else if (!req.body.designation) {
        res.status(400).send({
            message: "Designation is required!!!"
        });
    } else {
        const result = await StudentModel.findOne({
            email: req.body.email,
            mobile: req.body.mobile
        });
        console.log("Result==========", result);
        if (result) {
            res.status(404).send({
                message: "This email alreday exists!!!"
            });
        } else {
            const user = new StudentModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobile: req.body.mobile,
                email: req.body.email,
                address: req.body.address,
                designation: req.body.designation,
                password: req.body.password
            });
            await user.save().then(data => {
                res.send({
                    message: "User created successfully!!",
                    user: data
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        }
    }
};

const editStudent = async (req, res) => {
    console.log("Enter??????", req.params.id);
    const result = await StudentModel.findOne({
        _id: req.params.id,

    });
    console.log("Result ==========", result);
    if (!result) {
        res.status(404).send({
            message: "This record not found!!!"
        });

    } else {
        StudentModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobile: req.body.mobile,
                email: req.body.email,
                address: req.body.address,
                designation: req.body.designation,
                password: req.body.password
            }
        ).then(async () => {
            const user = await StudentModel.findOne({
                _id: req.params.id,

            });
            res.status(200).send({
                message: "Student updated successfully",
                user: user
            })
        });


    }
};

const deleteStudent = async (req, res) => {
    const result = await StudentModel.findOne({
        _id: request.params.id,

    });
    if (!result) {
        res.status(404).send({
            message: "This record not found!!!"
        });

    } else {
        await StudentModel.deleteOne({
            _id: request.params.id
        }).then(() => res.status(200).send({
            message: "Student deleted from database",

        }));

    }
};

const getStudent = async (req, res) => {
    const user = await StudentModel.find();
    console.log("Student data", user);
    res.status(200).json({
        "success": true,
        "payload": {
            "user": user,
        }
    });
};
const getData = async (req, res) => {
    console.log(req.params);
    res.status(200).json({
        "success": true,
        "payload": {
            "name": req.params.name,
            "id": req.params.id,
        }
    });
};



module.exports = {
    createStudent,
    editStudent,
    deleteStudent,
    getStudent,
    getData,
};