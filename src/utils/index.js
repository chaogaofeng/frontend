export function isNull(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

export function isString(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

export const isArray = (arg) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

// 去掉名称中“-”或“_”以外的的特殊字符
export function clearSpecialString(s){ 
  var pattern = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]") 
  var rs = ""; 
  for (var i = 0; i < s.length; i++) { 
      rs = rs+s.substr(i, 1).replace(pattern, ''); 
  } 
  return rs;  
}

/**
 * 日期格式化
 */
 export function dateFormat(format = 'yyyy-MM-dd hh:mm:ss', date) {
  if (date) {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return format
  }
  return ''
}

export function formatMoney(number, decimals=2, dec_point='.', thousands_sep=',') {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
  var s = n.toString().split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  } else {
    s[1] = s[1].substring(0, prec); //小数点位数超出长度时截取前面的位数
  }
  let formatNum = s.join(dec) === '0.00' ? '0' : s.join(dec);
  return formatNum;
}

export function downloadFile(data, type) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob([data], {
      type: 'application/' + type
    })
    window.navigator.msSaveOrOpenBlob(blob, 
      new Date().getTime() + '.' + type)
  } else {
    var blob = new Blob([data])
    var downloadElement = document.createElement('a')
    var href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    downloadElement.download = new Date().getTime() + '.' + type
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(href)
  }
}

export function isDigit(value) {
  const patrn = /^[0-9]*$/
  if (patrn.exec(value) == null || value === '') {
    return false
  } else {
    return true
  }
}

export function getQueryString(url, paraName) {
  const arrObj = url.split('?')
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&')
    let arr
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

export function downloadDoc(content,fileName) {
  const blob = new Blob([content])
  const url = window.URL.createObjectURL(blob)
  let dom = document.createElement('a')
  dom.style.display = 'none'
  dom.href = url
  dom.setAttribute('download',fileName)
  document.body.appendChild(dom)
  dom.click()
  document.body.removeChild(dom);
}


export function hasClass(ele, cName) {
  let reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
  if(ele.className === undefined){
    return false;
  }else{
    return reg.test(ele.className);
  }

}

export function getParent(ele, cName) {
  let targetParent = ele.parentNode;
  while (!hasClass(targetParent, cName)) {
    targetParent = targetParent.parentNode;
  }
  return targetParent;
}