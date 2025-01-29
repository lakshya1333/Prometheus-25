import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/check', async (req, res) => {
    try {
        const { mobileNumbers } = req.body;

        if (!Array.isArray(mobileNumbers) || mobileNumbers.length == 0) {
            return res.status(400).json({ 
                error: "Invalid. Provide an array of mobile numbers." 
            });
        }

        const members = await User.find({ mobile: { $in: mobileNumbers } }, 'mobile');
        const membersFound = members.map(member => member.mobile);

        res.json({
            status: membersFound.length > 0 ? "valid" : "invalid",
            membersFound: membersFound,
            paymentRequired: membersFound.length === 0
        });

    } catch (error) {
        res.status(500).json({
            error: "Server error"
        });
    }
});


export default router;