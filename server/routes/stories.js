import { Router } from 'express';
import Story from '../models/Story.js';
import { auth } from '../middleware/auth.js';
const router = Router();

router.get('/', async (req,res)=>{ const stories = await Story.find({ published:true }).sort({ createdAt:-1 }); res.json(stories); });
router.post('/', auth, async (req,res)=>{ const st = await Story.create({ ...req.body, published:true }); res.json(st); });

export default router;
