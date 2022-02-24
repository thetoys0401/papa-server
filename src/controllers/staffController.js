const Staff = require("../models/staffModel");

exports.getStaffs = async (req, res) => {
    Staff.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getStaffById = async (req, res) => {
    Staff.findById(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};


exports.editWholeStaff = async (req, res) => {
    let staff = {  //ข้อมูลใหม่
        name: req.body.name,
            phone_number: req.body.phone_number,
            address:req.body.address
    };
    Staff.findByIdAndUpdate(req.params.id, staff)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
        .exec((err, result) => {
            // findById อีกครั้งเพื่อเอา data ใหม่
            Staff.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.deleteStaff = async (req, res) => {
    Staff.findByIdAndDelete(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Delete OK"
            });
        });

};

exports.register = async (req, res)=> {
    try {

        let staff = new Staff({
            staff_id: req.body.staff_id,
            name: req.body.name,
            password:req.body.password,
            phone_number: req.body.phone_number,
            address:req.body.address
            
        })
        staff.password = await staff.hashPassword(req.body.password);
        let createdStaff = await staff.save();
        res.status(200).json({
            msg: "New staff created",
            data: createdStaff
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};

exports.login = async (req, res) => {
    const login = {
        staff_id: req.body.staff_id,
        password: req.body.password
    }
    // console.log(login)
    try {
        let staff = await Staff.findOne({
            staff_id: login.staff_id
        });
        // console.log(staff);
        //check if staff exit
        if (!staff) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }

        let match = await staff.compareStaffPassword(login.password, staff.password);
        if (match) {
            let token = await staff.generateJwtToken({
                staff
            }, "secret", {
                expiresIn: 604800
            })

            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    staffCredentials: staff
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
};