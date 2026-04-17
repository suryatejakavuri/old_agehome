import { Router } from 'express';
import Donation from '../models/Donation.js';
import { auth, adminOnly } from '../middleware/auth.js';
const router = Router();

router.get('/mine', auth, async (req,res)=>{ const items = await Donation.find({ donor:req.user.id }).sort({ createdAt:-1 }); res.json(items); });
router.post('/', auth, async (req,res)=>{ const d = await Donation.create({ ...req.body, donor:req.user.id }); res.json(d); });
router.get('/', auth, adminOnly, async (req,res)=>{ const items = await Donation.find().populate('donor residentRef').sort({ createdAt:-1 }); res.json(items); });
router.patch('/:id', auth, adminOnly, async (req,res)=>{ const item = await Donation.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json(item); });

export default router;
