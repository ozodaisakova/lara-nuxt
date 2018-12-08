import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _7de7cda4 = () => import('..\\resources\\nuxt\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */).then(m => m.default || m)
const _6951772e = () => import('..\\resources\\nuxt\\pages\\signin.vue' /* webpackChunkName: "pages_signin" */).then(m => m.default || m)
const _53963ee2 = () => import('..\\resources\\nuxt\\pages\\product\\index.vue' /* webpackChunkName: "pages_product_index" */).then(m => m.default || m)
const _322cfea8 = () => import('..\\resources\\nuxt\\pages\\cart.vue' /* webpackChunkName: "pages_cart" */).then(m => m.default || m)
const _6663a5c1 = () => import('..\\resources\\nuxt\\pages\\for-tests.vue' /* webpackChunkName: "pages_for-tests" */).then(m => m.default || m)
const _99c2e1b6 = () => import('..\\resources\\nuxt\\pages\\catalog\\index.vue' /* webpackChunkName: "pages_catalog_index" */).then(m => m.default || m)
const _b0a649a2 = () => import('..\\resources\\nuxt\\pages\\admin\\index.vue' /* webpackChunkName: "pages_admin_index" */).then(m => m.default || m)
const _01f83498 = () => import('..\\resources\\nuxt\\pages\\buy\\index.vue' /* webpackChunkName: "pages_buy_index" */).then(m => m.default || m)
const _075232ce = () => import('..\\resources\\nuxt\\pages\\auth\\index.vue' /* webpackChunkName: "pages_auth_index" */).then(m => m.default || m)
const _238a00f2 = () => import('..\\resources\\nuxt\\pages\\auth\\dashboard\\index.vue' /* webpackChunkName: "pages_auth_dashboard_index" */).then(m => m.default || m)
const _6ce14e1c = () => import('..\\resources\\nuxt\\pages\\auth\\contact.vue' /* webpackChunkName: "pages_auth_contact" */).then(m => m.default || m)
const _3fa047cb = () => import('..\\resources\\nuxt\\pages\\auth\\register\\index.vue' /* webpackChunkName: "pages_auth_register_index" */).then(m => m.default || m)
const _660f2201 = () => import('..\\resources\\nuxt\\pages\\admin\\panel\\index.vue' /* webpackChunkName: "pages_admin_panel_index" */).then(m => m.default || m)
const _1dfc02fd = () => import('..\\resources\\nuxt\\pages\\auth\\login\\index.vue' /* webpackChunkName: "pages_auth_login_index" */).then(m => m.default || m)
const _9269e1ae = () => import('..\\resources\\nuxt\\pages\\admin\\catalog\\product.vue' /* webpackChunkName: "pages_admin_catalog_product" */).then(m => m.default || m)
const _022605b4 = () => import('..\\resources\\nuxt\\pages\\admin\\catalog\\category.vue' /* webpackChunkName: "pages_admin_catalog_category" */).then(m => m.default || m)
const _d28b0600 = () => import('..\\resources\\nuxt\\pages\\buy\\_id.vue' /* webpackChunkName: "pages_buy__id" */).then(m => m.default || m)
const _8a3fd266 = () => import('..\\resources\\nuxt\\pages\\catalog\\_id.vue' /* webpackChunkName: "pages_catalog__id" */).then(m => m.default || m)
const _3b4fbab7 = () => import('..\\resources\\nuxt\\pages\\product\\_id.vue' /* webpackChunkName: "pages_product__id" */).then(m => m.default || m)
const _87dac414 = () => import('..\\resources\\nuxt\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/signup",
			component: _7de7cda4,
			name: "signup"
		},
		{
			path: "/signin",
			component: _6951772e,
			name: "signin"
		},
		{
			path: "/product",
			component: _53963ee2,
			name: "product"
		},
		{
			path: "/cart",
			component: _322cfea8,
			name: "cart"
		},
		{
			path: "/for-tests",
			component: _6663a5c1,
			name: "for-tests"
		},
		{
			path: "/catalog",
			component: _99c2e1b6,
			name: "catalog"
		},
		{
			path: "/admin",
			component: _b0a649a2,
			name: "admin"
		},
		{
			path: "/buy",
			component: _01f83498,
			name: "buy"
		},
		{
			path: "/auth",
			component: _075232ce,
			name: "auth"
		},
		{
			path: "/auth/dashboard",
			component: _238a00f2,
			name: "auth-dashboard"
		},
		{
			path: "/auth/contact",
			component: _6ce14e1c,
			name: "auth-contact"
		},
		{
			path: "/auth/register",
			component: _3fa047cb,
			name: "auth-register"
		},
		{
			path: "/admin/panel",
			component: _660f2201,
			name: "admin-panel"
		},
		{
			path: "/auth/login",
			component: _1dfc02fd,
			name: "auth-login"
		},
		{
			path: "/admin/catalog/product",
			component: _9269e1ae,
			name: "admin-catalog-product"
		},
		{
			path: "/admin/catalog/category",
			component: _022605b4,
			name: "admin-catalog-category"
		},
		{
			path: "/buy/:id",
			component: _d28b0600,
			name: "buy-id"
		},
		{
			path: "/catalog/:id",
			component: _8a3fd266,
			name: "catalog-id"
		},
		{
			path: "/product/:id",
			component: _3b4fbab7,
			name: "product-id"
		},
		{
			path: "/",
			component: _87dac414,
			name: "index"
		},
		{
			path: "/__laravel_nuxt__",
			component: _87dac414,
			name: "__laravel_nuxt__"
		}
    ],
    
    
    fallback: false
  })
}
