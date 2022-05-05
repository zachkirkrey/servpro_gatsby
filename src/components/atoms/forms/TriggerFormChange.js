import { useEffect, useRef } from 'react'
import { useFormikContext } from 'formik'
import { useGeoByAddress } from '@hooks/use-geo-by-address'

const regex = /^\d{5}$/gm

const TriggerFormChange = ({
  queryFieldName,
  setFields,
  visibleOwnerFields,
  setVisibleCityStateFields,
  setVisibleOwnerFields,
  setError
}) => {
  const prevValueOfQueryField = useRef('')
  const { data: geoData, fetchGeo } = useGeoByAddress()
  const { values, setFieldValue } = useFormikContext()

  useEffect(() => {
    if (geoData?.zip) {
      const fields = Object.keys(setFields)
      // eslint-disable-next-line no-unused-vars
      for (const field of fields) {
        if (setVisibleCityStateFields) {
          setVisibleCityStateFields(true)
        }
        setFieldValue(field, setFields[field](geoData), true)
      }
    }
  }, [geoData, setVisibleCityStateFields, setFieldValue])

  useEffect(() => {
    if (
      values[queryFieldName] &&
      values[queryFieldName] !== prevValueOfQueryField.current
    ) {
      prevValueOfQueryField.current = values[queryFieldName]
      if (regex.exec(values[queryFieldName])) {
        fetchGeo(values[queryFieldName])
      }
    }
    if (setError) {
      setError('')
    }
  }, [values])

  useEffect(() => {
    const temp = values.isOwner === 'true'
    if (setVisibleOwnerFields && visibleOwnerFields !== temp) {
      setVisibleOwnerFields(temp)
    }
  }, [values, visibleOwnerFields, setVisibleOwnerFields])

  return null
}

export default TriggerFormChange
