const UserModel = require("../Model/UserModel");

exports.checkDuplicateEntries = (req, res, next) => {
        UserModel.findOne({
            email: req.body.email
        }).exec((error, email) => {
            if (error) {
                console.log(error);
                return;
            }
            if (email) {
                req.flash("message", "Email Already Exists");
                return res.redirect("/register");
            }
            next();
        })
    }