import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';

import store from './store/index.js';

const CoachDetail = defineAsyncComponent(() =>
  import('./pages/coaches/CoachDetail.vue')
);
const CoachRegistration = defineAsyncComponent(() =>
  import('./pages/coaches/CoachRegistration.vue')
);
const ContactCoach = defineAsyncComponent(() =>
  import('./pages/requests/ContactCoach.vue')
);
const RequestReceived = defineAsyncComponent(() =>
  import('./pages/requests/RequestsReceived.vue')
);
const UserAuth = defineAsyncComponent(() =>
  import('./pages/auth/UserAuth.vue')
);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    // not found zly link itp
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

//Guardsy od sprawdzania czy jestesmy zalogowani
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuth) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
