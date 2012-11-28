var PREFIX = "/scoreBoard";

exports.init = function(app, mongoServer){
	var sb = mongoServer.collection("scoreBoard");
	
	//스코어 등록
	app.get(PREFIX + "/insScore", function(req, res){		
		sb.count({email : req.query.email}, function(err, count){		
			var _email = req.query.email;	
			var _score = req.query.score;

			if(count > 0){
				sb.findOne({email : _email},function(err, data){
					if(Number(data.score) < Number(_score)){
						sb.update({email: _email}, {$set: {score: _score}}, function(err) {						
							if (err){
								console.log("update failed");
							} else {
								console.log("update success");
							}
						});
					}
				});
			}else{
				console.log("insert :" + _email + " , " + _score);
				sb.insert({email: _email, score: _score});
			}
		});
		res.end();
	});
	
	//스코어 가져오기 (key : email)
	app.get(PREFIX + "/getScore", function(req, res){		
		var _email = req.query.email;
		
		sb.findOne({email : _email},function(err, _data){		
			if(_data != null){
				res.type('application/json');
				res.json({email: _data.email, score: _data.score});
			}
		});		
	});
}