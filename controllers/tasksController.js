const con = require('../connection');



/* Fetch Tasks From Database */

const displaytasks = async(req,res)=>{
    try {

        //con.connect(function(error){

        con.getConnection(function(error, tempCont){

            if(error) {
                return res.status(500).json({ error: error });
            }
    
            var sql = "SELECT * FROM tasks";
    
            con.query(sql,function(error,result){
    
                if(error) throw error;
    
                res.json(result);

                tempCont.release();
    
            });
    
        });

    } catch (error) {
        console.log(error.message);
    }
}




/* Insert Tasks From Database */

const inserttasks = async(req,res)=>{
    try {

        var task_name   = req.body.task_name;

        if (!task_name) {
            return res.status(400).json({ error: 'task_name are required fields.' });
        }
    
    
       // con.connect(function(error){
        con.getConnection(function(error, tempCont){
    
            if(error) {
                return res.status(500).json({ error: error });
            }
    
            var sql = "INSERT INTO tasks(task_name) VALUES ('"+task_name+"')";
    
            con.query(sql,function(error,result){
    
                if(error) throw error;
    
                //let id = result.insertId;
    
                res.json({ message: 'Task created successfully' , task_name });

                tempCont.release();
    
            });
    
        });
    
    } catch (error) {
        console.log(error.message);
    }
}



/* Update Task From Database */

const updatetasks = async(req,res)=>{
    try {

        const id = req.params.id;

       // con.connect(function(error){
        con.getConnection(function(error, tempCont){
    
            if(error) {
                return res.status(500).json({ error:error });
            }
    
            var sql = 'UPDATE tasks SET completed = "1" WHERE id = ?';
    
            con.query(sql , id ,function(error,result){
                if(error){ 
                    return res.status(500).json({ error: 'An error occurred while updating the post.' });
                }
    
                if(result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Post not found or not updated.' });
                }
              
                res.json({ message: 'Post updated successfully', id });

                tempCont.release();
    
            });
    
        });
    
    } catch (error) {
        console.log(error.message);
    }
}




/* Delete Task From Database */

const deletetasks = async(req,res)=>{
    try {

       // con.connect(function(error){
        con.getConnection(function(error, tempCont){

            if(error) {
                return res.status(500).json({ error: error});
            }
    
            var sql = "DELETE FROM tasks WHERE id = ?";
    
            con.query(sql, taskId , function(error,result){
    
                if(error) {
                    return res.status(500).json({ error: 'Field is required for delete.' });
                }
    
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Task not found or not deleted.' });
                }
    
                res.json({ message: 'Task deleted successfully', taskId });

                tempCont.release();
    
            });
    
        });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports ={
    displaytasks,
    inserttasks,
    updatetasks,
    deletetasks
}