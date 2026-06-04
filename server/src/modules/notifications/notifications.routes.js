import { Router } from 'express';
const router = Router();

router.get('/notifications', (req, res) => {
  res.status(200).json({ message: 'Notifications route placeholder' });
});

export default router;
