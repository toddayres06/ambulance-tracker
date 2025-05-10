// backend/routes/userRoutes.js
router.get('/emts', async (req, res) => {
    try {
      const emts = await prisma.user.findMany({
        where: { role: 'EMT' },
        select: { id: true, name: true }, // or whatever you need
      });
      res.json(emts);
    } catch (err) {
      console.error('Failed to fetch EMTs', err);
      res.status(500).json({ error: 'Could not fetch EMTs' });
    }
  });
  