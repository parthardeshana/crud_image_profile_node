
const Product = require('../models/product')

var fs = require('fs-extra');
const mime = require('mime');

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
        res.status(200).json({ success: true, Message: "Product fetch Successfully", data: lan })
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

    // image upload Starts  
    let profileImage = req.body.profile_image;
    let dir = null;
    let baseURL = __dirname;
    if (/^data:([A-Za-z-+/]+);base64,(.+)$/.test(profileImage)) {
        console.log("After image");
        var matches = profileImage.match(
            /^data:([A-Za-z-+/]+);base64,(.+)$/
        ),
            response = {};
        if (matches.length !== 3) {
            return new Error("Invalid input string");
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], "base64");
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        var val = Math.floor(1000 + Math.random() * 9000);
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        let imageName = "profile" + "-" + Date.now() + "-" + val;
        let imageType = "." + extension;
        profileimage_name = imageName + imageType;
        console.log("aaaa:::::", profileimage_name);
        dir = `${baseURL}/../public/profiles`;
        console.log("co", `${baseURL}/../profiles`);

        await fs.ensureDir(dir, (err) => {
            fs.writeFileSync(dir + "/" + profileimage_name, imageBuffer, "utf8");
            console.log("erererere", err); // => null
        });
    }

    // image upload done 
    if (product__.length === 0) {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            profile_image: `${dir}/${profileimage_name}`
            // profile_image: profileimage_name
        })
        try {
            const lang = await product.save();
            res.status(200).json({ success: true, Message: "Product Added Successfully", data: lang })
        } catch (error) {
            res.send("Error" + error)
        }
    } else {
        res.status(200).json({ success: false, Message: "Product Duplicate entity" })
    }
}

//update product by id 
exports.update = async (req, res) => {
    try {
        Product.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, doc) => {
            if (err) {
                console.log("err" + err);
            } else {
                res.status(200).json({ success: true, Message: "Product Updated Successfully", data: req.body })
            }
        });
    } catch (error) {
        res.send("Error" + error)
    }
}