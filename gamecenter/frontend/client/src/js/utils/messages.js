const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().add(1, 'hours').format('HH:mm')
  };
}

module.exports = formatMessage;
