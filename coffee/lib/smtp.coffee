nodemailer = require('nodemailer');

class SendGridSMTP

  @SMTP_HOST  = 'smtp.sendgrid.net'
  @SMTP_PORT  = 25

  constructor : (username, password) ->
    @server = {
      host                : SendGridSMTP.SMTP_HOST,
      port                : 25,
      ssl                 : false,
      use_authentication  : true,
      user                : username,
      pass                : password
    }
    @headers = {}

  resetHeaders : () ->
    @headers = {}

  addTo : (to) ->
    @headers['to'] = [] if !@headers['to']
    to = [to] if typeof(to) == 'string'
    @headers.concat(to)

  addSubVal : (key, value) ->
    @headers['sub'] = [] if !@headers['sub']
    value = [value] if typeof(to) == 'string'
    @headers['sub'][key] = value

  setUniqueArgs : (value) ->
    @headers['unique_args'] = value if typeof(value) == 'object'

  setCategory : (category) ->
    @headers['category'] = category

  addFilterSeting : (filter, setting, value) ->
    @headers['filters']                     = {} if !@headers['filters']
    @headers['filters'][filter]             = {} if !@headers['filters'][filter]
    @headers['filters'][filter]['settings'] = {} if !@headers['filters'][filter]['settings']
    @headers['filters'][filter]['settings']['setting'] = value

  asJSON : () ->
    return @headers

  as_string : () ->
    return JSON.stringify(@headers)

  send : (to, from, subject, text, html, toname, bcc, fromname, callback) ->
    nodemailer.send_mail({
      sender  : from,
      to      : to,
      subject : subject,
      html    : html,
      body    : text,
      bcc     : bcc,
      headers : {
        'X-SMTPAPI' : @as_string()
      },
      server : @server
    }, (error, success) ->
      callback(error, success) if callback
    )


exports.SendGridSMTP = SendGridSMTP