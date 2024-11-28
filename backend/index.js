import express from "express    ";
import mysql from "mysql2";
import cors from "cors";
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mysqlking123@",
    database:"test"
})

const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.json("hello this is the backend");
})

//get all the data from the books
app.get("/books",(req,res)=>{
    const q="select * from books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

//posting new data to the table
app.post("/books",(req,res)=>{
    const q="insert into books (`title`,`desc`,`cover`,`price`) values (?)"
    const values=[req.body.title,req.body.desc,req.body.cover,req.body.price];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json('book created');
    });
})

//deleting a particular book using id attribute
app.delete("/books/:id",(req,res)=>{
    const q="delete from books where id=?"
    const bookid=req.params.id;
    db.query(q,[bookid],(err,data)=>{
        if(err) return res.json(`can't delete`);
        return res.json('book deleted');
    })
})

app.get("/update/:id",(req,res)=>{
    const id=req.params.id;
    const q='select * from books where id=?';
    db.query(q,[id],(err,data)=>{
        if(err) return res.json('nothing');
        return res.json(data);
    })
})

app.put("/update/:id", (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    // console.log(id);
    const values = [req.body.title, req.body.desc, req.body.cover, req.body.price];
    // console.log(values);
    // Using placeholders to prevent SQL injection
    const q = `UPDATE books SET title= ?, \`desc\` = ?, cover = ?, price = ? WHERE id = ?`;
  
    db.query(q, [...values, id], (err, data) => {
      if (err) {
        console.log(err);
        return err;
      }
      return res.status(200).json({ message: 'Updated successfully' });
    });
});

app.listen(4000,()=>{
    console.log("jai shri ram1");
})