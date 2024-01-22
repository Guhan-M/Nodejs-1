import express from 'express'
import fs from "fs"
const app=express();
const PORT=process.env.PORT|| 8000
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send(`<h1>Welcome to Express</h1>`)
})
 
app.post('/createFile',(req,res)=>{
    const folderpath ='./textFiles';

    if(!fs.existsSync(folderpath)){
        (fs.mkdirSync(folderpath))
    }
    const timestamp=new Date().toISOString().replace(/:/g,'-');
    const filename=`${timestamp}.txt`;
    const filepath=`${folderpath}/${filename}`;

    fs.writeFileSync(filepath,timestamp);
    res.send("File created");
});

app.listen(PORT,()=>console.log("App is running"))
app.get('/getAllFiles',(req,res)=>{
const files=fs.readdirSync('./textFiles');
res.json({files})
});