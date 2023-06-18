import { Router } from 'express';
import teamRoute from './teamRoute';
import loginRoute from './loginRoute';
import matchRoute from './matchRoute';

const router = Router();

router.use('/teams', teamRoute);
router.use('/login', loginRoute);
router.use('/matches', matchRoute);

export default router;
