"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPerformanceResp = exports.getAdminDetail = exports.storeCurrentUserTakingTest = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const Admin = "Import the admin model";
//To store user data who is taking the test
const storeCurrentUserTakingTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone, age, pincode, question1, question2 } = req.body;
        let user = yield userModel_1.default.create({ firstName, lastName, email, phone, age, pincode, question1, question2 }, { _id: 1, firstName: 1, lastName: 1, email: 1 });
        if (!user) {
            return res.status(400).json({ msg: "Unable to create the user", status: 400 });
        }
        res.status(201).json({ msg: "success", status: 201, data: user });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error", status: 500, Error: err });
    }
});
exports.storeCurrentUserTakingTest = storeCurrentUserTakingTest;
//To get admin profile data 
const getAdminDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        let fetchAdminData = yield Admin.findOne({ _id: id }, { password: 0 }).lean();
        if (!fetchAdminData) {
            return res.status(400).json({ msg: `Unable to fetch admin with this id: ${id}`, status: 400 });
        }
        res.status(200).json({ msg: "Success", status: 200, data: fetchAdminData });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error", status: 500, Error: err });
    }
});
exports.getAdminDetail = getAdminDetail;
//To verify user question responses from package
const verifyPerformanceResp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try { }
    catch (err) {
        res.status(500).json({ msg: "Internal server error", status: 500, Error: err });
    }
});
exports.verifyPerformanceResp = verifyPerformanceResp;
