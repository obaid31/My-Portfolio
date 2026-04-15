export default {
  mySidebar: [
    {
      type: 'doc',
      id: 'intro', // This links to intro.md
      label: 'Getting Started with API',
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/authentication',
        'api/endpoints',
        'api/errors',
      ],
    },
    {
      type: 'doc',
      id: 'changelog', // This links to changelog.md
      label: 'Changelog',
    },
  ],
};