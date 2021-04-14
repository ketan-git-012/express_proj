const User = require('./../models/user');
const { json } = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const jwt_decode = require('jwt-decode'); 
const bycrypt = require('bcrypt');
const user = require('./../models/user');

const options = {
    expiresIn: '1h',
    issuer: 'issuer'
  };


exports.signUp = async (req, res) => {
    // const { firstname, lastname, email, password } = req.body;

    if(!(req.body.firstname && req.body.lastname && req.body.email && req.body.password)){
        return res.status(400).json({
            error : "All field are mandatory"
        })
    }

    const salt = await bycrypt.genSalt(10);

    req.body.password = await bycrypt.hash(req.body.password, salt);

    const user = new User(req.body);

    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error : "not able to store in DB"
            })
        }
        return res.status(200).json({
            status : 'success',
            name : user.firstname + ' ' + user.lastname,
            email : user.email
        })
    })
}

exports.loginUser = async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        // const user = User.findOne({email : body.email});

        User.findOne({email : email})
        .then((user)=>{
            if(!user){
                return res.status(404).json({
                            error : "user doesnt exist"
                        })
            }
            bycrypt.compare(password, user.password, (err, result)=>{
                if(result == true){
                    const token = jwt.sign( { email : email, password : password }, 
                        process.env.SECRET , 
                        options
                        )
                    cookie.serialize('token', token);
                    req.headers.authorization = token;
                    return res.status(200).json({
                            status : 'success',
                            token : token,
                            email : user.email,
                            name : user.firstname + ' ' + user.lastname
                    })
                }
                else{
                    return res.status(400).json({
                        error : 'password is wrong'
                    })
                }
            })
        })
        // if(user){

        //     const validPassword = await bycrypt.compare(body.password, user.password);
        //     if(validPassword){
        //         return res.status(200).json({
        //             message : "Valid password"
        //         })
        //     }
        //     else{
        //         return res.status(400).json({
        //             error : "invalid password"
        //         })
        //     }
        // }
        // else{
        //     return res.status(404).json({
        //         error : "user doesnt exist"
        //     })
        // }

        // console.log("emailed user:", user);
        //         if(!user){
        //             return res.status(404).json({
        //                 error : "user not found"
        //             })
        //         }
        //         else{
        //             const validPassword = bycrypt.compare(body.password, user.password);
        //             console.log("validpassword:", validPassword);
        //             if(validPassword){
        //                 const token = jwt.sign( { email : body.email, password : body.password }, 
        //                     process.env.SECRET , 
        //                     options
        //                     )
        //                 cookie.serialize('token', token);
        //                 req.headers.authorization = token;
        //                 return res.status(200).json({
        //                     data : {
        //                         token : token,
        //                         data : body
        //                     }
        //                 })
        //             }
        //             else{
        //                 return res.status(400).json({
        //                     error : "email and password does not match"
        //                 })
        //             }
        //         }


        // if(email && password){
        //     const token = jwt.sign( { email : email, password : password }, 
        //                             process.env.SECRET , 
        //                             options
        //                             )
        //     cookie.serialize('token', token);
        //     req.headers.authorization = token;
        //     return res.status(200).json({
        //         email : email,
        //         password : password,
        //         token : token
        //     })
        // }
        // return res.status(400).json({
        //     message : "login failed"
        // })
}

exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty : "auth"
})

exports.addToken = (req, res) => {
        // var token = req.headers.authorization;
        // // const { token } = req.body;
        // const decoded = jwt_decode(token);
        // return res.send(decoded);
        return res.status(200).json({
            token : "Authorized token"
        })
}
// exports.isSignedIn = (req, res, next) => {
//         const authorizedHeader = req.headers.authorization;
//         let result;

//         if(authorizedHeader){
//             const token = req.headers.authorization.split(' ')[1];
//             try{
//                     result = jwt.verify(token, process.env.SECRET, options);
//                     req.decoded = result;
//                     next();
//             }
//             catch(err){
//                 throw new Error(err);
//             }
//         }
//         else{
//             res.status(401).json({
//                 error : "Authorization failed."
//             })
//         }
// };