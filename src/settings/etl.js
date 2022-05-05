// eslint-disable-next-line no-underscore-dangle
const _get = require('lodash/get')
// eslint-disable-next-line no-underscore-dangle
const _keys = require('lodash/keys')

const ContentstackQueryTypes = [
  { uid: 'article', title: 'Articles' },
  { uid: 'faqs_data', title: 'FAQ Entries' },
  { uid: 'glossary_term', title: 'Glossary Term Entries' },
  { uid: 'press_release', title: 'Press Releases' },
  { uid: 'page_builder', title: 'Page Builder' },
  { uid: 'service_detail', title: 'Service Pages' }
] //array of contentstack types to query

const ContentTypeAlgoliaIndexMappings = {
  article: 'search_articles',
  faqs_data: 'search_faqs',
  glossary_term: 'search_glossaries',
  press_release: 'search_press',
  page_builder: 'search_pages',
  service_detail: 'search_services'
} //mapping content_type to algolia index

const Recipes = {
  article: (data, contentTypeUid, environment) => {
    return [
      {
        title: data.title,
        url: data.url,
        description:
          _get(data, ['seo', 'meta_description']) ||
          _get(data, ['meta', 'description']) ||
          null,
        content_type: contentTypeUid || '',
        environment,
        objectID: `${contentTypeUid}.${data.uid}.${data.locale}.${environment}`,
        ...data
      }
    ]
  },
  faqs_data: (data, contentTypeUid, environment) => {
    return [
      {
        title: data.title,
        url: data.url,
        description:
          _get(data, ['seo', 'meta_description']) ||
          _get(data, ['meta', 'description']) ||
          null,
        content_type: contentTypeUid || '',
        environment,
        objectID: `${contentTypeUid}.${data.uid}.${data.locale}.${environment}`,
        ...data
      }
    ]
  },
  press_release: (data, contentTypeUid, environment) => {
    return [
      {
        title: data.title,
        url: data.url,
        description:
          _get(data, ['seo', 'meta_description']) ||
          _get(data, ['meta', 'description']) ||
          null,
        content_type: contentTypeUid || '',
        environment,
        objectID: `${contentTypeUid}.${data.uid}.${data.locale}.${environment}`
      }
    ]
  },
  glossary_term: (data, contentTypeUid, environment) => {
    return [
      {
        title: data.title,
        url: data.url,
        description:
          _get(data, ['seo', 'meta_description']) ||
          _get(data, ['meta', 'description']) ||
          null,
        content_type: contentTypeUid || '',
        environment,
        objectID: `${contentTypeUid}.${data.uid}.${data.locale}.${environment}`,
        ...data
      }
    ]
  },
  page_builder: (data, contentTypeUid, environment) => {
    const contentData = {
      title: data.title,
      url: data.url
    }
    const sections = data.sections || []
    const result = []
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sections.length; i++) {
      const tempKeys = _keys(sections[i])
      if (tempKeys.length > 0) {
        const temp = SectionRecipes.page_builder(
          sections[i][tempKeys[0]],
          tempKeys[0],
          contentTypeUid,
          environment,
          contentData
        )
        result.push(temp)
      }
    }
    return result
  },
  service_detail: (data, contentTypeUid, environment) => {
    const contentData = {
      title: data.title,
      url: data.url
    }
    const sections = data.sections || []
    const result = []
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sections.length; i++) {
      const tempKeys = _keys(sections[i])
      if (tempKeys.length > 0) {
        const temp = SectionRecipes.default(
          sections[i][tempKeys[0]],
          tempKeys[0],
          contentTypeUid,
          environment,
          contentData
        )
        result.push(temp)
      }
    }
    return result
  }
} // the functions are used to transform the data

const SectionRecipes = {
  default: (data, sectionType, contentTypeUid, environment, contentData) => {
    return {
      heading: data.heading || _get(data, ['content', 'headline']) || '',
      subheading: data.subheading,
      copy: data.copy || _get(data, ['content', 'copy']) || '',
      seo: data.seo || null,
      title: data.title || contentData.title,
      url: data.url || contentData.url,
      content_type: contentTypeUid || '',
      section_content_type: sectionType,
      environment,
      // eslint-disable-next-line no-underscore-dangle
      objectID: `${contentTypeUid}.${data._metadata.uid}.${data.locale}.${environment}`,
      ...data
    }
  },
  page_builder: (
    data,
    sectionType,
    contentTypeUid,
    environment,
    contentData
  ) => {
    return {
      heading: data.heading || _get(data, ['content', 'headline']) || '',
      subheading: data.subheading,
      copy: data.copy || _get(data, ['content', 'copy']) || '',
      seo: data.seo || null,
      title: data.title || contentData.title,
      url: data.url || contentData.url,
      content_type: contentTypeUid || '',
      section_content_type: sectionType,
      environment,
      // eslint-disable-next-line no-underscore-dangle
      objectID: `${contentTypeUid}.${data._metadata.uid}.${data.locale}.${environment}`,
      _metadata: _get(data, ['content', 'headline'])
    }
  }

  // hero: (data, contentTypeUid, environment) => {
  //   return data
  // },
  // services_detail: (data, contentTypeUid, environment) => {
  //   return data
  // },
  // media_content: (data, contentTypeUid, environment) => {
  //   return data
  // }
} // the functions are used to transform the data

module.exports = {
  ContentTypeAlgoliaIndexMappings,
  ContentstackQueryTypes,
  Recipes
}
