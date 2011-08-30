sendgrid = require('../index')

client = new sendgrid.SendGridClient('[username]','[password]')

client.api.unsubscribe.get({}, (err, result) ->
  console.log err, result
)


client.api.bounces.get({}, (err, result) ->
  console.log err, result
)

client.smtp.send('to@email.com', 'from@email.com', 'Test Subject', 'Test Body', 'Test HTML')

client.api.mail.send( {
  to      : 'to@email.com',
  from    : 'from@email.com',
  subject : 'Test Subject',
  text    : 'Test Body',
  html    : 'Test HTML' })
