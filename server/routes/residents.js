import { Router } from 'express';
import Resident from '../models/Resident.js';
import { auth, adminOnly } from '../middleware/auth.js';
const router = Router();

router.get('/', async (req,res)=>{ const items = await Resident.find().sort({ createdAt:-1 }); res.json(items); });
router.post('/', auth, adminOnly, async (req,res)=>{ const item = await Resident.create(req.body); res.json(item); });

export default router;
