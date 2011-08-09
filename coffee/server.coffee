SendGridClient = require('./lib/client').SendGridClient


s = new SendGridClient('scopely','hilgard12')
#s.mail.sendWebApiEmail('teodoru.gabi@gmail.com', 'hi', 'text', null, 'ankur@scopely.com')


s.api.unsubscribe.get({ankur: 'viphak', 'equals':'love'}, (err, result) ->
  console.log err, result
)

s.api.stats.getCategories( (err, result) ->
  console.log err, result
)



#s.api.mail.send({
#  to      : 'teodoru.gabi@gmail.com'
#  from    : 'ej@scopely.com'
#  subject : 'node-sendgrid api'
#  text    : 'this is sent with out node-sendgrid api'
#  html    : '<b>This is awesomeee SendGrid 4ever <3 </b>'
#})

#object.a.b.c
#
#
#
#
#s.unsubscribe.get(params)
#
#
#params -= {
#  email
#}
#s.unsubscribe.delete(params)
#
#
#
#s.fart.orbital(params)
#
#s.unsubscirbe.delete(email, text, noght)
#
#unsubscribe {
#  get     : [date],
#  delete  : [email]
#}
#
#


