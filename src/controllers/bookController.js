const Book = require("../models/bookModel");

exports.getBooks = async (req, res) => {
    Book.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getBookById = async (req, res) => {
    Book.findById(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};
exports.getBookByName = async (req, res) => {
    Book.find({name:req.params.name})
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.addBook = async (req, res) => {
    // let mongoose add a new product document
    try {
        //กำหนดค่า product ที่ต้องการเพิ่ม
        let book = new Book({
            book_id: req.body.book_id,
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img
            // not yet review
        });
        let createdBook = await book.save();
        res.status(200).json({
            msg: "Add a book complete.",
            data: createdBook
        });
    } catch (err) {
        // เมื่อเกิด error จะส่ง error message ออกไปด้วย
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editWholeBook = async (req, res) => {
    let book = {  //ข้อมูลใหม่
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img
    };
    Book.findByIdAndUpdate(req.params.id, book)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
        .exec((err, result) => {
            // findById อีกครั้งเพื่อเอา data ใหม่
            Book.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.deleteBook = async (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Delete OK"
            });
        });

};
