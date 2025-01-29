import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/auth.js';
import { User } from '../models/User.js';

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
router.post('/check', async (req, res) => {
    try {
        const { mobileNumbers } = req.body;

        if (!Array.isArray(mobileNumbers) || mobileNumbers.length == 0) {
            return res.status(400).json({ 
                message: "Invalid. Provide an array of mobile numbers." 
            });
        }

        const members = await User.find({ mobileNumber: { $in: mobileNumbers } }, 'mobileNumber');
        const membersFound = members.map(member => member.mobileNumber);

        res.json({
            status: membersFound.length > 0 ? "valid" : "invalid",
            membersFound: membersFound,
            paymentRequired: membersFound.length === 0
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});


export default router;