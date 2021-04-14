const Trainee = require('./../models/trainee');


exports.addTrainee = (req, res) =>{
    const trainee = new Trainee(req.body);

    trainee.save((err, trainee)=>{
        if(err){
            return res.status(400).json({
                error : err
            })
        }
        return res.status(200).json({
            id : trainee._id
        })
    })
}

exports.getAllTrainee = (req, res) =>{
    Trainee.find((err, trainees)=>{
        if(err){
            return res.status(400).json({
                error : err
            })
        }
        if(!trainees){
            return res.status(404).json({
                error : 'No trainees found'
            })
        }
        return res.send(trainees);
    })
}

exports.getTraineeById = (req, res) => {
    Trainee.findById((req.params.id), (err, trainee)=>{
        if(err){
            return res.status(400).json({
                error : err
            })
        }
        if(!trainee){
            return res.status(404).json({
                error : 'No trainees found'
            })
        }
        return res.send(trainee);
    })
}

exports.updateTrainee = (req, res) => {
    const trainee = new Trainee(req.body);
    Trainee.updateOne(
        {_id : req.params.id},
        trainee,
        (err, trainee)=>{
            if(err){
                return res.status(400).json({
                    error : err
                })
            }
            if(!trainee){
                return res.status(404).json({
                    error : 'No trainees found'
                })
            }

            return res.send({_id : req.params.id})
        }
    )
}

exports.deleteTrainee = (req, res) => {
    Trainee.deleteOne(
        {_id : req.params.id},
        (err, trainee) => {
            if(err){
                return res.status(400).json({
                    error : err
                })
            }
            if(!trainee){
                return res.status(404).json({
                    error : 'trainee not found'
                })
            }

            return res.send({_id : req.params.id})
        }
    )
}