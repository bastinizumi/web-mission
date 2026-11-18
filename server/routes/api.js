import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Faq from '../models/Faq.js';
import Contact from '../models/Contact.js';
import { isDBConnected } from '../config/db.js';
import { SERVICES_SEED, PROJECTS_SEED, FAQS_SEED } from '../seed/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localContactsFile = path.resolve(__dirname, '../data/contacts.json');

function readLocalContacts() {
  try {
    if (!fs.existsSync(localContactsFile)) return [];
    return JSON.parse(fs.readFileSync(localContactsFile, 'utf8'));
  } catch {
    return [];
  }
}

function saveLocalContact(entry) {
  const dir = path.dirname(localContactsFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const existing = readLocalContacts();
  existing.unshift(entry);
  fs.writeFileSync(localContactsFile, JSON.stringify(existing, null, 2));
}

const BRAND_INFO = {
  name: 'WEB MISSION',
  shortName: 'WebMission',
  tagline: 'EMPOWERING BUSINESSES ONLINE',
  since: 2017,
  city: 'Chennai',
  address: 'No: 13, 2nd Floor, Appadurai St, TMP Nagar, Padi, Chennai, Tamil Nadu 600050',
  phone: '+91 86376 623600',
  emails: ['hello@webmissions.in', 'webmissionsss@gmail.com'],
  socials: {
    linkedin: 'https://www.linkedin.com',
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    youtube: 'https://www.youtube.com',
  },
};

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'WebMission MERN API',
    database: isDBConnected() ? 'mongodb' : 'local-store',
    timestamp: new Date().toISOString(),
  });
});

router.get('/content', async (_req, res, next) => {
  try {
    if (isDBConnected()) {
      const [services, projects, faqs] = await Promise.all([
        Service.find().sort({ order: 1 }).lean(),
        Project.find().sort({ order: 1 }).lean(),
        Faq.find().sort({ order: 1 }).lean(),
      ]);
      return res.json({ brand: BRAND_INFO, services, projects, faqs });
    }

    res.json({
      brand: BRAND_INFO,
      services: SERVICES_SEED,
      projects: PROJECTS_SEED,
      faqs: FAQS_SEED,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/services', async (_req, res, next) => {
  try {
    if (isDBConnected()) {
      const services = await Service.find().sort({ order: 1 }).lean();
      return res.json(services);
    }
    res.json(SERVICES_SEED);
  } catch (err) {
    next(err);
  }
});

router.get('/projects', async (req, res, next) => {
  try {
    const { category } = req.query;
    if (isDBConnected()) {
      const filter = category && category !== 'All' ? { category } : {};
      const projects = await Project.find(filter).sort({ order: 1 }).lean();
      return res.json(projects);
    }
    const projects =
      category && category !== 'All'
        ? PROJECTS_SEED.filter((p) => p.category === category || p.tags?.includes(category))
        : PROJECTS_SEED;
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get('/faqs', async (_req, res, next) => {
  try {
    if (isDBConnected()) {
      const faqs = await Faq.find().sort({ order: 1 }).lean();
      return res.json(faqs);
    }
    res.json(FAQS_SEED);
  } catch (err) {
    next(err);
  }
});

router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name?.trim() || !email?.trim() || !service?.trim() || !message?.trim()) {
      return res.status(400).json({
        error: 'Please fill in your name, email, desired service, and message.',
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (isDBConnected()) {
      const inquiry = await Contact.create({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || '',
        service: service.trim(),
        message: message.trim(),
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your inquiry has been received by our Chennai studio.',
        inquiry: {
          id: inquiry._id,
          name: inquiry.name,
          service: inquiry.service,
          createdAt: inquiry.createdAt,
        },
      });
    }

    const entry = {
      id: `wm_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      service: service.trim(),
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    saveLocalContact(entry);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been received by our Chennai studio.',
      inquiry: {
        id: entry.id,
        name: entry.name,
        service: entry.service,
        createdAt: entry.createdAt,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const firstMsg = Object.values(err.errors)[0]?.message || 'Invalid form submission';
      return res.status(400).json({ error: firstMsg });
    }
    next(err);
  }
});

router.get('/contacts', async (_req, res, next) => {
  try {
    if (isDBConnected()) {
      const inquiries = await Contact.find().sort({ createdAt: -1 }).limit(25).lean();
      return res.json(inquiries);
    }
    res.json(readLocalContacts().slice(0, 25));
  } catch (err) {
    next(err);
  }
});

export default router;
