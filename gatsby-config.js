module.exports = {
  siteMetadata: {
    title: `Computer Science Workshops`,
    description: `A cool website for computer science related workshops`
  },
  plugins: [
    {
      resolve: `@patricoferris/gatsby-theme-workshops`,
      options: {
        // You can add the options as specified above
        workshopFolder: 'workshops', // Name of your folder for them (ab)
        basePath: '/workshops', // The base path for your workshop content i.e. www.my-site.com<basePath>/workshop-1
        sections: ['Setup', 'Prerequisites', 'Notes']
      }
    }
  ]
}