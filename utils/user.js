/**
 * 用户相关服务
 */
const util = require('../utils/util.js')
const api = require('../config/api.js')

/**
 * Promise封装wx.checkSession
 */
function checkSession () {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true)
      },
      fail: function () {
        reject(false)
      }
    })
  })
}

/**
 * Promise封装wx.login
 */
function login () {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * 调用微信登录
 */
function loginByWeixin (userInfo) {
  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      let JsCode = res.code
      let nickName = encodeURIComponent(userInfo.nickName)
      let avatarUrl = userInfo.avatarUrl
      let gender = userInfo.gender
      //登录远程服务器
      util.request(api.Login, {
        JsCode: JsCode,
        nickName: nickName,
        avatarUrl: avatarUrl,
        gender: gender
      }, 'POST').then(res => {
        console.log('app', getApp())
        console.log('hasLogin', getApp().globalData.hasLogin)
        getApp().globalData.hasLogin = true
        wx.setStorageSync('SessionKey', res.SessionKey)
        resolve(res)
      }).catch((err) => {
        getApp().globalData.hasLogin = false
        reject(err)
      });
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * 判断用户是否登录
 */
function checkLogin () {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo')) {
      checkSession().then(() => {
        resolve(true)
      }).catch(() => {
        reject(false)
      });
    } else {
      reject(false)
    }
  })
}

module.exports = {
  loginByWeixin,
  checkLogin,
}