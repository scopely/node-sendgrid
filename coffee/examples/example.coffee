sendgrid = require('../index')

client = new sendgrid.SendGridClient('username','password')

client.api.unsubscribe.get({}, (err, result) ->
  console.log err, result
)

client.smtp.send('to@email.com', 'from@email.com', 'Test Subject', 'Test Body', 'Test HTML')

