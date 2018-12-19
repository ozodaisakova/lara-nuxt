import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _02856b4a = () => import('..\\resources\\nuxt\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */).then(m => m.default || m)
const _2bb21836 = () => import('..\\resources\\nuxt\\pages\\signin.vue' /* webpackChunkName: "pages_signin" */).then(m => m.default || m)
const _568c9374 = () => import('..\\resources\\nuxt\\pages\\product\\index.vue' /* webpackChunkName: "pages_product_index" */).then(m => m.default || m)
const _6594bf23 = () => import('..\\resources\\nuxt\\pages\\cart.vue' /* webpackChunkName: "pages_cart" */).then(m => m.default || m)
const _1bc04cac = () => import('..\\resources\\nuxt\\pages\\for-tests.vue' /* webpackChunkName: "pages_for-tests" */).then(m => m.default || m)
const _9cb93648 = () => import('..\\resources\\nuxt\\pages\\catalog\\index.vue' /* webpackChunkName: "pages_catalog_index" */).then(m => m.default || m)
const _6bec9ab4 = () => import('..\\resources\\nuxt\\pages\\admin\\index.vue' /* webpackChunkName: "pages_admin_index" */).then(m => m.default || m)
const _247b0462 = () => import('..\\resources\\nuxt\\pages\\buy\\index.vue' /* webpackChunkName: "pages_buy_index" */).then(m => m.default || m)
const _d65ddf12 = () => import('..\\resources\\nuxt\\pages\\auth\\index.vue' /* webpackChunkName: "pages_auth_index" */).then(m => m.default || m)
const _03bdb598 = () => import('..\\resources\\nuxt\\pages\\auth\\login\\index.vue' /* webpackChunkName: "pages_auth_login_index" */).then(m => m.default || m)
const _d3c134f6 = () => import('..\\resources\\nuxt\\pages\\auth\\contact.vue' /* webpackChunkName: "pages_auth_contact" */).then(m => m.default || m)
const _40e8e634 = () => import('..\\resources\\nuxt\\pages\\auth\\register\\index.vue' /* webpackChunkName: "pages_auth_register_index" */).then(m => m.default || m)
const _bc62aa50 = () => import('..\\resources\\nuxt\\pages\\admin\\panel.vue' /* webpackChunkName: "pages_admin_panel" */).then(m => m.default || m)
const _4b552fa9 = () => import('..\\resources\\nuxt\\pages\\auth\\dashboard\\index.vue' /* webpackChunkName: "pages_auth_dashboard_index" */).then(m => m.default || m)
const _ef34915c = () => import('..\\resources\\nuxt\\pages\\admin\\catalog\\product.vue' /* webpackChunkName: "pages_admin_catalog_product" */).then(m => m.default || m)
const _54a5c5d1 = () => import('..\\resources\\nuxt\\pages\\admin\\information\\add.vue' /* webpackChunkName: "pages_admin_information_add" */).then(m => m.default || m)
const _284cc8ec = () => import('..\\resources\\nuxt\\pages\\admin\\information\\edit.vue' /* webpackChunkName: "pages_admin_information_edit" */).then(m => m.default || m)
const _df34beaa = () => import('..\\resources\\nuxt\\pages\\admin\\information\\delete.vue' /* webpackChunkName: "pages_admin_information_delete" */).then(m => m.default || m)
const _63e062ab = () => import('..\\resources\\nuxt\\pages\\admin\\catalog\\category.vue' /* webpackChunkName: "pages_admin_catalog_category" */).then(m => m.default || m)
const _3823a7f7 = () => import('..\\resources\\nuxt\\pages\\buy\\_id.vue' /* webpackChunkName: "pages_buy__id" */).then(m => m.default || m)
const _45862378 = () => import('..\\resources\\nuxt\\pages\\catalog\\_id.vue' /* webpackChunkName: "pages_catalog__id" */).then(m => m.default || m)
const _5dac922e = () => import('..\\resources\\nuxt\\pages\\product\\_id.vue' /* webpackChunkName: "pages_product__id" */).then(m => m.default || m)
const _12cf2e5f = () => import('..\\resources\\nuxt\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



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
			component: _02856b4a,
			name: "signup"
		},
		{
			path: "/signin",
			component: _2bb21836,
			name: "signin"
		},
		{
			path: "/product",
			component: _568c9374,
			name: "product"
		},
		{
			path: "/cart",
			component: _6594bf23,
			name: "cart"
		},
		{
			path: "/for-tests",
			component: _1bc04cac,
			name: "for-tests"
		},
		{
			path: "/catalog",
			component: _9cb93648,
			name: "catalog"
		},
		{
			path: "/admin",
			component: _6bec9ab4,
			name: "admin"
		},
		{
			path: "/buy",
			component: _247b0462,
			name: "buy"
		},
		{
			path: "/auth",
			component: _d65ddf12,
			name: "auth"
		},
		{
			path: "/auth/login",
			component: _03bdb598,
			name: "auth-login"
		},
		{
			path: "/auth/contact",
			component: _d3c134f6,
			name: "auth-contact"
		},
		{
			path: "/auth/register",
			component: _40e8e634,
			name: "auth-register"
		},
		{
			path: "/admin/panel",
			component: _bc62aa50,
			name: "admin-panel"
		},
		{
			path: "/auth/dashboard",
			component: _4b552fa9,
			name: "auth-dashboard"
		},
		{
			path: "/admin/catalog/product",
			component: _ef34915c,
			name: "admin-catalog-product"
		},
		{
			path: "/admin/information/add",
			component: _54a5c5d1,
			name: "admin-information-add"
		},
		{
			path: "/admin/information/edit",
			component: _284cc8ec,
			name: "admin-information-edit"
		},
		{
			path: "/admin/information/delete",
			component: _df34beaa,
			name: "admin-information-delete"
		},
		{
			path: "/admin/catalog/category",
			component: _63e062ab,
			name: "admin-catalog-category"
		},
		{
			path: "/buy/:id",
			component: _3823a7f7,
			name: "buy-id"
		},
		{
			path: "/catalog/:id",
			component: _45862378,
			name: "catalog-id"
		},
		{
			path: "/product/:id",
			component: _5dac922e,
			name: "product-id"
		},
		{
			path: "/",
			component: _12cf2e5f,
			name: "index"
		},
		{
			path: "/__laravel_nuxt__",
			component: _12cf2e5f,
			name: "__laravel_nuxt__"
		}
    ],
    
    
    fallback: false
  })
}
