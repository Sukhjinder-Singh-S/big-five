import { Router } from 'express'
import { getAdminDetail, storeCurrentUserTakingTest, getUsersData, loginAdminIntoSystem, createSingleAdmin, storeUserPerformanceData } from '../controller/userController'


const router = Router()

router.post('/user', storeCurrentUserTakingTest)
router.post('/userPerformance', storeUserPerformanceData)
router.post('/newAdmin', createSingleAdmin)
router.post('/adminLogin', loginAdminIntoSystem)
router.post('/admin', getAdminDetail)
router.post('/getUsersData', getUsersData)

export default router