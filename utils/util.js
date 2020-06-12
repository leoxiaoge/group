const md5handler = require('../config/md5.js')

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
      let Appkey = '3709249'
      let AppSecert = '6a7466bbbcbe47db1d446dd8278599fc'
      let url = 'https://api.tuan399.com/rest.ashx'
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
      //生成签名
      sign = md5handler.md5(paramdata).toLocaleLowerCase()
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
  let handle = await processing(api, data)
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading()
    wx.request({
      url: handle.url,
      data: handle.postdata,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode === 200) {
          if (res.data.IsError) {
            if (res.data.ErrCode === '-2000') {
              wx.clearStorageSync()
              switchTab('/pages/index/index')
            } else {
              reject(res.errMsg)
              showToast(res.data.ErrMsg)
            }
          } else {
            resolve(res.data)
          }
        } else {
          reject(res.errMsg)
        }
      },
      fail: err => {
        reject(err)
        showToast('网络出错，请稍后再试!')
      },
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
  })
}

const navigateTo = url => {
  wx.navigateTo({
    url: url
  })
}

const navigateBack = delta => {
  wx.navigateBack({
    delta: delta
  })
}

const redirectTo = url => {
  wx.redirectTo({
    url: url
  })
}

const switchTab = url => {
  wx.switchTab({
    url: url
  })
}

const showToast = msg => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
    mask: true
  })
}

const showErrorToast = msg => {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png',
    duration: 2000
  })
}

const showModal = content => {
  return new Promise((resolve, reject) => {
    try {
      wx.showModal({
        content: content,
        confirmColor: '#fe7f00',
        success: (res) => {
          resolve(res)
        }
      })
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

const showActionSheet = itemList => {
  return new Promise((resolve, reject) => {
    try {
      wx.showActionSheet({
        itemList: itemList,
        success (res) {
          console.log(res.tapIndex)
          resolve(res)
        },
        fail (res) {
          reject(res)
          console.log(res.errMsg)
        }
      })
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  request: request,
  navigateTo: navigateTo,
  navigateBack: navigateBack,
  redirectTo: redirectTo,
  switchTab: switchTab,
  showToast: showToast,
  showErrorToast: showErrorToast,
  showModal: showModal,
  showActionSheet: showActionSheet
}
