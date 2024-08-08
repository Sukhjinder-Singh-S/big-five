"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post('/user', userController_1.storeCurrentUserTakingTest);
router.post('/admin', userController_1.getAdminDetail);
router.post('/checkQuesResp', userController_1.verifyPerformanceResp);
exports.default = express_1.Router;
