var express = require('express')
var router = express.Router()
const sgMail = require('@sendgrid/mail');

function sendMail(req, res) {
	const sgMail = require('@sendgrid/mail')
	sgMail.setApiKey(process.env.SENDGRID_API_KEY)
	let app = req.body.app ? req.body.app : "Your app"
	let email = req.body.email ? req.body.email : "irving@appinchina.co"
	let stores = req.body.stores
	let templateId, subject, html

	if(!stores){
		subject = `AppInChina - ${app} should be in China`
		html = `<p>We've discovered that ${app} currently doesn't have a presence in the Chinese market.<br>
				   Would you like to gain access to over 750 million mobile users?<br>
				   Please get in contact with us now to find out more about distributing your app in China.
				</p>`
	}
	else{
		let storesText = stores == 1 ? "1 Chinese app store" : stores+" Chinese app stores"
		subject = `AppInChina - ${app} is already in China`
		html = `<p>Did you know that ${app} has already been distributed in China?<br>
				   It appears that your app is live on at least ${storesText}.<br>
				   Please get in contact with us now to reclaim ownership of your app and gain access to over 750 million mobile users.
				</p>`
	}

	const msg = {
		to: email,
		from: 'info@isyourappinchina.com',
  		replyTo: 'info@isyourappinchina.com',
		subject: subject,
		text: html.replace(/<p>|<\/p>|<br>/g,""),
		html: html,
		templateId: '165149df-18c5-40c0-8a1b-23588a9fc391',
	};
	console.log(msg)
	let data = sgMail.send(msg);
	res.send({ success : true, data : data })
}
router.get('/', (req, res) => { 
	res.send({ success : false, data : null })
});
router.post('/', (req, res) => { 
	try{ sendMail(req,res) }
	catch(e){ res.send({ success : false, data : e }) }
});
module.exports = router;