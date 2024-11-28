import { defineConfig } from "./xixi.config.mjs";
var stdin_default = defineConfig({
  name: "Xixi",
  namespace: "Xi",
  host: "localhost",
  port: 8080,
  title: "Xixi",
  logo: "Xixi_icon.png",
  defaultLanguage: "zh-CN",
  themeKey: "Xixi_V3_THEME",
  defaultLightTheme: "md3LightTheme",
  defaultDarkTheme: "md3DarkTheme",
  useMobile: false,
  _cf: ["pages.dev", "Xixijs.org"],
  analysis: { baidu: "" },
  pc: {
    title: {
      "zh-CN": "XIXIUI - Vue3 Material Design \u7EC4\u4EF6\u5E93",
      "en-US": "XIXI UI - Vue3 Material Design Component Library"
    },
    menu: [],
    redirect: "/index",
    indexPage: {
      description: {
        "zh-CN": "Xixi UI \u662F\u4E00\u4E2A\u57FA\u4E8E Vue3 \u5F00\u53D1\u7684 Material Design \u7EC4\u4EF6\u5E93\uFF0C\u5168\u9762\u62E5\u62B1 Vue3 \u751F\u6001\uFF0C\u652F\u6301\u79FB\u52A8\u7AEF\u548C\u684C\u9762\u7AEF\uFF0C\u7531 Xixijs \u7EC4\u7EC7\u7EF4\u62A4\u3002\u652F\u6301 Typescript\u3001\u6309\u9700\u5F15\u5165\u3001\u6697\u9ED1\u6A21\u5F0F\u3001\u4E3B\u9898\u5B9A\u5236\u3001\u56FD\u9645\u5316\uFF0C\u5E76\u63D0\u4F9B VSCode \u63D2\u4EF6\u4FDD\u969C\u826F\u597D\u7684\u5F00\u53D1\u4F53\u9A8C\u3002",
        "en-US": "Xixi UI is a Material design component library developed based on Vue3, supporting mobile and desktop, developed and maintained by Xixijs organization. Support Typescript, import on demand, dark mode, theme customization, internationalization, and provide VSCode plugin to ensure a good development experience."
      },
      started: {
        "zh-CN": "\u5FEB\u901F\u5F00\u59CB",
        "en-US": "Get Started"
      },
      viewOnGithub: {
        "zh-CN": "\u67E5\u770B\u6E90\u7801",
        "en-US": "View On Github"
      },
      features: [
        {
          name: {
            "zh-CN": "\u7EC4\u4EF6\u4E30\u5BCC",
            "en-US": "Rich components"
          },
          description: {
            "zh-CN": "\u63D0\u4F9B 60+ \u4E2A\u9AD8\u8D28\u91CF\u901A\u7528\u7EC4\u4EF6",
            "en-US": "Provide 60+ high quality general purpose components"
          }
        },
        {
          name: {
            "zh-CN": "\u6309\u9700\u5F15\u5165",
            "en-US": "On-Demand"
          },
          description: {
            "zh-CN": "\u6BCF\u4E00\u4E2A\u7EC4\u4EF6\u90FD\u53EF\u5355\u72EC\u5F15\u5165\uFF0C\u5E76\u6709\u7740\u826F\u597D\u7684 tree-shaking \u4F18\u5316",
            "en-US": "Each component can be imported separately and has good tree-shaking optimization"
          }
        },
        {
          name: {
            "zh-CN": "\u4E3B\u9898\u5B9A\u5236",
            "en-US": "Theme customization"
          },
          description: {
            "zh-CN": "\u5185\u7F6E\u4EAE\u8272\u548C\u6697\u8272\u4E24\u79CD\u4E3B\u9898\uFF0C\u652F\u6301\u7EC4\u4EF6\u7684\u6837\u5F0F\u81EA\u5B9A\u4E49",
            "en-US": "Built-in light and dark themes, support style customization of components"
          }
        },
        {
          name: {
            "zh-CN": "\u56FD\u9645\u5316",
            "en-US": "Locale"
          },
          description: {
            "zh-CN": "\u5185\u7F6E\u56FD\u9645\u5316 API\uFF0C\u5185\u7F6E\u4E2D\u6587\u548C\u82F1\u6587\u7684\u8BED\u8A00\u5305",
            "en-US": "Built-in i18n API, which supports both Chinese and English languages by default"
          }
        },
        {
          name: {
            "zh-CN": "\u652F\u6301 Typescript",
            "en-US": "Support typescript"
          },
          description: {
            "zh-CN": "\u4F7F\u7528 Typescript \u6784\u5EFA\uFF0C\u63D0\u4F9B\u826F\u597D\u7684\u7EC4\u4EF6\u7C7B\u578B\u7CFB\u7EDF",
            "en-US": "Built with typescript, which provides a nice components type system"
          }
        },
        {
          name: {
            "zh-CN": "\u670D\u52A1\u7AEF\u6E32\u67D3",
            "en-US": "Server-side rendering"
          },
          description: {
            "zh-CN": "\u5BF9\u670D\u52A1\u7AEF\u6E32\u67D3\u652F\u6301\u826F\u597D\uFF0C\u5E76\u5BF9 Nuxt \u8FDB\u884C\u4E86\u9002\u914D",
            "en-US": "Good support for server-side rendering and adaptation to Nuxt"
          }
        },
        {
          name: {
            "zh-CN": "\u56FD\u4EBA\u5F00\u53D1",
            "en-US": "Developed by Chinese"
          },
          description: {
            "zh-CN": "\u7531\u56FD\u4EBA\u5F00\u53D1\uFF0C\u5B8C\u5584\u7684\u4E2D\u82F1\u6587\u6587\u6863\u548C\u540E\u52E4\u4FDD\u969C",
            "en-US": "Complete Chinese and English documentation and logistics support"
          }
        },
        {
          name: {
            "zh-CN": "IDE \u652F\u6301",
            "en-US": "IDE Code Support"
          },
          description: {
            "zh-CN": "\u652F\u6301\u5728 webstorm\uFF0Cvscode \u4E2D\u7684\u7EC4\u4EF6\u8BED\u6CD5\u9AD8\u4EAE, \u5E76\u63D0\u4F9B vscode \u63D2\u4EF6\u4E3A\u5F00\u53D1\u63D0\u5347\u6548\u7387",
            "en-US": "Supports to highlight the component syntax for webstorm and vscode, and provides a separate helper plugin for vscode"
          }
        },
        {
          name: {
            "zh-CN": "\u7EC4\u4EF6\u5E93\u5FEB\u901F\u6210\u578B\u5DE5\u5177",
            "en-US": "Component library toolchain"
          },
          description: {
            "zh-CN": "\u5F00\u6E90\u4E86\u642D\u5EFA\u672C\u7EC4\u4EF6\u5E93\u7684\u6240\u6709\u5DE5\u5177\u94FE\uFF0C\u63D0\u4F9B\u5FEB\u901F\u5F00\u53D1\u7EC4\u4EF6\u5E93\u7684\u80FD\u529B",
            "en-US": "Open-sourced the toolchain for building this component library, providing the ability to rapidly develop the component library"
          }
        }
      ],
      teamMembers: {
        label: {
          "zh-CN": "\u56E2\u961F\u6210\u5458",
          "en-US": "Team Members"
        },
        members: [
          {
            name: {
              "zh-CN": "haoziqaq",
              "en-US": "haoziqaq"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u6838\u5FC3\u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/24223652",
            github: "https://github.com/haoziqaq",
            twitter: "https://twitter.com/haozijunqaq"
          },
          {
            name: {
              "zh-CN": "BeADre",
              "en-US": "BeADre"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u6838\u5FC3\u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/34639100",
            github: "https://github.com/BeADre"
          },
          {
            name: {
              "zh-CN": "zhangmo8",
              "en-US": "zhangmo8"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs & ikun-ui \u6838\u5FC3\u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs & ikun-ui"
            },
            avatar: "https://avatars.githubusercontent.com/u/43628500",
            github: "https://github.com/zhangmo8",
            twitter: "https://twitter.com/wegi8666"
          },
          {
            name: {
              "zh-CN": "chouchouji",
              "en-US": "chouchouji"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u6838\u5FC3\u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/70570907",
            github: "https://github.com/chouchouji"
          },
          {
            name: {
              "zh-CN": "tiny-dust",
              "en-US": "tiny-dust"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u6838\u5FC3\u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/49502875",
            github: "https://github.com/tiny-dust"
          },
          {
            name: {
              "zh-CN": "songjianet",
              "en-US": "songjianet"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs & apache & w3c & naiveui & ikun-ui \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs & apache & w3c & naiveui & ikun-ui"
            },
            avatar: "https://avatars.githubusercontent.com/u/19239641",
            github: "https://github.com/songjianet",
            twitter: "https://twitter.com/songjianet"
          },
          {
            name: {
              "zh-CN": "running snail",
              "en-US": "running snail"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs & dcloud \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs & dcloud"
            },
            avatar: "https://avatars.githubusercontent.com/u/37523000",
            github: "https://github.com/zhenyuWang"
          },
          {
            name: {
              "zh-CN": "qytayh",
              "en-US": "qytayh"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/39668309",
            github: "https://github.com/qytayh"
          },
          {
            name: {
              "zh-CN": "Erkelost",
              "en-US": "Erkelost"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs & unplugin & farm & devui & wujie \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs & unplugin & farm & devui & wujie"
            },
            avatar: "https://avatars.githubusercontent.com/u/66500121",
            github: "https://github.com/ErKeLost"
          },
          {
            name: {
              "zh-CN": "EmberSpirit",
              "en-US": "EmberSpirit"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/85718018",
            github: "https://github.com/wangKBweb"
          },
          {
            name: {
              "zh-CN": "ayangweb",
              "en-US": "ayangweb"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005 & B \u7AD9 UP \u4E3B",
              "en-US": "Open Source Developer & Bilibili UP"
            },
            description: {
              "zh-CN": "Xixijs \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/75017711",
            github: "https://github.com/ayangweb"
          },
          {
            name: {
              "zh-CN": "jiechen66",
              "en-US": "jiechen66"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/42862411",
            github: "https://github.com/jiechen66"
          },
          {
            name: {
              "zh-CN": "dyggod",
              "en-US": "dyggod"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/49914353",
            github: "https://github.com/dyggod"
          },
          {
            name: {
              "zh-CN": "clen cat",
              "en-US": "clen cat"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/37403253",
            github: "https://github.com/a145789"
          },
          {
            name: {
              "zh-CN": "gaoting",
              "en-US": "gaoting"
            },
            title: {
              "zh-CN": "\u5F00\u6E90\u5F00\u53D1\u8005",
              "en-US": "Open Source Developer"
            },
            description: {
              "zh-CN": "Xixijs \u56E2\u961F\u6210\u5458",
              "en-US": "Core team member of Xixijs"
            },
            avatar: "https://avatars.githubusercontent.com/u/7401170",
            github: "https://github.com/gaoting"
          }
        ]
      },
      contributors: {
        label: {
          "zh-CN": "\u8D21\u732E\u8005",
          "en-US": "Contributors"
        },
        link: "https://github.com/Xixijs/Xixi/graphs/contributors",
        image: "https://contrib.rocks/image?repo=Xixijs/Xixi"
      },
      sponsors: {
        label: {
          "zh-CN": "\u8D5E\u52A9\u8005",
          "en-US": "Sponsors"
        },
        link: "https://cdn.jsdelivr.net/gh/Xixijs/Xixi-static/sponsorkit/sponsors.svg",
        image: "https://cdn.jsdelivr.net/gh/Xixijs/Xixi-static/sponsorkit/sponsors.svg"
      },
      license: {
        "zh-CN": "\u7EC4\u4EF6\u5E93\u57FA\u4E8E MIT \u534F\u8BAE\uFF0C\u60A8\u53EF\u4EE5\u81EA\u7531\u7684\u4F7F\u7528\u548C\u5206\u4EAB",
        "en-US": "Released under the MIT License, You can use and share freely."
      },
      copyright: {
        "zh-CN": "Copyright \xA9 2022 Xixijs \u7EC4\u7EC7\u6210\u5458\u4EE5\u53CA Xixi \u7684\u8D21\u732E\u8005\u4EEC",
        "en-US": "Copyright \xA9 2022 Xixijs member and Xixi contributors."
      }
    },
    header: {
      i18n: {
        "zh-CN": "\u4E2D\u6587",
        "en-US": "English"
      },
      currentVersion: "v3.x",
      versions: [
        {
          name: "Xixijs.org",
          items: [
            {
              label: "v3.x",
              link: "https://Xixijs.org"
            },
            {
              label: "v2.x",
              link: "https://Xixijs.org/v2"
            }
          ]
        },
        {
          name: "Xixi.pages.dev",
          items: [
            {
              label: "v3.x",
              link: "https://Xixi.pages.dev"
            },
            {
              label: "v2.x",
              link: "https://Xixi.pages.dev/v2"
            }
          ]
        },
        {
          name: "Xixijs.vercel.app",
          items: [
            {
              label: "v3.x",
              link: "https://Xixi-Xixijs.vercel.app"
            },
            {
              label: "v2.x",
              link: "https://Xixi-git-v2x-Xixijs.vercel.app"
            }
          ]
        }
      ],
      github: "https://github.com/Xixijs/Xixi",
      changelog: "https://github.com/Xixijs/Xixi/blob/main/CHANGELOG.md",
      playground: "https://Xixijs.org/playground",
      themes: [
        { "zh-CN": "Md2 \u4EAE\u8272", "en-US": "Md2 Light", value: "lightTheme" },
        { "zh-CN": "Md2 \u6697\u8272", "en-US": "Md2 Dark", value: "darkTheme" },
        { "zh-CN": "Md3 \u4EAE\u8272", "en-US": "Md3 Light", value: "md3LightTheme" },
        { "zh-CN": "Md3 \u6697\u8272", "en-US": "Md3 Dark", value: "md3DarkTheme" }
      ]
    },
    clipboard: {
      "zh-CN": "\u4EE3\u7801\u5DF2\u590D\u5236\u5230\u526A\u5207\u677F",
      "en-US": "The code has been copied to the clipboard"
    },
    fold: {
      defaultFold: false,
      foldHeight: 50
    },
    htmlInject: {
      head: [],
      body: []
    }
  },
  mobile: {
    title: {
      "zh-CN": "Xixi UI - Vue3 Material Design \u7EC4\u4EF6\u5E93",
      "en-US": "Xixi UI - Vue3 Material Design Component Library"
    },
    redirect: "/home",
    header: {
      i18n: {
        "zh-CN": "\u4E2D\u6587",
        "en-US": "English"
      },
      github: "https://github.com/Xixijs/Xixi",
      themes: [
        { "zh-CN": "Md2 \u4EAE\u8272", "en-US": "Md2 Light", value: "lightTheme" },
        { "zh-CN": "Md2 \u6697\u8272", "en-US": "Md2 Dark", value: "darkTheme" },
        { "zh-CN": "Md3 \u4EAE\u8272", "en-US": "Md3 Light", value: "md3LightTheme" },
        { "zh-CN": "Md3 \u6697\u8272", "en-US": "Md3 Dark", value: "md3DarkTheme" }
      ]
    },
    htmlInject: {
      head: [],
      body: []
    }
  },
  seo: {
    title: "Xixi UI - Vue3 Material Design Component Library",
    description: "Xixi UI is a Material design component library developed based on Vue3, supporting mobile and desktop, developed and maintained by Xixijs organization. Support Typescript, import on demand, dark mode, theme customization, internationalization, and provide VSCode plugin to ensure a good development experience.",
    keywords: [
      "Xixi",
      "Xixi UI",
      "Xixi",
      "Xixi-ui",
      "UI",
      "Vue3 Mobile Components Library",
      "Material Design 2",
      "Material Design 3",
      "Mobile",
      "Desktop",
      "Provide 60+ high quality general purpose components",
      "Components are very lightweight",
      "Developed by Chinese, complete Chinese and English documentation and logistics support",
      "Support on-demand introduction",
      "Support theme customization",
      "Support internationalization",
      "Support WebStorm syntax highlighting",
      "Support the SSR",
      "Support Nuxt Module",
      "Support the Typescript",
      "Make sure more than 90 percent unit test coverage, providing stability assurance",
      "Supports both Material Design 2 and Material Design 3 design systems",
      "Support dark mode",
      "Provide official VSCode extension",
      "Support Accessibility (still improving)",
      "Vue3 \u7EC4\u4EF6\u5E93",
      "\u79FB\u52A8\u7AEF",
      "\u684C\u9762\u7AEF",
      "\u63D0\u4F9B 60+ \u4E2A\u9AD8\u8D28\u91CF\u901A\u7528\u7EC4\u4EF6",
      "\u7EC4\u4EF6\u5341\u5206\u8F7B\u91CF",
      "\u7531\u56FD\u4EBA\u5F00\u53D1\uFF0C\u5B8C\u5584\u7684\u4E2D\u82F1\u6587\u6587\u6863\u548C\u540E\u52E4\u4FDD\u969C",
      "\u652F\u6301\u6309\u9700\u5F15\u5165",
      "\u652F\u6301\u4E3B\u9898\u5B9A\u5236",
      "\u652F\u6301\u56FD\u9645\u5316",
      "\u652F\u6301 webstorm \u7EC4\u4EF6\u5C5E\u6027\u9AD8\u4EAE",
      "\u652F\u6301 SSR",
      "\u652F\u6301 Nuxt Module",
      "\u652F\u6301 Typescript",
      "\u63D0\u4F9B\u5B98\u65B9\u7684 VSCode \u63D2\u4EF6",
      "\u652F\u6301\u65E0\u969C\u788D\u8BBF\u95EE\uFF08\u6301\u7EED\u6539\u8FDB\u4E2D\uFF09"
    ].join(",")
  },
  lightTheme: {
    "color-body": "#fff",
    "color-index-page-background": "#fff",
    "color-index-page-get-started-button": "#3a7afe",
    "color-index-page-logo-mask-background": "linear-gradient(-45deg, #8baff8 50%, #84e0ff 50%)",
    "color-index-page-second-text-color": "rgba(60, 60, 60, .7)",
    "color-index-page-divider-color": "#ddd",
    "card-border-radius": "12px",
    "code-example-border-radius": "8px",
    "color-bar": "#fff",
    "color-text": "#555",
    "color-sub-text": "#888",
    "color-border": "rgba(0, 0, 0, 0.12)",
    "color-shadow": "#eee",
    "color-introduce-border": "#2196f3",
    "color-primary": "#2196f3",
    "color-link": "#00c48f",
    "color-type": "#00c48f",
    "color-loading-bar": "#1d92e9",
    "color-side-bar": "#3a7afe",
    "color-side-bar-active-background": "#3a7afe1a",
    "color-app-bar": "#3a7afe",
    "color-nav-button-hover-background": "rgba(0, 0, 0, 0.08)",
    "color-mobile-cell-hover": "#3a7afe",
    "color-pc-language-active": "#3a7afe",
    "color-pc-language-active-background": "#edf5ff",
    "color-mobile-language-active": "#3a7afe",
    "color-mobile-language-active-background": "#edf5ff",
    "color-pc-theme-active": "#3a7afe",
    "color-pc-theme-active-background": "#edf5ff",
    "color-mobile-theme-active": "#3a7afe",
    "color-mobile-theme-active-background": "#edf5ff",
    "color-mobile-body": "#fff",
    "color-hl-background": "#fafafa",
    "color-hl-code": "#58727e",
    "color-hl-border": "#f3f3f3",
    "color-hl-group-a": "#7c7c7c",
    "color-hl-group-b": "#2196f3",
    "color-hl-group-c": "#ff9422",
    "color-hl-group-d": "#58c193",
    "color-hl-group-e": "#ff9422",
    "color-hl-group-f": "#ff9422",
    "color-hl-group-g": "#ff9422",
    "color-hl-group-h": "#06a6e9",
    "color-hl-group-i": "#2196f3"
  },
  darkTheme: {
    "color-body": "#121212",
    "color-index-page-background": "#1e1e1e",
    "color-index-page-feature-background": "#303030",
    "color-index-page-logo-mask-background": "linear-gradient(-45deg, #729dfc 50%, #6859f4 50%)",
    "color-index-page-second-text-color": "rgba(255, 255, 255, .75)",
    "color-index-page-divider-color": "rgba(84, 84, 84, .8)",
    "card-border-radius": "12px",
    "code-example-border-radius": "8px",
    "color-bar": "#1e1e1e",
    "color-text": "#fff",
    "color-sub-text": "#aaa",
    "color-border": "#333",
    "color-shadow": "#121212",
    "color-introduce-border": "#555",
    "color-primary": "#96cbfe",
    "color-link": "#A8FFC4",
    "color-type": "#A8FFC4",
    "color-loading-bar": "#5580f8",
    "color-side-bar": "#4a7afe",
    "color-side-bar-active-background": "#4a7afe1a",
    "color-app-bar": "#272727",
    "color-nav-button-hover-background": "rgba(255, 255, 255, 0.08)",
    "color-mobile-cell-hover": "#4a7afe",
    "color-pc-language-active": "#4a7afe",
    "color-pc-language-active-background": "#4a7afe20",
    "color-mobile-language-active": "#4a7afe",
    "color-mobile-language-active-background": "#4a7afe20",
    "color-pc-theme-active": "#4a7afe",
    "color-pc-theme-active-background": "#4a7afe20",
    "color-mobile-theme-active": "#4a7afe",
    "color-mobile-theme-active-background": "#4a7afe20",
    "color-mobile-body": "#1e1e1e",
    "color-hl-background": "#272727",
    "color-hl-code": "#fff",
    "color-hl-border": "#272727",
    "color-hl-group-a": "#7c7c7c",
    "color-hl-group-b": "#96cbfe",
    "color-hl-group-c": "#ff7b1e",
    "color-hl-group-d": "#A8FFC4",
    "color-hl-group-e": "#ff7b1e",
    "color-hl-group-f": "#ff7b1e",
    "color-hl-group-g": "#ff7b1e",
    "color-hl-group-h": "#14a6e9",
    "color-hl-group-i": "#96cbfe"
  },
  md3LightTheme: {
    "color-body": "#fff",
    "color-index-page-background": "#fff",
    "color-index-page-feature-background": "#fff",
    "color-index-page-logo-mask-background": "linear-gradient(-45deg, #8baff8 50%, #84e0ff 50%)",
    "color-index-page-second-text-color": "rgba(60, 60, 60, .7)",
    "color-index-page-divider-color": "#ddd",
    "card-border-radius": "12px",
    "code-example-border-radius": "8px",
    "color-bar": "#fff",
    "color-text": "#555",
    "color-sub-text": "#888",
    "color-border": "rgba(0, 0, 0, 0.12)",
    "color-shadow": "#eee",
    "color-introduce-border": "#6750A4",
    "color-primary": "#6750A4",
    "color-link": "#536525",
    "color-type": "#536525",
    "color-loading-bar": "#6750A4",
    "color-side-bar": "#6750A4",
    "color-side-bar-active-background": "#E8DEF8",
    "color-app-bar": "#6750A4",
    "color-nav-button-hover-background": "rgba(0, 0, 0, 0.08)",
    "color-mobile-cell-hover": "#6750A4",
    "color-pc-language-active": "#6750A4",
    "color-pc-language-active-background": "#E8DEF8",
    "color-mobile-language-active": "#6750A4",
    "color-mobile-language-active-background": "#E8DEF8",
    "color-pc-theme-active": "#6750A4",
    "color-pc-theme-active-background": "#E8DEF8",
    "color-mobile-theme-active": "#6750A4",
    "color-mobile-theme-active-background": "#E8DEF8",
    "color-mobile-body": "#FEF7FF",
    "color-hl-background": "#fafafa",
    "color-hl-code": "#58727e",
    "color-hl-border": "#f3f3f3",
    "color-hl-group-a": "#7c7c7c",
    "color-hl-group-b": "#6750A4",
    "color-hl-group-c": "#7D5260",
    "color-hl-group-d": "#B3261E",
    "color-hl-group-e": "#7D5260",
    "color-hl-group-f": "#7D5260",
    "color-hl-group-g": "#7D5260",
    "color-hl-group-h": "#633B48",
    "color-hl-group-i": "#633B48"
  },
  md3DarkTheme: {
    "color-body": "#050505",
    "color-index-page-background": "#1e1e1e",
    "color-index-page-feature-background": "#303030",
    "color-index-page-logo-mask-background": "linear-gradient(-45deg, #729dfc 50%, #6859f4 50%)",
    "color-index-page-second-text-color": "rgba(255, 255, 255, .75)",
    "color-index-page-divider-color": "rgba(84, 84, 84, .8)",
    "card-border-radius": "12px",
    "code-example-border-radius": "8px",
    "color-bar": "#1e1e1e",
    "color-text": "#fff",
    "color-sub-text": "#aaa",
    "color-border": "#333",
    "color-shadow": "#090909",
    "color-introduce-border": "#555",
    "color-primary": "#D0BCFF",
    "color-link": "#BACF83",
    "color-type": "#BACF83",
    "color-loading-bar": "#D0BCFF",
    "color-side-bar": "#D0BCFF",
    "color-side-bar-active-background": "#4A4458",
    "color-app-bar": "#211F26",
    "color-nav-button-hover-background": "rgba(255, 255, 255, 0.08)",
    "color-mobile-cell-hover": "#D0BCFF",
    "color-pc-language-active": "#D0BCFF",
    "color-pc-language-active-background": "#4A4458",
    "color-mobile-language-active": "#D0BCFF",
    "color-mobile-language-active-background": "#4A4458",
    "color-pc-theme-active": "#D0BCFF",
    "color-pc-theme-active-background": "#4A4458",
    "color-mobile-theme-active": "#D0BCFF",
    "color-mobile-theme-active-background": "#4A4458",
    "color-mobile-body": "#141218",
    "color-hl-background": "#272727",
    "color-hl-code": "#fff",
    "color-hl-border": "#272727",
    "color-hl-group-a": "#7c7c7c",
    "color-hl-group-b": "#D0BCFF",
    "color-hl-group-c": "#EFB8C8",
    "color-hl-group-d": "#F2B8B5",
    "color-hl-group-e": "#EFB8C8",
    "color-hl-group-f": "#EFB8C8",
    "color-hl-group-g": "#EFB8C8",
    "color-hl-group-h": "#EFB8C8",
    "color-hl-group-i": "#EFB8C8"
  },
  icons: {
    name: "Xixi-icons",
    namespace: "var-icon",
    fontStyle: "normal",
    fontWeight: "normal",
    fontFamilyClassName: "var-icon--set",
    base64: true
  },
  esbuild: {
    target: "es2016"
  },
  directives: []
});
export {
  stdin_default as default
};
