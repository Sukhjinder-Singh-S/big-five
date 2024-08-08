import { Request, Response } from 'express'
import User, { IUser } from "../model/userModel";
import { compareHashPassword, hashPassword } from '../utils/password';
import Admin, { IAdmin } from '../model/adminModel'
import Performance from '../model/performance';


//To store user data who is taking the test
export const storeCurrentUserTakingTest = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, age, pincode, question1, question2 } = req.body
    console.log(req.body);

    let user = await User.create({ firstName, lastName, email, phone, age, pincode, question1, question2 })
    if (!user) {
      return res.status(400).json({ msg: "Unable to create the user", status: 400 })
    }
    res.status(201).json({ msg: "success", status: 201, data: user._id })
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", status: 500, Error: err })
  }
}

//To store user performance data 
export const storeUserPerformanceData = async (req: Request, res: Response) => {
  try {
    const { result, userId } = req.body
    if (!result && !userId) {
      return res.status(404).json({ msg: "Required fields are missing", status: 404 })
    }
    const saveResult = await Performance.create({ userId, result })
    if (!saveResult) {
      return res.status(404).json({ msg: "Failed to save result in db", status: 404 })
    }
    res.status(200).json({ msg: "success", data: { _id: saveResult._id, userId: saveResult.userId } })
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", status: 500, Error: err })
  }
}

//To get user perforamance data
export const getUsersData = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body
    if (!_id) {
      return res.status(404).json({ msg: "Enter required field: userId", status: 404 })
    }
    let checkAdmin = await Admin.findById(_id)
    if (!checkAdmin) {
      return res.status(404).json({ msg: "Failed to load data", status: 404 })
    }
    const getUsersData = await Performance.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          userId: '$user._id',
          result: 1,
        }
      }
    ])
    res.status(200).json({ msg: "success", data: getUsersData })
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", status: 500, Error: err })
  }
}


//Create admin if not exist in system
export const createSingleAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body
    const checkIfExist = await Admin.find().countDocuments()
    if (checkIfExist) {
      return res.status(404).json({ msg: "Single admin already exist, Failed to create another admin", status: 404 })
    }
    const hashPass = hashPassword(password)
    const createAdmin = await Admin.create({ email, password: hashPass, name })
    if (!createAdmin) {
      return res.status(404).json({ msg: "Failed to create admin in db", status: 404 })
    }
    res.status(200).json({ msg: "success", data: createAdmin._id, status: 200 })

  } catch (err) {
    res.status(500).json({ msg: "Internal server error", status: 500, Error: err })
  }
}

//Login admin into system
export const loginAdminIntoSystem = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email && !password) {
      return res.status(400).json({ msg: "Enter the required fields", status: 400 })
    }
    const admin = await Admin.findOne({ email }).lean()

    const hashedPass = admin?.password
    console.log(`Type of hash password: ${typeof hashedPass}`);

    if (typeof hashedPass !== 'string') {
      return res.status(500).json({ msg: "Admin's password is not set correctly", status: 500 });
    }
    const comparePassword: boolean = compareHashPassword(password, hashedPass)
    if (!comparePassword) {
      return res.status(400).json({ msg: "Password didn't match", status: 400 })
    }

    res.status(200).json({ msg: "success", status: 200, admin: { _id: admin?._id } })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Internal server error", status: 500, Error: err })
  }
}


//To get admin profile data 
export const getAdminDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    let fetchAdminData = await Admin.findOne({ _id: id }, { password: 0 }).lean()
    if (!fetchAdminData) {
      return res.status(400).json({ msg: `Unable to fetch admin with this id: ${id}`, status: 400 })
    }
    res.status(200).json({ msg: "Success", status: 200, data: fetchAdminData })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Internal server error", status: 500, Error: err })
  }
}

