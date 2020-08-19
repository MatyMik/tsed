(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{354:function(t,e,a){},355:function(t,e,a){},438:function(t,e,a){"use strict";var n=a(354);a.n(n).a},439:function(t,e,a){var n=a(33),i=a(16),s=a(28);t.exports=function(t){return"string"==typeof t||!i(t)&&s(t)&&"[object String]"==n(t)}},440:function(t,e){t.exports=function(t){return null==t}},441:function(t,e,a){"use strict";var n=a(355);a.n(n).a},449:function(t,e,a){"use strict";a.r(e);a(168);var n=a(0),i=a(376),s=a(307),o=a(310),r=a(311),c=a(315),u=a(317),l=a(312),h=a(321),d=a(320),p=a(316),v=a(318),b=a(319),g={name:"Home",components:{GithubStars:p.a,HeroBanner:l.a,Testimonial:d.a,NavLink:h.a,Features:c.a,GithubContributors:u.a,OpenCollectiveBackers:v.a,OpenCollectiveSponsors:b.a},computed:{data:function(){return this.$page.frontmatter},actionLink:function(){return{link:this.data.actionLink,text:this.data.actionText}},repoLink:function(){return{link:this.data.repoLink,text:this.data.repoText}}},methods:{onClickAction:function(){this.$ga&&this.$ga.event({eventCategory:"home",eventAction:"click",eventLabel:"action",eventValue:this.data.actionText})},onClickRepo:function(){this.$ga&&this.$ga.event({eventCategory:"home",eventAction:"click",eventLabel:"repository",eventValue:this.data.repoText})}}},m=(a(438),a(43)),f=Object(m.a)(g,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("HeroBanner",{attrs:{logoSrc:t.data.heroImage&&t.$withBase(t.data.heroImage),title:t.data.heroText||t.$title||"Hello",version:t.data.heroVersion||t.$site.themeConfig.version,terms:t.data.heroTerms,description:t.data.heroDescription||t.$description||"Welcome to your VuePress site",component:t.data.heroComponent}},[a("ul",{staticClass:"home__actions"},[a("li",[t.data.actionText&&t.data.actionLink?a("NavLink",{staticClass:"button",attrs:{href:t.data.actionLink},on:{click:function(e){return t.onClickAction()}}},[t._v("\n          "+t._s(t.data.actionText)+"\n        ")]):t._e()],1),t._v(" "),a("li",[t.data.repoText&&t.data.repoLink?a("GithubStars"):t._e()],1)])]),t._v(" "),a("article",[t.data.testimonial?a("div",{staticClass:"container--grey-lighter"},[a("div",{staticClass:"container"},[a("Testimonial",{attrs:{title:t.data.testimonial.title,details:t.data.testimonial.details}})],1)]):t._e(),t._v(" "),t.data.features&&t.data.features.length?a("div",{staticClass:"container container--padded"},[t._m(0),t._v(" "),a("Features",{attrs:{items:t.data.features}})],1):t._e(),t._v(" "),t.data.showContent?a("div",{staticClass:"container container--padded"},[a("Content",{attrs:{custom:""}})],1):t._e(),t._v(" "),t.data.contributors?a("div",{staticClass:"container--primary-color"},[a("div",{staticClass:"container container--padded"},[a("h2",{staticClass:"heading -white",domProps:{innerHTML:t._s(t.data.contributors.title)}}),t._v(" "),a("GithubContributors",{staticClass:"-white"}),t._v(" "),t.data.contributors.button?a("div",{staticClass:"container--centered container--padded"},[t.data.contributors.button?a("NavLink",{staticClass:"button",attrs:{href:t.data.contributors.button.link}},[t._v("\n            "+t._s(t.data.contributors.button.text)+"\n          ")]):t._e()],1):t._e()],1)]):t._e(),t._v(" "),t.data.backers?a("div",{staticClass:"container--grey-lighter"},[a("div",{staticClass:"container container--padded"},[a("h2",{staticClass:"heading",domProps:{innerHTML:t._s(t.data.backers.title)}}),t._v(" "),a("p",[t._v("\n          "+t._s(t.data.backers.details)+"\n        ")]),t._v(" "),a("OpenCollectiveBackers"),t._v(" "),t.data.backers.button?a("div",{staticClass:"container--centered container--padded"},[a("NavLink",{staticClass:"button",attrs:{href:t.data.backers.button.link}},[t._v("\n            "+t._s(t.data.backers.button.text)+"\n          ")])],1):t._e()],1)]):t._e(),t._v(" "),t.data.sponsors?a("div",{staticClass:"container--white"},[a("div",{staticClass:"container container--padded"},[a("h2",{staticClass:"heading",domProps:{innerHTML:t._s(t.data.sponsors.title)}}),t._v(" "),a("p",[t._v("\n          "+t._s(t.data.sponsors.details)+"\n        ")]),t._v(" "),a("OpenCollectiveSponsors"),t._v(" "),t.data.sponsors.button?a("div",{staticClass:"container--centered container--padded"},[a("NavLink",{staticClass:"button primary-color",attrs:{href:t.data.sponsors.button.link}},[t._v("\n            "+t._s(t.data.sponsors.button.text)+"\n          ")])],1):t._e()],1)]):t._e()])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{staticClass:"heading"},[this._v("Our "),e("br"),e("b",[this._v("features")])])}],!1,null,null,null).exports,_=a(439),C=a.n(_),k=a(440),S=a.n(k),$={name:"PageNav",props:["sidebarItems"],computed:{prev:function(){return T(x.PREV,this)},next:function(){return T(x.NEXT,this)}}};var x={NEXT:{resolveLink:function(t,e){return L(t,e,1)},getThemeLinkConfig:function(t){return t.nextLinks},getPageLinkConfig:function(t){return t.frontmatter.next}},PREV:{resolveLink:function(t,e){return L(t,e,-1)},getThemeLinkConfig:function(t){return t.prevLinks},getPageLinkConfig:function(t){return t.frontmatter.prev}}};function T(t,e){var a=e.$themeConfig,n=e.$page,i=e.$route,o=e.$site,r=e.sidebarItems,c=t.resolveLink,u=t.getThemeLinkConfig,l=t.getPageLinkConfig,h=u(a),d=l(n),p=S()(d)?h:d;return!1===p?void 0:C()(p)?Object(s.m)(o.pages,p,i.path):c(n,r)}function L(t,e,a){var n=[];!function t(e,a){for(var n=0,i=e.length;n<i;n++)"group"===e[n].type?t(e[n].children||[],a):a.push(e[n])}(e,n);for(var i=0;i<n.length;i++){var s=n[i];if("page"===s.type&&s.path===decodeURIComponent(t.path))return n[i+a]}}var y=$,O={name:"Page",components:{PageNav:Object(m.a)(y,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.prev||t.next?a("div",{staticClass:"page-nav"},[a("p",{staticClass:"inner"},[t.prev?a("span",{staticClass:"prev"},[t._v("\n      ←\n      "),t.prev?a("router-link",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v(t._s(t.prev.title||t.prev.path))]):t._e()],1):t._e(),t._v(" "),t.next?a("span",{staticClass:"next"},[t.next?a("router-link",{attrs:{to:t.next.path}},[t._v(t._s(t.next.title||t.next.path))]):t._e(),t._v("\n      →\n    ")],1):t._e()])]):t._e()}),[],!1,null,null,null).exports},props:["sidebarItems"]},w=(a(441),Object(m.a)(O,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page"},[e("article",{staticClass:"container"},[this._t("page-top"),this._v(" "),e("Content",{attrs:{custom:!1}}),this._v(" "),e("PageNav",this._b({},"PageNav",{sidebarItems:this.sidebarItems},!1)),this._v(" "),this._t("page-bottom")],2)])}),[],!1,null,null,null).exports),P=a(377),N=a(313),I=a(357);n.a.use(i.a);var H={components:{Navbar:o.a,Sidebar:r.a,Home:f,Contributing:P.a,Footer:N.a,Page:w,OtherTopics:I.a},data:function(){return{isSidebarOpen:!1}},computed:{isHome:function(){var t=this.$page.frontmatter,e=t.home,a=t.layout;return e||"home"===a},isContributing:function(){return"contributing"===this.$page.frontmatter.layout},isCustomLayout:function(){var t=this.$page.frontmatter.layout;return t&&!this.isHome&&["contributing"].indexOf(t)},shouldShowNavbar:function(){var t=this.$site.themeConfig;return!1!==this.$page.frontmatter.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav||this.$themeLocaleConfig.nav)},shouldShowSidebar:function(){var t=this.$page.frontmatter;return!t.home&&!1!==t.sidebar&&this.sidebarItems.length},shouldShowOtherTopics:function(){var t=this.$page.frontmatter;return!t.layout&&!this.isHome&&!1!==t.otherTopics&&this.otherTopicsItems.length},sidebarItems:function(){return Object(s.n)(this.$page,this.$page.regularPath,this.$site,this.$localePath)},otherTopicsItems:function(){return Object(s.l)(this.$page,this.$page.regularPath,this.$site,this.$localePath)},pageClasses:function(){var t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar,"sidebar-open":this.isSidebarOpen,"no-sidebar":!this.shouldShowSidebar},t]}},mounted:function(){var t=this;this.$router.afterEach((function(){t.isSidebarOpen=!1}))},methods:{toggleSidebar:function(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen,this.$emit("toggle-sidebar",this.isSidebarOpen)},onTouchStart:function(t){this.touchStart={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}},onTouchEnd:function(t){var e=t.changedTouches[0].clientX-this.touchStart.x,a=t.changedTouches[0].clientY-this.touchStart.y;Math.abs(e)>Math.abs(a)&&Math.abs(e)>40&&(e>0&&this.touchStart.x<=80?this.toggleSidebar(!0):this.toggleSidebar(!1))}}},E=Object(m.a)(H,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"theme-container",class:t.pageClasses,on:{touchstart:t.onTouchStart,touchend:t.onTouchEnd}},[t.shouldShowNavbar?a("Navbar",{class:{"--fluid":t.shouldShowSidebar},on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),a("main",{staticClass:"main-content"},[a("div",{staticClass:"sidebar-mask",on:{click:function(e){return t.toggleSidebar(!1)}}}),t._v(" "),a("Sidebar",{attrs:{items:t.sidebarItems},on:{"toggle-sidebar":t.toggleSidebar},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("sidebar-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("sidebar-bottom")]},proxy:!0}],null,!0)}),t._v(" "),t.isCustomLayout?a("div",{staticClass:"custom-layout"},[a(t.$page.frontmatter.layout,{tag:"component"})],1):t.isHome?a("Home"):t.isContributing?a("Contributing"):a("Page",{attrs:{"sidebar-items":t.sidebarItems},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("page-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("page-bottom")]},proxy:!0}],null,!0)},[t._v(" "),t._v(" "),t.shouldShowOtherTopics?a("OtherTopics",{attrs:{slot:"page-bottom",items:t.otherTopicsItems},slot:"page-bottom"},[a("h3",{staticClass:"heading",attrs:{slot:"top"},slot:"top"},[t._v("\n          Other "),a("br"),a("b",[t._v("topics")])])]):t._e()],1)],1),t._v(" "),a("Footer",{class:{"--with-sidebar":t.shouldShowSidebar}})],1)}),[],!1,null,null,null);e.default=E.exports}}]);