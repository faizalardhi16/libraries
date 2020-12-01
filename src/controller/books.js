const { books, user, category} = require('../../models');

exports.readBooks = async (req,res) => {
    console.log("INI ID", req.user);
    try{
        
        const { token } = req.body; 

            const book = await books.findAll({
                include:[{
                    as:"user",
                    model:user,
                },
                {
                    as:"category",
                    model:category
                }]
            });
            res.status(200);
            res.send({
                Authorization: token,
                message:"response success",
                data: book
            })
   
        
    }catch(err){
        console.log(err);
        res.status(500);
        res.send({
            message:"server ERROR",
        })
    }

}

exports.createBooks = async (req,res) =>{
    try {
        const booksCreated = await books.create(req.body)

        res.send({
            message:"Upload Successfull",
            data: { 
                books: booksCreated, 
            }
        })

    } catch (error) {
        console.log(err);
        res.status(500);
        res.send({
            message:"Upload Failed",
        })
    }
}

exports.deleteBooks = async (req,res) =>{
    try {
        const { id } = req.params
        await books.destroy({
            where:{
                id
            }
        })

        res.send({
            message: `Delete Success With Id ${id}`,
        })
    } catch (error) {
        console.log(err);
        res.status(500);
        res.send({
            message:"Upload Failed",
        }) 
    }
}

exports.readOne = async (req,res) => {
    try {
        const { id } = req.params;

        const detailBooks = await books.findOne({
            where:{
                id,
            }
        })

        res.send({
            message: "Response Success",
            data: detailBooks,
        })
        
    } catch (error) {
        console.log(err);
        res.status(500);
        res.send({
            message:"Upload Failed",
        }) 
    }
}
  
exports.updateBooks = async (req,res) => {
    try {
        const { id } = req.params;

        const detailBooks = await books.findOne({
            where:{
                id,
            }
        })

        const updating = await detailBooks.update(req.body)

        res.send({
            message: "Update Success",
            data: updating,
        })
        
    } catch (error) {
        console.log(err);
        res.status(500);
        res.send({
            message:"Update Failed",
        }) 
    }
}
  


