const Borrow = require("../models/borrowModel");

exports.getBorrows = async (req, res) => {
    Borrow.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Ok",
                data: result
            })
        });
};

exports.borrowBook = async(req, res) => {
    try {
        let borrow = new Borrow(req.body);
        // borrow.dueDate = new Date().setDate(new Date() + 7);
        let createdBorrow = await borrow.save();

        //กำหนด data ของ dueDate แล้วค่อยเอาไป update หลังจากที่ insert แล้ว
        let dDate = new Date(createdBorrow.borrowDate)
        let data = { 
            dueDate : dDate.setDate(dDate.getDate()+120)    //เพิ่มวันตามประเภทสมาชิก
            //การหาจำนวนวัน
            // let member = member.find({});
            // let data = {
            //     dueDate : dDate.setDate(dDate.getDate()+120)
            // }
        };
        //update โดยใส่ฟิลด์ dueDate แล้วให้ return เป็นผลลัพธ์
        Borrow.findByIdAndUpdate(createdBorrow._id, data).exec((err, result)=>{
            Borrow.findById(createdBorrow._id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Borrow Save",
                        data: result
                    });
                });
        });
    } catch (error) {
        // if there is an error, it will jump to here
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

// คืนหนังสือ = แก้ไข borrow โดยเพิ่มฟิลด์ returnedDate โดยเก็บวัน/เวลาปัจจุบัน
exports.returnBook = async(req, res) => {
    let data = { 
        returnedDate : new Date(),
        receiver: req.body.receiver
    };
    Borrow.findByIdAndUpdate(req.params.id, data).exec((err, result)=>{
            Borrow.findById(req.params.id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Return book saved",
                        data: result
                    });
                });
        });
};

// Search ประวัติการยืมตามรหัสสมาชิก
exports.getBorrowDataByMember = async (req, res) => {
    let memberId = req.params.id;
    console.log(memberId);
    Borrow.find({ "borrower.memberId": memberId })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

// Search ประวัติการยืมตามรหัสหนังสือ
exports.getBorrowDataByBook = async (req, res) => {
    let bookId = req.params.id;
    console.log(bookId);
    Borrow.find({ "book.bookId": bookId })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

