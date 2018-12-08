module.exports.toQuertString = (opt) => {
  try {
    return Object.entries(opt).reduce((result, [key, value], index) => {
      if (index === 0) {
        return result += `?${key}=${value}`
      } else {
        return result += `&${key}=${value}`
      }
    }, '')
  } catch (err) {
    return ''
  }
}
