import { Router } from 'express';
import teamRoute from './teamRoute';

const router = Router();

router.use('/teams', teamRoute);

export default router;
