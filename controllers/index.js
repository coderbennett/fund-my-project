const router = require('express').Router();
const apiRoutes = require('./api');
const Project = require('../models/Project');

router.use('/api', apiRoutes);

const withAuth = require('../utils/auth');
const session = require('express-session');

router.get('/', withAuth, async (req, res) => {
    try {
      const projectData = await Project.findAll();
  
      const projects = projectData.map((project) => project.get({ plain: true}));
  
      console.log({projects});
      res.render('homepage', { projects, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.get('/login', async (req, res) => {
      console.log(req.session);
    if(req.session.logged_in) {
      res.redirect('/');
      return;
    }
    // console.log("logged in")
    res.render('login'); 
  });

  module.exports = router;