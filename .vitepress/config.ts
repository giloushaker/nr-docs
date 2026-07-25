import { defineConfig } from "vitepress";

export default defineConfig({
  title: "NewRecruit Docs",
  description:
    "Documentation for creating and publishing game data for NewRecruit",
  // Served at https://<user>.github.io/nr-docs/. For a custom domain or a
  // user/org root site, change this to "/".
  base: "/nr-docs/",
  srcExclude: ["research/**", "README.md"],
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
            { text: "Scope & Context", link: "/guide/concepts/scope" },
            { text: "Links & Shared Entries", link: "/guide/concepts/links" },
            { text: "Profiles & Rules", link: "/guide/concepts/profiles" },
            { text: "Conditions", link: "/guide/concepts/conditions" },
            { text: "Constraints", link: "/guide/concepts/constraints" },
            { text: "Modifiers", link: "/guide/concepts/modifiers" },
            { text: "Associations", link: "/guide/concepts/associations" },
            { text: "Collective", link: "/guide/concepts/collective" },
            {
              text: "In-text References",
              link: "/guide/concepts/in-text-references",
            },
            { text: "Known Limitations", link: "/guide/limitations" },
          ],
        },
        {
          text: "Recipes",
          items: [
            { text: "Overview", link: "/guide/recipes/" },
            {
              text: "Points that scale per model",
              link: "/guide/recipes/points-per-model",
            },
            { text: "Weapon options", link: "/guide/recipes/weapon-options" },
            {
              text: "Optional squad models",
              link: "/guide/recipes/optional-models",
            },
            {
              text: "Show or hide an option",
              link: "/guide/recipes/conditional-options",
            },
            {
              text: "Sub-factions and allegiances",
              link: "/guide/recipes/sub-factions",
            },
            { text: "Army-wide limits", link: "/guide/recipes/army-limits" },
            { text: "Child forces", link: "/guide/recipes/child-forces" },
            {
              text: "Reuse a mount across characters",
              link: "/guide/recipes/shared-mounts",
            },
          ],
        },
        {
          text: "Advanced",
          items: [
            { text: "Sorting", link: "/guide/advanced/sorting" },
            { text: "Editor Scripts", link: "/guide/advanced/scripts" },
            {
              text: "Custom Export Templates",
              link: "/guide/advanced/export-templates",
            },
          ],
        },
        {
          text: "Publishing",
          items: [
            { text: "Publishing Your Data", link: "/guide/publishing" },
            { text: "Best Practices", link: "/guide/best-practices" },
            { text: "Troubleshooting", link: "/guide/troubleshooting" },
          ],
        },
        {
          text: "Reference",
          items: [
            { text: "Supported Systems", link: "/guide/reference/supported-systems" },
            { text: "BSData Repositories", link: "/guide/reference/bsdata-repos" },
          ],
        },
      ],
      "/api/": [{ text: "API", items: [{ text: "Overview", link: "/api/" }] }],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/giloushaker/nr-editor" },
    ],
    search: { provider: "local" },
  },
});
