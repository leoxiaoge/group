const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const navigateTo = (url) => {
  wx.navigateTo({
    url: url
  })
}

const navigateBack = (delta) => {
  wx.navigateBack({
    delta: delta
  });
}

const redirectTo = (url) => {
  wx.redirectTo({
    url: url
  })
}

const switchTab = (url) => {
  wx.switchTab({
    url: url
  })
}

module.exports = {
  formatTime: formatTime,
  navigateTo: navigateTo,
  navigateBack: navigateBack,
  redirectTo: redirectTo,
  switchTab: switchTab
}
