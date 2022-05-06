const router = require('express').Router();
const { Project } = require('../../models');

const withAuth = require('../../utils/auth')

router.get('/', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll();

    const projects = projectData.map((project) => project.get({ plain: true}));

    console.log({projects});
    res.render('homepage', { projects, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  if(req.session.logged_in) {
    res.redirect('/api/projects');
    return;
  }
  console.log("logged in")
  res.render('login'); 
});


router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);

    const project = projectData.get({plain:true});

    res.render('project', { project });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
