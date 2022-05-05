import React from 'react'
import Alert from '@atoms/Alert'
import Container from '@atoms/Container'

// Can't read the data param; as there's no GQL frag/query.
const UnsupportedBlock = () => (
  <Container>
    <Alert error>
      <strong>Unsupported Block:</strong> contact a dev to build the front-end.
    </Alert>
  </Container>
)

export default UnsupportedBlock
