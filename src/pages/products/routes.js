export const routes = [
    {
        name: `products.index`,
        path: `/products`,
        component: () => import('./Index.vue'),
        meta: {},
    },
]