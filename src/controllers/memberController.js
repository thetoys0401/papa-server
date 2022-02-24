const Member = require("../models/memberModel");

exports.getMembers = async (req, res) => {
    Member.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getMemberById = async (req, res) => {
    Member.findById(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};


exports.addMember = async (req, res) => {
    // let mongoose add a new product document
    try {
        //กำหนดค่า product ที่ต้องการเพิ่ม
        let member = new Member({
            member_id: req.body.member_id,
            type_id: req.body.type_id,
            name: req.body.name,
            groupstd: req.body.groupstd,
            address: req.body.address,
            tel: req.body.tel
            // not yet review
        });
        let createdMember = await member.save();
        res.status(200).json({
            msg: "Add a member complete.",
            data: createdMember
        });
    } catch (err) {
        // เมื่อเกิด error จะส่ง error message ออกไปด้วย
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editWholeMember = async (req, res) => {
    let member = {  //ข้อมูลใหม่
        type_id: req.body.type_id,
        name: req.body.name,
        groupstd: req.body.groupstd,
        address: req.body.address,
        tel: req.body.tel
    };
    Member.findByIdAndUpdate(req.params.id, member)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
        .exec((err, result) => {
            // findById อีกครั้งเพื่อเอา data ใหม่
            Member.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.deleteMember = async (req, res) => {
    Member.findByIdAndDelete(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Delete OK"
            });
        });

};
