import { createRouter, createWebHistory } from 'vue-router';
import Category from '~/pages/category/index.vue';
import CategoryAdd from '~/pages/category/add.vue';
import CategoryEdit from '~/pages/category/_id.vue';
import Color from '~/pages/color/index.vue';
import ColorCustom from '~/pages/color/custom.vue';
import Graph from '~/pages/graph/index.vue';
import GraphTotal from '~/pages/graph/total.vue';
import GraphByCategory from '~/pages/graph/_categoryId.vue';
import Login from '~/pages/auth/login.vue';
import Create from '~/pages/auth/create.vue';
import Record from '~/pages/record/index.vue';
import RecordAdd from '~/pages/record/add.vue';
import RecordEdit from '~/pages/record/_id.vue';
import Setting from '~/pages/setting/index.vue';
import ThemeColor from '~/pages/setting/themeColor/index.vue';
import ThemeColorCustom from '~/pages/setting/themeColor/custom.vue';
import Account from '~/pages/setting/account/index.vue';
import NotFound from '~/pages/NotFound.vue';

const routes = [
  { path: '/category', component: Category, meta: { showNavigation: false } },
  {
    path: '/category/add',
    component: CategoryAdd,
    meta: { showNavigation: false },
  },
  {
    path: '/category/:id',
    component: CategoryEdit,
    meta: { showNavigation: false },
  },
  { path: '/color', component: Color, meta: { showNavigation: false } },
  {
    path: '/color/custom',
    component: ColorCustom,
    meta: { showNavigation: false },
  },
  { path: '/graph', component: Graph },
  {
    path: '/graph/total',
    component: GraphTotal,
    meta: { showNavigation: false },
  },
  {
    path: '/graph/:categoryId',
    component: GraphByCategory,
    meta: { showNavigation: false },
  },
  { path: '/record/add', component: RecordAdd },
  {
    path: '/record/:id',
    component: RecordEdit,
    meta: { showNavigation: false },
  },
  { path: '/record', component: Record },
  { path: '/setting', component: Setting },
  {
    path: '/setting/themeColor',
    component: ThemeColor,
    meta: { showNavigation: false },
  },
  {
    path: '/setting/themeColor/custom',
    component: ThemeColorCustom,
    meta: { showNavigation: false },
  },
  {
    path: '/setting/account',
    component: Account,
    meta: { showNavigation: false },
  },
  { path: '/auth/login', component: Login, meta: { showNavigation: false } },
  { path: '/auth/create', component: Create, meta: { showNavigation: false } },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const history = createWebHistory();

export const router = createRouter({
  history,
  routes,
});
