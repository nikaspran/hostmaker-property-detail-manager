import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default {
  getSiteData: () => ({
    title: 'Hostmaker property detail manager',
  }),
  getRoutes: async () => {
    const properties = require('./src/data/hm-property-detail-data.json')
    return [
      {
        path: '/',
        component: 'src/containers/PropertyDetails',
        getData: () => ({
          properties,
        }),
      },
      {
        path: '/map',
        component: 'src/containers/MapView',
      },
      {
        path: '/cols',
        component: 'src/containers/Cols',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props
      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
