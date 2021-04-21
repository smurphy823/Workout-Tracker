const router = require("express").Router()
const db = require("../models")

router.get("/api/workouts", (req, res) => {
   db.Workout.aggregate([
       {
           $addFields: {
               totalDuration: {
                   $sum: "$exercises.duration"
               }
           }
       }
   ]).then(data => res.json(data))
   .catch(err => {
       res.json(err)
   })
})

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ]).sort({_id: -1})
    .limit(7)
    .then(data => res.json(data))
    .catch(err => {
        res.json(err)
    })
 })

 router.post("/api/workouts", (req, res) => {
    db.Workout.create({}).then(data => res.json(data))
    .catch(err => {
        res.json(err)
    })
 })

 router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id,
        {$push: {exercises: req.body}},
        {new: true, runValidators: true}
        ).then(data => res.json(data))
    .catch(err => {
        res.json(err)
    })
 })

 router.delete("/api/workouts", (req, res) => {
    db.Workout.findByIdAndDelete(req.body.id).then(() => res.json(true))
    .catch(err => {
        res.json(err)
    })
 })

 module.exports = router