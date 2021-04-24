import Home from '@/components/DashBoardLayout.vue';
import { routes as allRoutes } from "@/pages/routes";
export const routes = [
    {
      path: '/',
      component: Home
    },
    { 
        path: '/home',
        component: () => import('@/components/DashBoardLayout.vue'),
        children: [
          ...allRoutes,
        ],
    },
];