import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'
import Header from '@sections/Header'
import Footer from '@sections/Footer'
import triggerInvoca from '@utils/trigger-invoca'
import SiteSearch from '@atoms/site-search/SiteSearch'

import '@utils/Global.css'
import '@fonts/fonts.css'

const Layout = ({
  children,
  headerAlwaysFixed,
  smallHeader,
  noHeader,
  localCtaData,
  noFooter,
  handleChangeLocation,
  headerHiddenForced,
  ...rest
}) => {
  React.useEffect(() => {
    const WebFont = require('webfontloader')
    WebFont.load({
      custom: {
        families: ['Graphie']
      }
    })

    // Invoca "componentDidMount()"
    triggerInvoca()
  }, [])

  return (
    <>
      <GlobalStyles />
      {!noHeader && (
        <Header
          handleChangeLocation={handleChangeLocation}
          localCtaData={localCtaData}
          alwaysFixed={headerAlwaysFixed}
          small={smallHeader}
          hiddenForced={headerHiddenForced}
        />
      )}
      <Main {...rest}>{children}</Main>
      {!noFooter && <Footer />}
      <SiteSearch />
    </>
  )
}

const Main = tw.main``

export default Layout
