const app = require("./app");
require("dotenv").config();

// server port listen
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
});