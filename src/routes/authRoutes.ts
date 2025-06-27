import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validate } from '../middleware/validation';
import { authenticate, authorize } from '../middleware/auth';
import { signupSchema, loginSchema, passwordResetSchema } from '../utils/validation';

const router = Router();

router.post('/signup', validate(signupSchema), AuthController.signup);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/me', authenticate, AuthController.getMe);
router.post('/password-reset', validate(passwordResetSchema), AuthController.requestPasswordReset);

// Admin only route example
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

export default router;