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
        return res.status(400).json({
            msg: 'Please include a name and email'
        });
    }

    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});



// Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({
                    msg: 'Member was updated',
                    member
                });
            }
        })
    } else {
        res.status(400).json({
            msg: `No Member with the id of ${req.params.id}`
        })
    }
})


// DELETE single member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json({
            msg: 'Member Deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({
            msg: `No Member with the id of ${req.params.id}`
        })
    }
})

module.exports = router