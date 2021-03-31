const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const members = require('../../Members')


//   gets all members
router.get('/', (req, res) => res.json(members))

// get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({
            msg: `No Member with the id of ${req.params.id}`
        })
    }
})

// Create Member
router.post('/', (req, res) => {
    const newMember = {
      ...req.body,
      id: uuid.v4(),
      status: 'active'
    };
  
    if (!newMember.name || !newMember.email) {
      return res.status(400).json({ msg: 'Please include a name and email' });
    }
  
    members.push(newMember);
    res.json(members);
    // res.redirect('/');
  });
  



module.exports = router