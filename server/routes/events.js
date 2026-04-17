import { Router } from 'express';
import Event from '../models/Event.js';
import { auth } from '../middleware/auth.js';
const router = Router();

router.get('/', async (req,res)=>{ const items = await Event.find().sort({ date:1 }); res.json(items); });
router.post('/', auth, async (req,res)=>{ const ev = await Event.create(req.body); res.json(ev); });
router.post('/:id/volunteer', auth, async (req,res)=>{
  const ev = await Event.findById(req.params.id); if(!ev) return res.status(404).json({ msg:'Not found' });
  if(!ev.volunteers.includes(req.user.id)) ev.volunteers.push(req.user.id); await ev.save(); res.json(ev);
});

export default router;
