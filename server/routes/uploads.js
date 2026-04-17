import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { auth } from '../middleware/auth.js';
const router = Router();
const UP='uploads';

router.post('/', auth, async (req,res)=>{
  const { base64, filename='file.png' } = req.body || {};
  if(!base64) return res.status(400).json({ msg:'No file' });
  const data = Buffer.from(base64.split(',').pop(), 'base64');
  const safeName = Date.now() + '-' + filename.replace(/[^a-zA-Z0-9._-]/g,'_');
  const fp = path.join(UP, safeName);
  fs.writeFileSync(fp, data);
  res.json({ url: `/uploads/${safeName}` });
});

export default router;
