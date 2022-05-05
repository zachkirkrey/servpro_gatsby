import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function (i, n, v, o, c, a) {
              i.InvocaTagId = o;
              var s = n.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = ('https:' === n.location.protocol ? 'https://' : 'http://') + v;
              var fs = n.getElementsByTagName('script')[0];
              fs.parentNode.insertBefore(s, fs);
            })(window, document, 'solutions.invocacdn.com/js/invoca-latest.min.js', '1905/2238540922');
          `
          }}
        />
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}
