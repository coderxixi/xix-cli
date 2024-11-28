export default [  
  {
    path: '/en-US/index',
    // @ts-ignore
    component: () => import('/Users/coderxixi/study/github/varlet/packages/varlet-cli/.varlet/site/pc/pages/index/index.vue')
  },
  {
    path: '/zh-CN/index',
    // @ts-ignore
    component: () => import('/Users/coderxixi/study/github/varlet/packages/varlet-cli/.varlet/site/pc/pages/index/index.vue')
  },
  {
    path: '/layout',
    // @ts-ignore
    component:()=> import('/Users/coderxixi/study/github/varlet/packages/varlet-cli/.varlet/site/pc/Layout.vue'),
    children: [
      
      {
        path: '/en-US/component-name',
        // @ts-ignore
        component: () => import('/Users/coderxixi/study/github/varlet/packages/varlet-cli/src/component-name/docs/en-US.md')
      },
      {
        path: '/zh-CN/component-name',
        // @ts-ignore
        component: () => import('/Users/coderxixi/study/github/varlet/packages/varlet-cli/src/component-name/docs/zh-CN.md')
      },,
    ]
  }
]