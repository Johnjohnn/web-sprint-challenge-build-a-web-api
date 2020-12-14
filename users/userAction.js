const express = require("express")
const actions = require("../data/helpers/actionModel")
const router = express.Router()
router.get("/actions",(req, res) =>{
    const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	}

	actions.get(options)
		.then((actions) => {
			res.status(200).json(actions)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the users",
			})
		})
})
router.post("/actions/post", (req, res) => {
	if (!req.body.name) {                // THIS will insert Both name and Email  
		return res.status(400).json({
			message: "Missing user name or email",
		})
	}

	actions.insert(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the user",
			})
		})
})

module.exports = router

// REMEMBER THAT YOU HAVE TO MAKE THE ENDPOINTS DEPENDING ON THE FUNCTIONS EXPORTED ON THE ACTION MODEL get, insert, update, remove