import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    id: 1,
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: '主页'
    },
    children: [{
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '主页',
        icon: 'home',
        id: 2
      }
    }]
  },


  {
    path: '/orderManagement',
    component: Layout,
    redirect: 'tradeOrder',
    // component: () => import('@/views/AccoubtVipDetails'),
    meta: {
      title: '订单管理',
      icon: 'shop',
      id: 3
    },
    hidden: false,
    children: [

      {
        path: '/orderManagement',
        name: 'orderManagement',
        component: () => import('@/views/orderManagement/tradeOrder'),
        meta: {
          title: '交易订单',
          icon: 'shop',
          id: 4
        }

      },
      {
        path: '/orderManagement/refundApplication',
        name: 'refundApplication',
        component: () => import('@/views/orderManagement/refundApplication'),
        meta: {
          title: '商户退款申请',
          icon: 'shop',
          id: 4
        },

      },
      {
        path: '/orderManagement/tradeLog',
        name: 'tradeLog',
        component: () => import('@/views/orderManagement/tradeLog'),
        meta: {
          title: '批量补单',
          icon: 'shop',
          id: 4
        }

      },

      {
        path: '/orderManagement/tradeTrack',
        name: 'tradeTrack',
        component: () => import('@/views/orderManagement/tradeTrack'),
        meta: {
          title: '交易跟踪',
          icon: 'shop',
          id: 4
        }

      },



      {
        path: '/orderManagement/refundCheck',
        name: 'refundCheck',
        component: () => import('@/views/orderManagement/refundCheck'),
        meta: {
          title: '批量勾兑',
          icon: 'shop',
          id: 4
        }

      },

      {
        path: '/orderManagement/tradeChange',
        name: 'tradeChange',
        component: () => import('@/views/orderManagement/tradeChange'),
        meta: {
          title: '交易变更',
          icon: 'shop',
          id: 4
        }

      }


    ]
  },

  {
    path: '/riskManagement',
    component: Layout,
    redirect: 'ruleSets',
    // component: () => import('@/views/AccoubtVipDetails'),
    meta: {
      title: '风控管理',
      icon: 'eye',
      id: 1
    },
    hidden: false,
    children: [{
        path: '/ruleSets',
        name: 'ruleSets',
        component: () => import('@/views/riskManagement/ruleSets'),
        meta: {
          title: '规则集合',
          icon: 'eye',
          id: 2
        }

      },
      {
        path: '/riskManagement/rulesManagement',
        name: 'rulesManagement',
        component: () => import('@/views/riskManagement/rulesManagement'),
        meta: {
          title: '规则管理',
          icon: 'eye',
          id: 2
        }

      },
      {
        path: '/riskManagement/rulesParameter',
        name: 'rulesParameter',
        component: () => import('@/views/riskManagement/rulesParameter'),
        meta: {
          title: '规则参数',
          icon: 'eye',
          id: 2
        }

      },
      {
        path: '/riskManagement/MerchantRules',
        name: 'MerchantRules',
        component: () => import('@/views/riskManagement/MerchantRules'),
        meta: {
          title: '商户规则',
          icon: 'eye',
          id: 2
        }

      },

      {
        path: '/riskManagement/ban',
        name: 'ban',
        component: () => import('@/views/riskManagement/ban'),
        meta: {
          title: 'ban',
          icon: 'eye',
          id: 2
        }

      },
      // {
      //   path: '/riskManagement/whiteList',
      //   name: 'whiteList',
      //   component: () => import('@/views/riskManagement/whiteList'),
      //   meta: {title: '白名单', icon: 'eye', id: 2},

      // },
      // {
      //   path: '/riskManagement/maxMind',
      //   name: 'maxMind',
      //   component: () => import('@/views/riskManagement/maxMind'),
      //   meta: {title: 'MaxMind', icon: 'eye', id: 2},

      // },
      {
        path: '/riskManagement/blackList',
        name: 'blackList',
        component: () => import('@/views/riskManagement/blackList'),
        meta: {
          title: '黑名单',
          icon: 'eye',
          id: 2
        }

      }

    ]
  },
  {
    path: '/merchantManagement',
    component: Layout,
    redirect: 'index',


    meta: {
      title: '商户管理',
      icon: 'huiyuan1',
      id: 1
    },
    children: [{
        path: '/merchantManagement',
        name: 'merchantManagement',
        component: () => import('@/views/merchantManagement/index'),
        meta: {
          title: '商户管理',
          icon: 'huiyuan1',
          id: 2
        }
      },
      // {
      //   path: '/merchantManagement/terminalManagement',
      //   name: 'terminalManagement',
      //   component: () => import('@/views/merchantManagement/terminalManagement'),
      //   meta: {title: '终端管理', icon: 'huiyuan1', id: 2}
      // },
      {
        path: '/merchantManagement/userManagement',
        name: 'userManagement',
        component: () => import('@/views/merchantManagement/userManagement'),
        meta: {
          title: '商户管理员',
          icon: 'huiyuan1',
          id: 2
        }
      },
      {
        path: '/merchantManagement/accountingRate',
        name: 'accountingRate',
        component: () => import('@/views/merchantManagement/accountingRate'),
        meta: {
          title: '结算费率',
          icon: 'huiyuan1',
          id: 2
        }
      },
      {
        path: '/merchantManagement/announcement',
        name: 'announcement',
        component: () => import('@/views/merchantManagement/announcement'),
        meta: {
          title: '商户标签',
          icon: 'huiyuan1',
          id: 2
        }
      },
      {
        path: '/merchantManagement/TransactionalWebsite',
        name: 'TransactionalWebsite',
        component: () => import('@/views/merchantManagement/TransactionalWebsite'),
        meta: {
          title: '交易网站',
          icon: 'huiyuan1',
          id: 2
        }
      }

    ]
  },
  {
    path: '/productManagement',
    component: Layout,
    redirect: 'index',
    meta: {
      title: '网关通道合集',
      icon: 'WithdrawDeposit',
      id: 3
    },
    children: [{
        path: '/productManagement',
        name: 'productManagement',
        component: () => import('@/views/productManagement/index'),
        meta: {
          title: '通道管理',
          icon: 'WithdrawDeposit',
          id: 4
        }
      }, {
        path: '/agentMananement',
        name: 'agentMananement',
        component: () => import('@/views/productManagement/agentMananement'),
        meta: {
          title: '代理商管理',
          icon: 'WithdrawDeposit',
          id: 4
        }
      },
      {
        path: '/blacklist',
        name: 'blacklist',
        component: () => import('@/views/productManagement/blacklist'),
        meta: {
          title: '黑名单管理',
          icon: 'WithdrawDeposit',
          id: 4
        }
      }

    ]
  },
  {
    path: '/bankManagement',
    component: Layout,
    redirect: 'index',
    meta: {
      title: '银行管理',
      icon: 'WithdrawDeposit',
      id: 3
    },
    children: [{
        path: '/bankManagement',
        name: 'bankManagement',
        component: () => import('@/views/bankManagement/index'),
        meta: {
          title: '银行管理',
          icon: 'table',
          id: 4
        }
      },

      {
        path: '/bankManagement/channelManagement',
        name: 'channelManagement',
        component: () => import('@/views/bankManagement/channelManagement'),
        meta: {
          title: '通道管理',
          icon: 'table',
          id: 4
        }
      }
      // {
      //   path: '/bankManagement/paymentPage',
      //   name: 'paymentPage',
      //   component: () => import('@/views/bankManagement/paymentPage'),
      //   meta: {title: '通道管理', icon: 'table', id: 4}
      // },

    ]
  },

  {
    path: '/exchangeRateManagement',
    component: Layout,
    redirect: 'chinaCurrency',
    meta: {
      title: '汇率管理',
      icon: 'jiaoyi1',
      id: 3
    },
    children: [{
        path: '/chinaCurrency',
        name: 'chinaCurrency',
        component: () => import('@/views/exchangeRateManagement/chinaCurrency'),
        meta: {
          title: '中行汇率',
          icon: 'table',
          id: 4
        }
      },
      // {
      //   path: '/exchangeRateManagement/exchangeFluctuations',
      //   name: 'exchangeFluctuations',
      //   component: () => import('@/views/exchangeRateManagement/exchangeFluctuations'),
      //   meta: {title: '汇率趋', icon: 'table', id: 4}
      // },
      {
        path: '/exchangeRateManagement/otherExchangeRate',
        name: 'otherExchangeRate',
        component: () => import('@/views/exchangeRateManagement/otherExchangeRate'),
        meta: {
          title: '汇率组',
          icon: 'table',
          id: 4
        }
      },
      {
        path: '/exchangeRateManagement/exchangeRateCustomization',
        name: 'exchangeRateCustomization',
        component: () => import('@/views/exchangeRateManagement/exchangeRateCustomization'),
        meta: {
          title: '汇率定制',
          icon: 'table',
          id: 4
        }
      }

    ]
  },
  {
    path: '/settlementManagement',
    component: Layout,
    redirect: 'accountManagement',
    meta: {
      title: '结算管理',
      icon: 'jiaoyi1',
      id: 3
    },
    children: [{
        path: '/accountManagement',
        name: 'accountManagement',
        component: () => import('@/views/settlementManagement/accountManagement'),
        meta: {
          title: '账户管理',
          icon: 'jiaoyi1',
          id: 4
        }
      },
      {
        path: '/settlementManagement/eventOrder',
        name: 'eventOrder',
        component: () => import('@/views/settlementManagement/eventOrder'),
        meta: {
          title: '事件订单',
          icon: 'jiaoyi1',
          id: 4
        }
      },
      {
        path: '/settlementManagement/accountDetails_brief',
        name: 'accountDetails_brief',
        component: () => import('@/views/settlementManagement/accountDetails_brief'),
        meta: {
          title: '出入账明细',
          icon: 'jiaoyi1',
          id: 4
        }
      },
      // {
      //   path: '/settlementManagement/accountDetails_type',
      //   name: 'accountDetails_type',
      //   component: () => import('@/views/settlementManagement/accountDetails_type'),
      //   meta: {title: '出入账类型', icon: 'jiaoyi1', id: 4}
      // },
      // {
      //   path: '/settlementManagement/handcraftSettlement',
      //   name: 'handcraftSettlement',
      //   component: () => import('@/views/settlementManagement/handcraftSettlement'),
      //   meta: {title: '手工结算历史', icon: 'jiaoyi1', id: 4}
      // },
      {
        path: '/settlementManagement/accountDetails_detailed',
        name: 'accountDetails_detailed',
        component: () => import('@/views/settlementManagement/accountDetails_detailed'),
        meta: {
          title: '原始出入账明细',
          icon: 'jiaoyi1',
          id: 4
        }
      }
      // {
      //   path: '/settlementManagement/transactionReport',
      //   name: 'transactionReport',
      //   component: () => import('@/views/settlementManagement/transactionReport'),
      //   meta: {title: '交易报告', icon: 'jiaoyi1', id: 4}
      // },

    ]
  },
  // {
  //   path: '/mailManagement',
  //   component: Layout,
  //   redirect: 'mailAccount',
  //   meta: {title: '邮件管理', icon: 'table',id: 3},
  //   children: [
  //     {
  //       path: '/mailAccount',
  //       name: 'mailAccount',
  //       component: () => import('@/views/mailManagement/mailAccount'),
  //       meta: {title: '邮件账户', icon: 'table', id: 4}
  //     },
  //     {
  //       path: '/mailManagement/mailType',
  //       name: 'mailType',
  //       component: () => import('@/views/mailManagement/mailType'),
  //       meta: {title: '邮件类型', icon: 'table', id: 4}
  //     },
  //     {
  //       path: '/mailManagement/mailIncidental',
  //       name: 'mailIncidental',
  //       component: () => import('@/views/mailManagement/mailIncidental'),
  //       meta: {title: '邮件附带信息', icon: 'table', id: 4}
  //     },

  //   ]
  // },

  {
    path: '/withdrawManagement',
    component: Layout,
    redirect: ' withdrawAccount',
    meta: {
      title: '提现管理',
      icon: 'table',
      id: 3
    },
    children: [{
        path: '/withdrawList',
        name: 'withdrawList',
        component: () => import('@/views/withdrawManagement/withdrawList'),
        meta: {
          title: '提现列表',
          icon: 'table',
          id: 4
        }
      }

    ]
  },
  {
    path: '/statisticalManagement',
    component: Layout,
    redirect: 'transactionStatistics',
    meta: {
      title: '统计管理',
      icon: 'system',
      id: 3
    },
    children: [{

        path: '/statisticalManagement/transactionStatistics',
        name: 'transactionStatistics',
        component: () => import('@/views/statisticalManagement/transactionStatistics'),
        meta: {
          title: '商户统计',
          icon: 'table',
          id: 4
        }
      },
      {

        path: '/protestStatistics_analysis',
        name: 'protestStatistics_analysis',
        component: () => import('@/views/statisticalManagement/protestStatistics_analysis'),
        meta: {
          title: '渠道统计',
          icon: 'table',
          id: 4
        }
      }

      // {

      //   path: '/statisticalManagement/protestStatistics',
      //   name: 'protestStatistics',
      //   component: () => import('@/views/statisticalManagement/protestStatistics'),
      //   meta: {title: '拒付统计', icon: 'table', id: 4}
      // },

    ]
  },
  // {
  //   path: '/transactionMonitoring',
  //   component: Layout,
  //   redirect: 'transactionMonitoring_Merchant',
  //   meta: {title: '交易监控预警', icon: 'system',id: 3},
  //   children: [
  //     {
  //       path: '/transactionMonitoring_Merchant',
  //       name: 'transactionMonitoring_Merchant',
  //       component: () => import('@/views/transactionMonitoring/transactionMonitoring_Merchant'),
  //       meta: {title: '商户交易预警', icon: 'table', id: 4}
  //     },
  //     {
  //       path: '/transactionMonitoring_Bank',
  //       name: 'transactionMonitoring_Bank',
  //       component: () => import('@/views/transactionMonitoring/transactionMonitoring_Bank'),
  //       meta: {title: '银行交易预警', icon: 'table', id: 4}
  //     },

  //   ]
  // },
  {
    path: '/platformManagement',
    component: Layout,
    redirect: 'bankReturn',
    meta: {
      title: '系统管理',
      icon: 'system',
      id: 3
    },
    children: [{
        path: '/bankReturn',
        name: 'bankReturn',
        component: () => import('@/views/platformManagement/bankReturn'),
        meta: {
          title: '银行信息自定义返回',
          icon: 'system',
          id: 4
        }
      },
      {
        path: '/platformManagement/reasonManagement',
        name: 'reasonManagement',
        component: () => import('@/views/platformManagement/reasonManagement'),
        meta: {
          title: '公告管理',
          icon: 'system',
          id: 4
        }
      }
      // {
      //   path: '/platformManagement/cardBinManagement',
      //   name: 'cardBinManagement',
      //   component: () => import('@/views/platformManagement/cardBinManagement'),
      //   meta: {title: '卡Bin管理', icon: 'system', id: 4}
      // },
      // {
      //   path: '/platformManagement/cardTypeManagement',
      //   name: 'cardTypeManagement',
      //   component: () => import('@/views/platformManagement/cardTypeManagement'),
      //   meta: {title: '卡种管理', icon: 'system', id: 4}
      // },
      // {
      //   path: '/platformManagement/merchantTag',
      //   name: 'merchantTag',
      //   component: () => import('@/views/platformManagement/merchantTag'),
      //   meta: {title: '商家标签', icon: 'system', id: 4}
      // },
      // {
      //   path: '/platformManagement/productTrademark',
      //   name: 'productTrademark',
      //   component: () => import('@/views/platformManagement/productTrademark'),
      //   meta: {title: '产品与品牌', icon: 'system', id: 4}
      // },

    ]
  }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

//
export const constantRouterMapdev = [

]

// MallManagement
// 发包时请设置RouterMapdev为空
export const RouterMapdev = [

]
