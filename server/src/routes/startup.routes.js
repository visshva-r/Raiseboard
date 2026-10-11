import express from 'express';
import mongoose from 'mongoose';
import { Interest } from '../models/Interest.js';
import { Startup } from '../models/Startup.js';
import { authRequired, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

function invalidStartupId(id) {
  return !mongoose.isValidObjectId(id);
}

router.get('/', async (_req, res, next) => {
  try {
    const startups = await Startup.find()
      .sort({ createdAt: -1 })
      .populate('founder', 'name')
      .lean();
    const withCounts = await Promise.all(
      startups.map(async (s) => {
        const interestCount = await Interest.countDocuments({ startup: s._id });
        return {
          id: s._id,
          name: s.name,
          oneLiner: s.oneLiner,
          sector: s.sector,
          fundingAsk: s.fundingAsk,
          founder: s.founder,
          interestCount,
          createdAt: s.createdAt,
        };
      })
    );
    res.json({ startups: withCounts });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    if (invalidStartupId(req.params.id)) {
      return res.status(404).json({ message: 'Raise not found' });
    }
    const startup = await Startup.findById(req.params.id)
      .populate('founder', 'name email')
      .lean();
    if (!startup) return res.status(404).json({ message: 'Raise not found' });

    const interestCount = await Interest.countDocuments({ startup: startup._id });
    const payload = {
      id: startup._id,
      name: startup.name,
      oneLiner: startup.oneLiner,
      sector: startup.sector,
      fundingAsk: startup.fundingAsk,
      founder: {
        id: startup.founder._id,
        name: startup.founder.name,
        email: startup.founder.email,
      },
      interestCount,
      createdAt: startup.createdAt,
      hasInterested: false,
      interestedUsers: null,
    };

    if (req.user) {
      const existing = await Interest.findOne({
        user: req.user.id,
        startup: startup._id,
      });
      payload.hasInterested = Boolean(existing);

      const founderId = String(startup.founder._id || startup.founder);
      if (founderId === String(req.user.id)) {
        const interests = await Interest.find({ startup: startup._id })
          .sort({ createdAt: -1 })
          .populate('user', 'name email')
          .lean();
        payload.interestedUsers = interests.map((i) => ({
          name: i.user.name,
          email: i.user.email,
          expressedAt: i.createdAt,
        }));
      }
    }

    res.json({ startup: payload });
  } catch (err) {
    next(err);
  }
});

router.post('/', authRequired, async (req, res, next) => {
  try {
    const { name, oneLiner, sector, fundingAsk } = req.body;
    if (!name?.trim() || !oneLiner?.trim() || !sector?.trim()) {
      return res.status(400).json({ message: 'Name, one-liner, and sector required' });
    }
    const ask = Number(fundingAsk);
    if (Number.isNaN(ask) || ask < 0) {
      return res.status(400).json({ message: 'Funding ask must be a non-negative number' });
    }
    const startup = await Startup.create({
      name: name.trim(),
      oneLiner: oneLiner.trim(),
      sector: sector.trim(),
      fundingAsk: ask,
      founder: req.user.id,
    });
    await startup.populate('founder', 'name');
    res.status(201).json({
      startup: {
        id: startup._id,
        name: startup.name,
        oneLiner: startup.oneLiner,
        sector: startup.sector,
        fundingAsk: startup.fundingAsk,
        founder: startup.founder,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/interest', authRequired, async (req, res, next) => {
  try {
    if (invalidStartupId(req.params.id)) {
      return res.status(404).json({ message: 'Raise not found' });
    }
    const startup = await Startup.findById(req.params.id);
    if (!startup) return res.status(404).json({ message: 'Raise not found' });

    if (String(startup.founder) === String(req.user.id)) {
      return res.status(400).json({ message: 'Founders cannot express interest in their own raise' });
    }

    const duplicate = await Interest.findOne({
      user: req.user.id,
      startup: startup._id,
    });
    if (duplicate) {
      return res.status(409).json({ message: 'You already expressed interest in this raise' });
    }

    await Interest.create({ user: req.user.id, startup: startup._id });
    res.status(201).json({ message: 'Interest recorded' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'You already expressed interest in this raise' });
    }
    next(err);
  }
});

export default router;
