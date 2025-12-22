import app from "./app";
import { connectDB } from "./config/mongodb.config";
import 'dotenv/config';

const PORT: Number = Number(process.env.PORT)

app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`)
    connectDB()
})
