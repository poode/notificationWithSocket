exports.processMatch = function processMatch(subscription, signal) {
  opts = {
  from: 'Simple Notification Service',
  to: subscription.username,
  subject: subscription.topic + ' happened at: ' + new Date(),
  body: signal.body
  }
  // Send alert
  console.log('Alert sent to subscripers!! ==>', opts)
  }