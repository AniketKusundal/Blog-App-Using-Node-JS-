const mongoose = require('mongoose')

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Id Connected Succcessfully ✅");
        
    } catch (error) {
        console.log("Failed To Connect DB ❌");
        console.error("❌ DB Error:", error.message)
        process.exit(1)
        
    }
}

module.exports = connectDB;