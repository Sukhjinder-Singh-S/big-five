import {hashSync,compareSync} from 'bcrypt'
const saltRounds:number=12

export const compareHashPassword = (pass:string, hashPass:string):boolean=>{
    return compareSync(pass, hashPass)
}


export const hashPassword = (pass:string):string=>{
    return hashSync(pass,saltRounds)
}