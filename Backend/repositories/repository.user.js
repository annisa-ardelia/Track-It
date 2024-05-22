// POST: Create a new user
app.post('/user', async (req, res) => {
    try {
      const user = await db.User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});
  
// GET: Retrieve a user by ID
app.get('/user/:username', async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.username);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
// PUT: Update a user by ID
app.put('/user/:username', async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.username);
      if (user) {
        await user.update(req.body);
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});