import { defineConfig } from "vitepress";

export default defineConfig({
  title: "NewRecruit Docs",
  description:
    "Documentation for creating and publishing game data for NewRecruit",
  // Served at https://<user>.github.io/nr-docs/. For a custom domain or a
  // user/org root site, change this to "/".
  base: "/nr-docs/",
  srcExclude: ["research/**", "README.md"],
  lastUpdated: true,
  sitemap: { hostname: "https://giloushaker.github.io/nr-docs/" },
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/api/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Start Here",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Installing the Tools", link: "/guide/install" },
            { text: "Your First Game System", link: "/guide/first-system" },
          ],
        },
        {
          text: "Understanding NR Data",
          items: [
            { text: "Core Concepts", link: "/guide/concepts" },
            { text: "Forces", link: "/guide/concepts/forces" },
            { text: "Profiles & Rules", link: "/guide/concepts/profiles" },
            { text: "Scope & Context", link: "/guide/concepts/scope" },
            { text: "Constraints", link: "/guide/concepts/constraints" },
            { text: "Conditions", link: "/guide/concepts/conditions" },
            { text: "Modifiers", link: "/guide/concepts/modifiers" },
            { text: "Links & Shared Entries", link: "/guide/concepts/links" },
            { text: "Collective", link: "/guide/concepts/collective" },
            { text: "Associations", link: "/guide/concepts/associations" },
            {
              text: "In-text References",
              link: "/guide/concepts/in-text-references",
            },
            { text: "Known Limitations", link: "/guide/limitations" },
            { text: "Troubleshooting", link: "/guide/troubleshooting" },
          ],
        },
        {
          text: "Recipes",
          items: [
            { text: "Overview", link: "/guide/recipes/" },
            { text: "Weapon options", link: "/guide/recipes/weapon-options" },
            {
              text: "Points that scale per model",
              link: "/guide/recipes/points-per-model",
            },
            {
              text: "Optional squad models",
              link: "/guide/recipes/optional-models",
            },
            {
              text: "Show or hide an option",
              link: "/guide/recipes/conditional-options",
            },
            { text: "Army-wide limits", link: "/guide/recipes/army-limits" },
            {
              text: "Sub-factions and allegiances",
              link: "/guide/recipes/sub-factions",
            },
            {
              text: "Reuse a mount across characters",
              link: "/guide/recipes/shared-mounts",
            },
          ],
        },
        {
          text: "Publishing",
          items: [
            { text: "Publishing Your Data", link: "/guide/publishing" },
            { text: "Best Practices", link: "/guide/best-practices" },
          ],
        },
        {
          text: "Advanced",
          items: [
            {
              text: "Condition-Group Maths",
              link: "/guide/advanced/condition-maths",
            },
            { text: "Sorting", link: "/guide/advanced/sorting" },
            { text: "Editor Scripts", link: "/guide/advanced/scripts" },
            {
              text: "Custom Export Templates",
              link: "/guide/advanced/export-templates",
            },
          ],
        },
        {
          text: "Reference",
          items: [
            { text: "What's New", link: "/guide/whats-new" },
            { text: "Supported Systems", link: "/guide/reference/supported-systems" },
            { text: "BSData Repositories", link: "/guide/reference/bsdata-repos" },
          ],
        },
      ],
      "/api/": [{ text: "API", items: [{ text: "Overview", link: "/api/" }] }],
    },
    socialLinks: [
      { icon: "discord", link: "https://discord.gg/cCtqGbugwb" },
      { icon: "github", link: "https://github.com/giloushaker/nr-docs" },
    ],
    editLink: {
      pattern: "https://github.com/giloushaker/nr-docs/edit/master/:path",
      text: "Edit this page on GitHub",
    },
    search: { provider: "local" },
  },
});
