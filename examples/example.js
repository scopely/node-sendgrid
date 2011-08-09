(function() {
  var client, sendgrid;
  sendgrid = require('../index');
  client = new sendgrid.SendGridClient('username', 'password');
  client.api.unsubscribe.get({}, function(err, result) {
    return console.log(err, result);
  });
  client.smtp.send('to@email.com', 'from@email.com', 'Test Subject', 'Test Body', 'Test HTML');
}).call(this);
