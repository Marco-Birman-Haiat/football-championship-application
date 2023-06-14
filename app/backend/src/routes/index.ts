import { Router } from 'express';
import teamRoute from './teamRoute';
import loginRoute from './loginRoute';

const router = Router();

router.use('/teams', teamRoute);
router.use('/login', loginRoute);

export default router;
