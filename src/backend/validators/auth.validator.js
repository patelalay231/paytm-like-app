const z = require("zod");

const signupValidator = z.object({
    username : z
    .string({required_error : "Username is required"})
    .min(4, {message : "username must be atleast 6 characters long"})
    .max(20,{message : "username must be atmost 20 characters long"})
    .trim(),
    password : z
    .string({required_error : "Password is required"})
    .min(3,{message : "password must be atleast 6 characters long"})
    .max(20,{message : "password must be atmost 20 characters long"})
    .trim(),
    firstname : z
    .string({required_error : "firstname is required"})
    .min(3, {message : "firstname must be atleast 6 characters long"})
    .max(20,{message : "firstname must be atmost 20 characters long"})
    .trim(),
    lastname : z
    .string({required_error : "lastname is required"})
    .min(3, {message : "lastname must be atleast 6 characters long"})
    .max(20,{message : "lastname must be atmost 20 characters long"})
    .trim(),
})

const updateValidator = z.object({
    username : z
    .string()
    .min(4, {message : "username must be atleast 6 characters long"})
    .max(20,{message : "username must be atmost 20 characters long"})
    .trim().optional(),
    password : z
    .string()
    .min(6,{message : "password must be atleast 6 characters long"})
    .max(20,{message : "password must be atmost 20 characters long"})
    .trim().optional(),
    firstname : z
    .string()
    .min(3, {message : "firstname must be atleast 6 characters long"})
    .max(20,{message : "firstname must be atmost 20 characters long"})
    .trim().optional(),
    lastname : z
    .string()
    .min(3, {message : "lastname must be atleast 6 characters long"})
    .max(20,{message : "lastname must be atmost 20 characters long"})
    .trim().optional(),
})

module.exports = {signupValidator,updateValidator};