const loaderUtils = require('loader-utils')

// Mostly borrowed from create-react-app next branch 2018-06-07
// To handle css module files named index.module.css
// + stripping of module from css classes
function getCssLocalIdent(context, localIdentName, localName, options) {
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.css$/
  )
    ? '[folder]'
    : '[name]'

  const hash = loaderUtils.getHashDigest(
    context.resourcePath + localName,
    'md5',
    'base64',
    5
  )
  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + '__' + localName + '--' + hash,
    options
  )
  return className.replace('.module_', '_')
}

module.exports = getCssLocalIdent