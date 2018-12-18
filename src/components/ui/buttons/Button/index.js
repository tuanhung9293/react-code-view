import React from 'react'
import {Link} from 'react-router-dom'

function Button({children, to, href, onClick, disabled, ...rest}) {
  if (typeof to !== 'undefined') {
    if (disabled) {
      return <Link to={to} {...rest} onClick={(e) => e.preventDefault()}>{children}</Link>
    } else {
      return <Link to={to} {...rest}>{children}</Link>
    }
  } else if (typeof href !== 'undefined') {
    if (disabled) {
      return <a href={href} {...rest} onClick={(e) => e.preventDefault()}>{children}</a>
    } else {
      return <a href={href} {...rest}>{children}</a>
    }
  } else {
    return <button onClick={onClick} disabled={disabled} {...rest}>{children}</button>
  }
}

export default Button