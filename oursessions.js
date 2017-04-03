let sessionInfo = {}


let getSessionData = (req, res, sessionID) => {
	if (!sessionID) {
		sessionID = Object.keys(sessionInfo).length + 1;
		res.setHeader('Set-Cookie', `session_id=${sessionID}`);
	}
	sessionInfo['sessionID'] = sessionInfo['sessionID'] || {views: 0};
	sessionInfo['sessionID'].views++;
	req.session = req.session || {};
	req.session.views = (sessionInfo['sessionID'].views);
}


module.exports = {getSessionData};