function compareVersion(v1, v2) {
  if (!v1 || !v2){
    console.warn('compareVersion !v1 || !v2')
    return 1;
  }

  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

const systemVersion = null;
function initSystemInfo(){
  var that = this
  wx.getSystemInfo({
    success: function(res) {
      console.log('getSystemInfo',res)
      that.systemVersion = res.SDKVersion
    },
  })
}

function compareSystemVersion(sVersion){
  if (this.systemVersion == null){
    console.log('systemVersion == null')
    this.systemVersion = wx.getSystemInfoSync().SDKVersion
  }
  return compareVersion(this.systemVersion, sVersion)
}

module.exports = {
  initSystemInfo: initSystemInfo,
  compareSystemVersion: compareSystemVersion
}