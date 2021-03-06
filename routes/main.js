const express = require('express')
const router = express.Router();
const mongo = require('mongojs')
const db = mongo('accountsapp', [ 'accounts' ])
const ObjectId = require('mongojs').ObjectId

router.get('/', (req, res) => {
	db.accounts.find((err, data) => {
		res.render('index', { accounts: data })
	})
})

router.get('/add-account', (req, res) => {
	res.render('add-account')
})

router.post('/save', (req, res) => {
	const first_name = req.body.first_name
	const last_name = req.body.last_name
	const email = req.body.email
	const phone = req.body.phone
	console.log(first_name, last_name, email, phone)
	db.accounts.insert(
		{
			first_name,
			last_name,
			email,
			phone
		},
		(err, data) => {
			if (err) {
				console.log('Unable to insert account')
			} else {
				console.log('account added successfully')
			}
			res.redirect("/"); // go to the index
		}
	)
})

router.get('/edit', (req, res)=>{
    db.accounts.find((err, data)=>{
        res.render('edit', {accounts: data})
    })
})

router.get('/edit/:_id', (req, res)=>{
    db.accounts.findOne({_id: db.ObjectId(req.params._id)}, (err, data)=>{
        if (err){
            console.log("unable to get info")
        }else{
            console.log("item found", data)
        }
       res.render("edit-account", {account: data})
    })
})

router.post('/save-account', (req, res)=>{
    const id = req.body.id;
    db.accounts.update({_id: db.ObjectId(id)}, {$set:{
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    }}, (err, data)=>{
        if(err){
            console.log("Unable to update item", err)
        }else{
            console.log("Update successfull")
        }
        res.redirect("/")
    })
})

router.get('/delete/:_id', (req, res)=>{
   
    const id = req.params._id;
    db.accounts.remove({_id: db.ObjectId(id)}, (err, data)=>{
        res.redirect('/edit')
    })
})
module.exports = router;