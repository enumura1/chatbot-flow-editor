import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Chatbot Flow Editor',
  tagline: 'Visual development tool for creating chatbot conversation flows',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://enumura1.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/chatbot-flow-editor/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'enumura1', // Usually your GitHub org/user name.
  projectName: 'chatbot-flow-editor', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/enumura1/chatbot-flow-editor/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/enumura1/chatbot-flow-editor/tree/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/chatbot-flow-editor-social-card.jpg',
    
    // 告知バナー（リリース時などに使用）
    announcementBar: {
      id: 'support_us',
      content:
        '⭐️ If you like Chatbot Flow Editor, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/enumura1/chatbot-flow-editor">GitHub</a>! ⭐️',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: false,
    },

    navbar: {
      title: 'Chatbot Flow Editor',
      logo: {
        alt: 'Chatbot Flow Editor Logo',
        src: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'dropdown',
          label: 'Guide',
          position: 'left',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Installation',
              to: '/docs/installation',
            },
            {
              label: 'User Guide',
              to: '/docs/user-guide',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'dropdown',
          label: 'Links',
          position: 'right',
          items: [
            {
              label: 'npm Package',
              href: 'https://www.npmjs.com/package/chatbot-flow-editor',
            },
            {
              label: 'Demo',
              href: 'https://enumura1.github.io/chatbot-flow-editor/demo',
            },
          ],
        },
        {
          href: 'https://github.com/enumura1/chatbot-flow-editor',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Installation',
              to: '/docs/installation',
            },
            {
              label: 'User Guide',
              to: '/docs/user-guide',
            },
            {
              label: 'JSON Structure',
              to: '/docs/json-structure',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/enumura1/chatbot-flow-editor/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/enumura1/chatbot-flow-editor/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/enumura1/chatbot-flow-editor',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/chatbot-flow-editor',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/enumura1/chatbot-flow-editor/releases',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chatbot Flow Editor. Built with Docusaurus.`,
    },
    
    prism: {
      theme: prismThemes.github,
      additionalLanguages: ['bash', 'json', 'javascript', 'typescript'],
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

  } satisfies Preset.ThemeConfig,
};

export default config;
