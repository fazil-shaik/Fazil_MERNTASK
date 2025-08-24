import { Router } from 'express';
const router = Router();
import { Adddata, Getdata, Updatedata, Deletedata } from '../Controllers/MainController.js';

router.post('/companies', Adddata);
router.get('/companies', Getdata);
router.put('/companies/:id', Updatedata);
router.delete('/companies/:id', Deletedata);

export default router;
