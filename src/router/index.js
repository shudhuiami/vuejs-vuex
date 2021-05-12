import HOME from '../components/home.vue'
import CREATE from '../components/create.vue'
import EDIT_POST from '../components/edit.vue'
import SINGLE_VIEW from '../components/single_view.vue'

export const routes = [
  {path: '*', component: HOME},
  {path: '/', component: HOME},
  {path: '/create', component: CREATE},
  {path: '/post/edit/:id', component: EDIT_POST},
  {path: '/posts/:id', component: SINGLE_VIEW},
];
