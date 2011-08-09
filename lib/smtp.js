(function() {
  var SendGridSMTP, nodemailer;
  nodemailer = require('nodemailer');
  SendGridSMTP = (function() {
    SendGridSMTP.SMTP_HOST = 'smtp.sendgrid.net';
    SendGridSMTP.SMTP_PORT = 25;
    function SendGridSMTP(username, password) {
      nodemailer.SMTP = {
        host: SendGridSMTP.SMTP_HOST,
        port: 25,
        ssl: false,
        use_authentication: true,
        user: username,
        pass: password
      };
      this.headers = {};
    }
    SendGridSMTP.prototype.resetHeaders = function() {
      return this.headers = {};
    };
    SendGridSMTP.prototype.addTo = function(to) {
      if (!this.headers['to']) {
        this.headers['to'] = [];
      }
      if (typeof to === 'string') {
        to = [to];
      }
      return this.headers.concat(to);
    };
    SendGridSMTP.prototype.addSubVal = function(key, value) {
      if (!this.headers['sub']) {
        this.headers['sub'] = [];
      }
      if (typeof to === 'string') {
        value = [value];
      }
      return this.headers['sub'][key] = value;
    };
    SendGridSMTP.prototype.setUniqueArgs = function(value) {
      if (typeof value === 'object') {
        return this.headers['unique_args'] = value;
      }
    };
    SendGridSMTP.prototype.setCategroy = function(category) {
      return this.headers['category'] = category;
    };
    SendGridSMTP.prototype.addFilterSeting = function(filter, setting, value) {
      if (!this.headers['filters']) {
        this.headers['filters'] = {};
      }
      if (!this.headers['filters'][filter]) {
        this.headers['filters'][filter] = {};
      }
      if (!this.headers['filters'][filter]['settings']) {
        this.headers['filters'][filter]['settings'] = {};
      }
      return this.headers['filters'][filter]['settings']['setting'] = value;
    };
    SendGridSMTP.prototype.asJSON = function() {
      return this.headers;
    };
    SendGridSMTP.prototype.as_string = function() {
      return JSON.stringify(this.headers);
    };
    SendGridSMTP.prototype.send = function(to, from, subject, text, html, toname, bcc, fromname) {
      return nodemailer.send_mail({
        sender: from,
        to: to,
        subject: subject,
        html: html,
        body: text,
        bcc: bcc,
        headers: {
          'X-SMTPAPI': this.as_string()
        }
      }, function(error, success) {
        return console.log('Message ' + (success != null ? success : {
          'sent': 'failed'
        }));
      });
    };
    return SendGridSMTP;
  })();
  exports.SendGridSMTP = SendGridSMTP;
}).call(this);
