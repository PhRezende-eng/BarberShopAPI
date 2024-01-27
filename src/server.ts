import dotenv from "dotenv";
import app from "./app";

dotenv.config();

app.listen(
    3000,
    () => console.log("Server is running at PORT 3000 🚀 \n on http://localhost:3000")
)

export default app;




