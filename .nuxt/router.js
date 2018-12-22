import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _28ffeb0c = () => import('..\\resources\\nuxt\\pages\\admin\\index.vue' /* webpackChunkName: "pages_admin_index" */).then(m => m.default || m)
const _24d0d096 = () => import('..\\resources\\nuxt\\pages\\buy\\index.vue' /* webpackChunkName: "pages_buy_index" */).then(m => m.default || m)
const _e0c1995e = () => import('..\\resources\\nuxt\\pages\\auth\\index.vue' /* webpackChunkName: "pages_auth_index" */).then(m => m.default || m)
const _6bb684ee = () => import('..\\resources\\nuxt\\pages\\cart.vue' /* webpackChunkName: "pages_cart" */).then(m => m.default || m)
const _8e8b0762 = () => import('..\\resources\\nuxt\\pages\\information\\index.vue' /* webpackChunkName: "pages_information_index" */).then(m => m.default || m)
const _2bed1bc2 = () => import('..\\resources\\nuxt\\pages\\catalog\\index.vue' /* webpackChunkName: "pages_catalog_index" */).then(m => m.default || m)
const _4f036d2c = () => import('..\\resources\\nuxt\\pages\\product\\index.vue' /* webpackChunkName: "pages_product_index" */).then(m => m.default || m)
const _3d48f91a = () => import('..\\resources\\nuxt\\pages\\auth\\login\\index.vue' /* webpackChunkName: "pages_auth_login_index" */).then(m => m.default || m)
const _499b646d = () => import('..\\resources\\nuxt\\pages\\user\\signout.vue' /* webpackChunkName: "pages_user_signout" */).then(m => m.default || m)
const _3707f5a5 = () => import('..\\resources\\nuxt\\pages\\user\\profile.vue' /* webpackChunkName: "pages_user_profile" */).then(m => m.default || m)
const _3d15c1ca = () => import('..\\resources\\nuxt\\pages\\user\\order.vue' /* webpackChunkName: "pages_user_order" */).then(m => m.default || m)
const _07578d33 = () => import('..\\resources\\nuxt\\pages\\auth\\signin.vue' /* webpackChunkName: "pages_auth_signin" */).then(m => m.default || m)
const _4904a08f = () => import('..\\resources\\nuxt\\pages\\auth\\dashboard\\index.vue' /* webpackChunkName: "pages_auth_dashboard_index" */).then(m => m.default || m)
const _00c4e33e = () => import('..\\resources\\nuxt\\pages\\admin\\panel.vue' /* webpackChunkName: "pages_admin_panel" */).then(m => m.default || m)
const _1bede3a9 = () => import('..\\resources\\nuxt\\pages\\auth\\signup.vue' /* webpackChunkName: "pages_auth_signup" */).then(m => m.default || m)
const _15f039df = () => import('..\\resources\\nuxt\\pages\\auth\\contact.vue' /* webpackChunkName: "pages_auth_contact" */).then(m => m.default || m)
const _86967ee4 = () => import('..\\resources\\nuxt\\pages\\auth\\register\\index.vue' /* webpackChunkName: "pages_auth_register_index" */).then(m => m.default || m)
const _43f67f84 = () => import('..\\resources\\nuxt\\pages\\user\\edit.vue' /* webpackChunkName: "pages_user_edit" */).then(m => m.default || m)
const _40a4632c = () => import('..\\resources\\nuxt\\pages\\admin\\catalog\\product.vue' /* webpackChunkName: "pages_admin_catalog_product" */).then(m => m.default || m)
const _99119bde = () => import('..\\resources\\nuxt\\pages\\admin\\catalog\\category.vue' /* webpackChunkName: "pages_admin_catalog_category" */).then(m => m.default || m)
const _d8425baa = () => import('..\\resources\\nuxt\\pages\\admin\\catalog\\review.vue' /* webpackChunkName: "pages_admin_catalog_review" */).then(m => m.default || m)
const _55862e91 = () => import('..\\resources\\nuxt\\pages\\admin\\information\\delete.vue' /* webpackChunkName: "pages_admin_information_delete" */).then(m => m.default || m)
const _3b706af0 = () => import('..\\resources\\nuxt\\pages\\admin\\information\\edit.vue' /* webpackChunkName: "pages_admin_information_edit" */).then(m => m.default || m)
const _0ce471ab = () => import('..\\resources\\nuxt\\pages\\admin\\information\\add.vue' /* webpackChunkName: "pages_admin_information_add" */).then(m => m.default || m)
const _3c3326aa = () => import('..\\resources\\nuxt\\pages\\catalog\\_id.vue' /* webpackChunkName: "pages_catalog__id" */).then(m => m.default || m)
const _83bbf946 = () => import('..\\resources\\nuxt\\pages\\buy\\_id.vue' /* webpackChunkName: "pages_buy__id" */).then(m => m.default || m)
const _33ed7312 = () => import('..\\resources\\nuxt\\pages\\information\\_id.vue' /* webpackChunkName: "pages_information__id" */).then(m => m.default || m)
const _86ba6ad8 = () => import('..\\resources\\nuxt\\pages\\product\\_id.vue' /* webpackChunkName: "pages_product__id" */).then(m => m.default || m)
const _403efcb9 = () => import('..\\resources\\nuxt\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



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
			path: "/admin",
			component: _28ffeb0c,
			name: "admin"
		},
		{
			path: "/buy",
			component: _24d0d096,
			name: "buy"
		},
		{
			path: "/auth",
			component: _e0c1995e,
			name: "auth"
		},
		{
			path: "/cart",
			component: _6bb684ee,
			name: "cart"
		},
		{
			path: "/information",
			component: _8e8b0762,
			name: "information"
		},
		{
			path: "/catalog",
			component: _2bed1bc2,
			name: "catalog"
		},
		{
			path: "/product",
			component: _4f036d2c,
			name: "product"
		},
		{
			path: "/auth/login",
			component: _3d48f91a,
			name: "auth-login"
		},
		{
			path: "/user/signout",
			component: _499b646d,
			name: "user-signout"
		},
		{
			path: "/user/profile",
			component: _3707f5a5,
			name: "user-profile"
		},
		{
			path: "/user/order",
			component: _3d15c1ca,
			name: "user-order"
		},
		{
			path: "/auth/signin",
			component: _07578d33,
			name: "auth-signin"
		},
		{
			path: "/auth/dashboard",
			component: _4904a08f,
			name: "auth-dashboard"
		},
		{
			path: "/admin/panel",
			component: _00c4e33e,
			name: "admin-panel"
		},
		{
			path: "/auth/signup",
			component: _1bede3a9,
			name: "auth-signup"
		},
		{
			path: "/auth/contact",
			component: _15f039df,
			name: "auth-contact"
		},
		{
			path: "/auth/register",
			component: _86967ee4,
			name: "auth-register"
		},
		{
			path: "/user/edit",
			component: _43f67f84,
			name: "user-edit"
		},
		{
			path: "/admin/catalog/product",
			component: _40a4632c,
			name: "admin-catalog-product"
		},
		{
			path: "/admin/catalog/category",
			component: _99119bde,
			name: "admin-catalog-category"
		},
		{
			path: "/admin/catalog/review",
			component: _d8425baa,
			name: "admin-catalog-review"
		},
		{
			path: "/admin/information/delete",
			component: _55862e91,
			name: "admin-information-delete"
		},
		{
			path: "/admin/information/edit",
			component: _3b706af0,
			name: "admin-information-edit"
		},
		{
			path: "/admin/information/add",
			component: _0ce471ab,
			name: "admin-information-add"
		},
		{
			path: "/catalog/:id",
			component: _3c3326aa,
			name: "catalog-id"
		},
		{
			path: "/buy/:id",
			component: _83bbf946,
			name: "buy-id"
		},
		{
			path: "/information/:id",
			component: _33ed7312,
			name: "information-id"
		},
		{
			path: "/product/:id",
			component: _86ba6ad8,
			name: "product-id"
		},
		{
			path: "/",
			component: _403efcb9,
			name: "index"
		},
		{
			path: "/__laravel_nuxt__",
			component: _403efcb9,
			name: "__laravel_nuxt__"
		}
    ],
    
    
    fallback: false
  })
}
