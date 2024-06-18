const multer = require('multer');
const Ad = require('../models/Ad');
const Click = require('../models/Click');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadAd = [
  upload.single('image'),
  async (req, res) => {
    const { title, description, deeplink } = req.body;
    const { user } = req;

    try {
      const ad = new Ad({
        title,
        description,
        deeplink,
        image: req.file.path,
        uploadedBy: user.id,
      });

      await ad.save();
      res.json(ad);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
];

exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.logClick = async (req, res) => {
  const { adId } = req.body;

  try {
    const click = new Click({ adId });
    await click.save();
    await Ad.findByIdAndUpdate(adId, { $inc: { impressions: 1 } });
    res.json(click);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// exports.getAnalytics = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const clicksToday = await Click.countDocuments({ clickedAt: { $gte: today } });
//     const ads = await Ad.countDocuments();

//     res.json({
//       todayImpressions: clicksToday,
//       totalAds: ads,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };


exports.logImpression = async (req, res) => {
    try {
      const { adId } = req.body;
 
      const result = await Ad.findByIdAndUpdate(adId, { $inc: { impressions: 1 } });
  
  
      res.status(200).json({ message: 'Impression logged' });
    } catch (err) {
    
      res.status(500).send('Server error');
    }
  };
  