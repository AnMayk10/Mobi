import express from 'express'
import  {route}  from './routes/route';


const PORT : number = 3000;
const app = express();

app.use(express.json());
app.use(route)

app.listen(PORT,()=>{
 console.log(`Server running on port : ${PORT}`);
})

export {app}