const { user, books } = require('../../models');



exports.getUsers = async (req,res) =>{
    try {
        const Users = await user.findAll({
            include: books
        });

        res.send({
            message: "Get User Successfully",
            Users
        })
    } catch (error) {
        console.log(err);
        res.status(400).send({
            message:"Server Error",
        })
    }

}

exports.addUsers = async (req,res) =>{
    try {
        const UserCreated = await user.create(req.body);

        res.send({
            message: "Add User Successfully",
            user: UserCreated
        })
    } catch (error) {
        console.log(err);
        res.status(400).send({
            message:"Server Error",
        })
    }
}

exports.deleteUser = async (req,res) =>{
    try {
        const { id } = req.params;
        await user.destroy({
            where:{
                id
            }
        });

        res.send({
            message: `Users with ID ${id} Was Deleted`
        })


    } catch (error) {
        console.log(err);
        res.status(400).send({
            message:"Server Error",
        })
    }

}

exports.detailUser = async (req,res) =>{
    try {
        const { id } = req.params;
        const users = await user.findOne({
            where: {id},
            include: books
        })

        res.send({
            message:`Response Success With ID ${id}`,
            users
        })
    } catch (error) {
        console.log(err);
        res.status(400).send({
            message:"Server Error",
        })
    }
}

exports.updateUser = async (req,res) =>{
    try {
        const {id} = req.params;
        const users = await user.findOne({
            where: {
                id
            }
        })

        const updated = await users.update(req.body);

        res.send({
            message:"Update Successfully",
            data: updated
        })
    } catch (error) {
        
    }
}