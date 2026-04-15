const { createHmac , randomBytes } = require('node:crypto')
const  mongoose = require('mongoose');
const { error } = require('node:console');



const UserSchema = new mongoose.Schema({

    FullName : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    salt : {
        type: String,
        // required : true,
    },

    password : {
        type : String,
        required : true,
    },

    profilePhoto : {
        type : String,
        default : "/images/profile"
    },

    role : {
        type : String,
        enum : ["USER" , "ADMIN"],
        default : "USER"
    }
} , {timestamps : true});


// UserSchema.pre('save', function (next) {
//     const user = this;

//     if (!user.isModified("password")) return next();

//     // const salt = randomBytes(16).toString('hex');
//     const salt = "SomeRandomSalt"
//     const HashPassword = createHmac("sha256", salt)
//         .update(user.password)
//         .digest("hex");

//     user.salt = salt;
//     user.password = HashPassword;

//     next(); // MUST CALL
// });


UserSchema.pre('save', async function () {
    if (!this.isModified("password")) return;

    const salt = randomBytes(16).toString('hex');
    const hash = createHmac("sha256", salt)
        .update(this.password)
        .digest("hex");

    this.salt = salt;
    this.password = hash;
});




UserSchema.static("matchPassword" , async function(email , password){
    const user = await this.findOne({ email })

    if(!user) throw new Error("User Not Found");

    const salt = user.salt
    const HashPassword = user.password

    const userProvidedHash =createHmac("sha256" , salt).update(password).digest("hex")


    if(HashPassword !== userProvidedHash)
    {
        throw new Error("Incorrect Password")
    }


   return user;
})

const User = mongoose.model('user' , UserSchema)

module.exports = User;