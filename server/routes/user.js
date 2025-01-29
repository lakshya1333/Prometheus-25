import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

/**
 * @route   POST /api/user/check
 * @desc    Check if any of the provided mobile numbers belong to club members.
 * @access  Public
 * @req     Body: { mobileNumbers: <array of strings> }
 * @res     JSON: {
 *              status: "valid" | "invalid",
 *              membersFound: <array of strings>,
 *              paymentRequired: <boolean>
 *          }
 */





export default router;