const RegisterSchema = require('../../models/Authentication/Adminauth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {

    const { name, role } = req.body
    const password = await bcrypt.hash(req.body.password, 10)

    const register = new RegisterSchema({
        name,
        role,
        password
    })
    try {
        const regis = await register.save();
        const accessToken = jwt.sign(name, process.env.ACCESS_TOKEN)
        res.json({ status: 200, accessToken, data: regis })
    } catch (error) {
        res.send("Error" + error)
    }
}

exports.login = async (req, res) => {
    const { name, password } = req.body
    const user = await RegisterSchema.findOne({ name }).lean();
    if (!user) {
        return res.status(404).json({ success: false, Message: "Incorrect username" })
    }
    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(req.body.name, process.env.ACCESS_TOKEN)
        // res.json({ status: 200, accessToken, data: user })
        res.status(200).json({ success: true, Message: "Log in Successfully", data: { user, accessToken } })
    } else {
        res.status(400).json({ success: false, Message: "Incorrect password" })
    }
}
