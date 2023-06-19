const express = require('express');
const flash = require('connect-flash');
const path = require('path');

const TeamModel = require('../../Model/TeamModel');

exports.adminindex = (req, res) => {
    res.render('admin/admin', {
        title: "Admin Home Page"
    })
}

exports.blog = (req, res) => {
    res.render('admin/blog', {
        title: "Admin Blog Page"
    })
}

exports.team = (req, res) => {
        TeamModel.find((err, data) => {
            if (!err) {
                res.render('admin/team', {
                    title: "Admin Team Page",
                    displaydata: data,
                    message:req.flash('message'),
                })
            } else {
                console.log("Data Not Found");
            }
        })
    }

    exports.team_add = (req, res) => {
        res.render('admin/team_add', {
            title: "Add Team Page"
        })
    }

    exports.storeteam = (req, res) => {
        const image = req.file
        const team = new TeamModel({
            team_member_name: req.body.t_name,
            designation: req.body.t_designation,
            gender:req.body.t_gender,
            image:image.path,
            });
        team.save().then((result) => {
            console.log(result, "Team Member Added Successfully");
            req.flash('message','Added Team Member Successfully')
            res.redirect('/admin/team');
        }).catch((error) => {
            console.log(error, "Team Member Data Not Saved");
            req.flash('error','You Cannot Send Blank Data')
            res.redirect('admin/team_add')
        })
    }

    exports.team_edit = (req, res) => {
        const tid = req.params.t_id;
        TeamModel.findById(tid).then(team => {
            console.log(team);
            res.render('admin/team_edit', {
                title: "Edit Team Page",
                singleData: team
            })
        }).catch(error => {
            console.log(error);
        })
    }

    exports.team_update = (req, res) => {
        const team_id = req.body.t_id;
        const Team_Member_Name = req.body.t_name;
        const Team_Designation = req.body.t_designation;
        const Team_Gender = req.body.t_gender;
        const image= req.file;
        
        TeamModel.findById(team_id).then(results => {
            results.team_member_name = Team_Member_Name;
            results.designation = Team_Designation;
            results.gender = Team_Gender;
            results.image=image.path;
            return results.save().then(result => {
                console.log("Updated Successfully");
                req.flash('message',' Team Member Updated Successfully')
                res.redirect('/admin/team');
            }).catch(error => {
                console.log(error);
            })
        }).catch(err => {
            console.log(err);
        })
    }
    
    exports.team_delete = (req, res) => {
        const tid = req.params.t_id;
        TeamModel.deleteOne({_id: tid }).then(result => {
            console.log(result, "Delete Team Member Successfully");
            req.flash('message','Team Member Deleted Successfully')
            res.redirect('/admin/team');
        }).catch(error => {
            console.log(error);
        })
    }

exports.service = (req, res) => {
    res.render('admin/service', {
        title: "Admin Service Page"
    })
}

exports.client = (req, res) => {
    res.render('admin/client', {
        title: "Admin Client Page"
    })
}

exports.feature = (req, res) => {
    res.render('admin/feature', {
        title: "Admin Feature Page"
    })
}

exports.admin_login = (req, res) => {
    res.render('admin/admin_login', {
        title: "Admin Login Page",
        message: req.flash('message')
    })
}

exports.admin_register = (req, res) => {
    res.render('admin/admin_register', {
        title: "Admin Register Page",
        message: req.flash('message')
    })
}

exports.logout=(req,res)=>{
    res.clearCookie('token')
    res.redirect('/admin')
}