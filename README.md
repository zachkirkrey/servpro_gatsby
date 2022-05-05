# Servpro Gatsby

[![Netlify Status](https://api.netlify.com/api/v1/badges/3cb4d67c-fb88-4c5d-b109-35b19714a21a/deploy-status)](https://app.netlify.com/sites/servpro/deploys)

This repo contains the Servpro website rebuild using Gatsby. Watch for updates in this README; I'll be sure to outline the important parts. Everything below this section was generated from the default Gatsby starter using `npx gatsby new`.

## 🚀 Quick start

1. **Start developing.**

Navigate into your new site’s directory and start it up after cloning this repo locally:

```shell
cd servpro_gatsby
gatsby develop
```

**Dev Note**: I simply use `yarn start`, which in turn runs `npm run develop`, which in turn runs `gatsby develop`. Right now, you can use `gatsby develop` directly, but we may add build tools and things that need to run beforehand, so watch this space if that no longer spins up the local correctly.

2. **Open the source code and start editing!**

Your site is now running at `http://localhost:8000`!

_Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

Open the `servpro_gatsby` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
       ├── components
       ├── fonts
       ├── images
       ├── pages
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── tailwind.config.js

1. **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2. **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

   1. **`/src/components`**: Will contain all the front-end components, see major section below.
   2. **`/src/fonts`**: Font files (TODO: web fonts) available through `gatsby-source-filesystem`, CSS
   3. **`/src/hooks`**: Gatsby `StaticQuery` Hooks for reusable data (not page-scoped).
   4. **`/src/images`**: Static images available through `gatsby-source-filetype`
   5. **`/src/pages`**: Static pages; these should be `index.js`, `404.js`, and universal index pages (like `Glossary Index` which shows all Glossary Terms, as opposed to a 3-post blogroll)
   6. **`/src/templates`**: Templates for programmatically-created pages; `default.js` serves the CMS Landing Pages.

3. **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4. **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5. **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6. **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/gatsby-config/) for more detail).

7. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8. **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9. **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

13. **`tailwind.config.js`**: The _Tailwind CSS_ style guide for the site; the base styling should be located here.

## Components Breakdown

In `src/components`, you'll find: `atoms`, `blocks`, `sections`, `utils`, and the page-wrapping `Layout.js`. Here I'll explain the basic purpose of each:

In `atoms`, you'll find React components that represent a single tag. For example: the `Container.js` file represents a single `<div>` that wraps content so it's not full-width. You can see why that would be important as a reusable, atomic piece of code.

In `sections`, you'll find React components that represent more complex markup. Components here should take in some `data`, and render it. They're built as a mix of reusable `atoms` and section-specific styling via `styled-components`/`twin.macro`.

In `blocks`, you'll find the adapters between `CMS Data` and `Sections`. Each block will contain a GraphQL query fragment, and any non-state logic the block has to make to render the proper section. The `Hero.js` block is a small, easy-to-read example of what is expected here. Some `blocks` contain styling when additional/shared sections aren't required, but as they outgrow this, should be given their own `Sections` to separate the front-end further.

In `utils`, I've included:

- `RichTextEditorStyles.js` to show how to style RTE input from the CMS. It is very likely each block will require its own RTE styles, but if global styling is required, it could be added to this file (base/reset, for example).

- `Seo.js`; the default from Gatsby. Each page includes a `meta_title` and `meta_description` field in the CMS with the option to add more. This component can/will be used to parse that CMS data into something `react-helmet` can read.

- `TransformCmsData.js` which handles the gql transform and calls the correct `Block` based on the CMS block chose. Thanks to how GraphQL queries work, there's no way to wildcard/universal query the blocks in a page, so we need to query each block type per block, then discard all the `null` data of the other types and just parse what's there.

## Adding Components

1. Make a CMS version of the component, add it to a landing page (`/kitchen-sink` is being used for this in dev), make sure it has the fields you want and the data you need.

2. Make a Block in `src/components/blocks` that passes or parses the CMS data.

3. Add it to, and export it from `src/components/blocks/index.js`

4. Add it to the enum in `src/utils/TransformCmsData.js`

5. Build the front-end in the `block`, or if complex, in `atoms` and `sections`.

## 💫 Deploy

[Build, Deploy, and Host On The Only Cloud Built For Gatsby](https://www.gatsbyjs.com/cloud/)

Gatsby Cloud is an end-to-end cloud platform specifically built for the Gatsby framework that combines a modern developer experience with an optimized, global edge network.
