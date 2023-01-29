import { createRouter, createWebHistory } from 'vue-router'
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '@/i18n'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('@/views/Contact.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const lang: string = String(to.query.lang)

  if (lang && supportLocales.includes(lang)) {
    setI18nLanguage(String(lang))
    next({
      ...to,
      query: {
        ...to.query,
      },
    })
  } else {
    next()
  }
})

export default router;
