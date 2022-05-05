import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'

import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import paddingDefault from '@utils/paddingDefault'
import Container from '@atoms/Container'

import CeForm from '@atoms/forms/CeForm'
import CovidCleaningForm from '@atoms/forms/CovidCleaningForm'
import FirstResponderForm from '@atoms/forms/FirstResponderForm'
import PreferredVendorForm from '@atoms/forms/PreferredVendorForm'
import FnolForm from '@atoms/forms/FnolForm'
import FranchiseOwnershipForm from '../atoms/forms/FranchiseOwnershipForm'

const FormBuilder = ({ successMessage, formId, submitButton }) => {
  switch (formId) {
    case 'ce-form':
      return <CeForm submitButton={submitButton} />
    case 'covid-cleaning-form':
      return (
        <CovidCleaningForm
          successMessage={successMessage}
          submitButton={submitButton}
        />
      )
    case 'first-responder-form':
      return (
        <FirstResponderForm
          successMessage={successMessage}
          submitButton={submitButton}
        />
      )
    case 'preferred-vendor-form':
      return (
        <PreferredVendorForm
          successMessage={successMessage}
          submitButton={submitButton}
        />
      )
    case 'fnol-form':
      return (
        <FnolForm successMessage={successMessage} submitButton={submitButton} />
      )
    case 'franchise-ownership-form':
      return (
        <FranchiseOwnershipForm
          successMessage={successMessage}
          submitButton={submitButton}
        />
      )
    default:
      break
  }

  return <code>Missing Form</code>
}

const Form = ({ data }) => {
  const {
    headline,
    copy,
    spacing,
    form_id,
    submit_button_label,
    thank_you_message,
    settings = {}
  } = data

  const { hide_background } = settings

  return (
    <Background
      isHideBackground={hide_background}
      css={paddingDefault(spacing)}>
      <Container>
        <ContentWrap>
          <Heading
            isCopy={!!copy}
            dangerouslySetInnerHTML={{ __html: apCaseOnlyTitleTags(headline) }}
          />
          <Copy
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{ __html: copy }}
          />

          <FormBuilder
            successMessage={thank_you_message || ''}
            formId={form_id}
            submitButton={submit_button_label}
          />
        </ContentWrap>
      </Container>
    </Background>
  )
}

const Background = styled.div(({ isHideBackground }) => [
  isHideBackground ? tw`bg-white` : tw`bg-gray-100`
])
const ContentWrap = styled.div(() => [])
const Heading = styled.h2(({ isCopy }) => [
  tw`text-4xl leading-none mx-auto lg:(text-54px)`,
  isCopy && tw`pb-5`
])
const Copy = styled.div(() => [
  tw`text-lg mx-auto lg:(text-xl) whitespace-pre-line mb-3`
])

export const query = graphql`
  fragment FormData on CmsPageBuilderBlocks {
    form {
      headline
      copy
      form_id
      submit_button_label
      thank_you_message
      spacing {
        top_gutter
        bottom_gutter
      }
      settings {
        hide_background
      }
    }
  }
`

export default Form
