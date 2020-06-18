function isValidPhone (str) {
  var myreg = /^1[0-9]{10}$/
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}

function isEmail (str) {
  var myreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}

module.exports = {
  isValidPhone,
  isEmail
}