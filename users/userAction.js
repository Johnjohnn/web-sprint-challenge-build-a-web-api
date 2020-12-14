const express = require("express")
const actions = require("../data/helpers/actionModel")
const router = express.Router()



//========================================================================================================== GET ENDPOINT
router.get("/actions",(req, res) =>{
    actions.get(req.params.id)                                  // always make sure actions.get matches with the actionModel function
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "Ids Not Found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the user",
			})
		})
})

//============================================================================================================== INSERT ENDPOINT
router.post("/actions/post", (req, res) => {
	if (!req.body.id) {                // THIS will insert Both name and Email  
		return res.status(400).json({
			message: "missing id",
		})
	}

	actions.insert(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the action",
			})
		})
})
//==================================================================================================================== DELETE ENDPOINTS   // http://localhost:4000/api/users/2
router.delete("/actions/:id",(req, res) =>{
    actions.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
            res.status(200).json({
                message: "The user has been nuked",
            })
    } else {
        res.status(404).json({
            message: "action could not be found",
        })
    }
})
.catch((error) => {
    console.log(error)
    res.status(500).json({
        message: "Error removing the user",
    })
    })
})
 
//============================================================================================================== update ENDPOINT
router.put("/actions/:id", (req, res) => {
	if (!req.body.id) {
		return res.status(400).json({
			message: "Missing user name or email",
		})
	}

	actions.update(req.params.id, req.body)
		.then((actions) => {
			if (actions) {
				res.status(200).json(actions)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the user",
			})
		})
})


module.exports = router
