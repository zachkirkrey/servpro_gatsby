import React, { createContext, useContext } from 'react'

const defaultValues = {
  visible: false
}

const SiteSearchContext = createContext(defaultValues)

const SiteSearchProvider = props => {
  const [visible, setVisible] = React.useState(false)

  const context = React.useMemo(() => {
    return {
      visible,
      setVisible: (value) => {
        setVisible(value);
      }
    }
  }, [visible])

  return (
    <SiteSearchContext.Provider value={context}>
      {props.children}
    </SiteSearchContext.Provider>
  )
}

export function useSiteSearch() {
  return useContext(SiteSearchContext)
}

export { SiteSearchContext, SiteSearchProvider }
