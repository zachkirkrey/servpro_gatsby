import tw, { css } from 'twin.macro'

const RichTextEditorStyles = css`
  & {
    a {
      color: #ff7200;
      font-weight: 600;
      /* text-decoration: underline;  */
    }

    p {
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
    h1 {
      font-size: 54px;
      line-height: 1.1;
      margin-bottom: 28px;

      @media (max-width: 768px) {
        font-size: 48px;
      }
    }
    h2 {
      font-size: 36px;
      line-height: 1;
      color: #2b3b48;
      margin-bottom: 15px;
      margin-top: 1em;

      &:first-of-type {
        margin-top: 0;
      }

      @media (min-width: 769px) {
        font-size: 36px;
        line-height: 1.33;
      }
    }
    h3 {
      font-size: 18px;
      letter-spacing: 2.57px;
      line-height: 22px;
      color: #ff7400;
      margin-bottom: 7px;
      margin-top: 1em;

      &:first-of-type {
        margin-top: 0;
      }

      @media (max-width: 768px) {
        font-weight: 600;
      }
    }
    h4 {
      font-size: 24px;
      font-weight: 600;
      line-height: 33px;
      color: #2b3a49;
      letter-spacing: 0.34px;
    }
    ul {
      margin-bottom: 1em;
    }
    li {
      list-style-position: outside;
      list-style-type: disc;
      margin-left: 1.5rem;
      margin-bottom: 0.5rem;
    }
    hr {
      margin-bottom: 1.5rem;
    }
    blockquote {
      ${tw`text-lg lg:text-36px text-primary my-10 lg:my-20`}
    }
    table {
      border: 1px solid #dddddd;
      border-collapse: collapse;
    }
    th {
      border: 1px solid #dddddd;
    }
    td {
      border: 1px solid #dddddd;
      padding: 0.5rem;
    }
  }
`

export default RichTextEditorStyles
