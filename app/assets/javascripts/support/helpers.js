Support = window.Support || {};

Support.secondsToString = function(seconds, abbrev) {
  abbrev = abbrev || false;
  var days = seconds / 60 / 60 / 24 << 0;
  seconds -= days * (60*60*24);
  days = (days > 0 ? (days + (abbrev ? "d" : " days, ")) : "");
  var hours = seconds / 60 / 60 << 0;
  seconds -= hours * (60*60);
  hours = (hours > 0 ? (hours + (abbrev ? "h" : " hours, ")) : "");
  var minutes = seconds / 60 << 0;
  minutes = (minutes > 0 ? (minutes + (abbrev ? "m" : " minutes, ")) : "");
  seconds = seconds % 60 + (abbrev ? "s" : " seconds");
  var string = days + hours + minutes + seconds
  return string;
};