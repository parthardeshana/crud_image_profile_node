
const Product = require('../models/product')
const { cloudinary } = require('../utils/cloudinary');

//get all Product 
exports.get = async (req, res) => {
    try {
        const lan = await Product.find();
        res.status(200).json({ success: true, Message: "Product Fetched Successfully", data: lan })
    } catch (error) {
        res.send("Error" + error)
    }
}

//get one Product by id 
exports.getOne = async (req, res) => {
    try {
        const lan = await Product.findById(req.params.id);
        res.status(200).json({ success: true, Message: "selected Product fetch Successfully", data: lan })
    } catch (error) {
        res.send("Error" + error)
    }
}

//delete product by id
exports.delete = async (req, res) => {
    try {
        const lan = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, Message: "Product Deleted Successfully", data: lan })
    } catch (error) {
        res.send("Error" + error)
    }
}

//add product 
exports.post = async (req, res) => {
    const product__ = await Product.find({ name: req.body.name });
    if (product__.length === 0) {
        let fileStr = req.body.profile_base64;

        const uploadedResponse = await cloudinary.uploader
            .upload(fileStr, {
                upload_preset: "crud_node_profile"
            })

        //create new product
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            profile_image: uploadedResponse?.url
        })
        try {
            const productt = await product.save();
            res.status(200).json({ success: true, Message: "Product Added Successfully", data: productt })
        } catch (error) {
            res.send("Error" + error)
        }
    } else {
        res.status(200).json({ success: false, Message: "Product Duplicate entity" })
    }
}

//update language by id 
exports.update = async (req, res) => {
    let fileStr = req.body.profile_base64;
    let uploadedResponse = {};
    if (fileStr) {
        uploadedResponse = await cloudinary.uploader
            .upload(fileStr, {
                upload_preset: "crud_node_profile"
            })
    }
    let newData = {
        name: req.body.name,
        price: req.body.price,
        profile_image: fileStr ? uploadedResponse?.url : req.body.profile_image
    }

    try {
        Product.findByIdAndUpdate({ _id: req.params.id }, newData, (err, doc) => {
            if (err) {
                console.log("err" + err);
            } else {
                res.status(200).json({ success: true, Message: "Language Updated Successfully", data: req.body })
            }
        });
    } catch (error) {
        res.send("Error" + error)
    }
}
