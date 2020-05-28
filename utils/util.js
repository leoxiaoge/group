const Md5 = require('../config/md5.js')

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

export const processing = (api, data) => {
  return new Promise((resolve, reject) => {
    try {
      const sessionkey = wx.getStorageSync('SessionKey')
      let Appkey = '3957399'
      let AppSecert = '2d2c443086630f6c2c804d11983729c8'
      let url = 'https://api.tengpaisc.com/Rest.ashx'
      let paramkey = Object.keys(data),
        paramdata = '',
        sign = ''
      paramkey.sort((a, b) => {
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1
        } else {
          return -1
        }
      })
      paramkey.map((item) => {
        paramdata += data[item]
      })
      paramdata = `${AppSecert}${paramdata}${AppSecert}`
      sign = Md5.hashStr(paramdata).toString()
      let systemdata = {
        Appkey: Appkey,
        V: 1,
        AppVer: 1,
        Format: 'json',
        SessionKey: sessionkey,
        Method: api,
        Sign: sign
      }
      let postdata = {
        ...systemdata,
        ...data
      }
      let handle = {
        url,
        postdata
      }
      resolve(handle)
    } catch (e) {
      reject(e)
    }
  })
}

export const request = async (api, data) => {
  let handle = await processing(api, data);
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading()
    wx.request({
      url: handle.url,
      data: handle.postdata,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.IsError) {
            if (res.data.ErrCode === 'Missing_Session') {
              redirectTo('../../ucenter/login/login')
            } else {
              if (res.data.ErrCode === '-2000') {
                wx.clearStorageSync()
              } else {
                showToast(res.data.ErrMsg)
              }
            }
          } else {
            resolve(res.data)
          }
        } else {
          reject(res.errMsg)
        }
      },
      fail: (err) => {
        reject(err)
        showToast('网络出错，请稍后再试!')
      },
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
  })
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

const showToast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
    mask: true
  })
}

const showErrorToast = (msg) => {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png',
    duration: 2000
  })
}


module.exports = {
  formatTime: formatTime,
  navigateTo: navigateTo,
  navigateBack: navigateBack,
  redirectTo: redirectTo,
  switchTab: switchTab,
  showToast: showToast,
  showErrorToast: showErrorToast
}
