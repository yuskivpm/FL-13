window.jQuery||alert("The jQuery library must be included before the smoothscroll.js file.  The plugin will not work propery."),function(e){var t=e.scrollTo=function(t,o,n){e(window).scrollTo(t,o,n)};function o(e){return"object"==typeof e?e:{top:e,left:e}}t.defaults={axis:"xy",duration:parseFloat(e.fn.jquery)>=1.3?0:1,limit:!0},t.window=function(t){return e(window)._scrollable()},e.fn._scrollable=function(){return this.map(function(){var t=this;if(!(!t.nodeName||-1!=e.inArray(t.nodeName.toLowerCase(),["iframe","#document","html","body"])))return t;var o=(t.contentWindow||t).document||t.ownerDocument||t;return/webkit/i.test(navigator.userAgent)||"BackCompat"==o.compatMode?o.body:o.documentElement})},e.fn.scrollTo=function(n,r,i){return"object"==typeof r&&(i=r,r=0),"function"==typeof i&&(i={onAfter:i}),"max"==n&&(n=9e9),i=e.extend({},t.defaults,i),r=r||i.duration,i.queue=i.queue&&i.axis.length>1,i.queue&&(r/=2),i.offset=o(i.offset),i.over=o(i.over),this._scrollable().each(function(){if(null!=n){var a,l=this,s=e(l),c=n,f={},u=s.is("html,body");switch(typeof c){case"number":case"string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(c)){c=o(c);break}if(!(c=e(c,this)).length)return;case"object":(c.is||c.style)&&(a=(c=e(c)).offset())}e.each(i.axis.split(""),function(e,o){var n="x"==o?"Left":"Top",r=n.toLowerCase(),h="scroll"+n,m=l[h],p=t.max(l,o);if(a)f[h]=a[r]+(u?0:m-s.offset()[r]),i.margin&&(f[h]-=parseInt(c.css("margin"+n))||0,f[h]-=parseInt(c.css("border"+n+"Width"))||0),f[h]+=i.offset[r]||0,i.over[r]&&(f[h]+=c["x"==o?"width":"height"]()*i.over[r]);else{var y=c[r];f[h]=y.slice&&"%"==y.slice(-1)?parseFloat(y)/100*p:y}i.limit&&/^\d+$/.test(f[h])&&(f[h]=f[h]<=0?0:Math.min(f[h],p)),!e&&i.queue&&(m!=f[h]&&d(i.onAfterFirst),delete f[h])}),d(i.onAfter)}function d(e){s.animate(f,r,i.easing,e&&function(){e.call(this,n,i)})}}).end()},t.max=function(t,o){var n="x"==o?"Width":"Height",r="scroll"+n;if(!e(t).is("html,body"))return t[r]-e(t)[n.toLowerCase()]();var i="client"+n,a=t.ownerDocument.documentElement,l=t.ownerDocument.body;return Math.max(a[r],l[r])-Math.min(a[i],l[i])}}(jQuery),function(e){function t(t,o,n){var r=o.hash.slice(1),i=document.getElementById(r)||document.getElementsByName(r)[0];if(i){t&&t.preventDefault();var a=e(n.target);if(!(n.lock&&a.is(":animated")||n.onBefore&&!1===n.onBefore(t,i,a))){if(n.stop&&a._scrollable().stop(!0),n.hash){t=i.id==r?"id":"name";var l=e("<a> </a>").attr(t,r).css({position:"absolute",top:e(window).scrollTop(),left:e(window).scrollLeft()});i[t]="",e("body").prepend(l),location=o.hash,l.remove(),i[t]=r}a.scrollTo(i,n).trigger("notify.serialScroll",[i])}}}var o=location.href.replace(/#.*/,""),n=e.localScroll=function(t){e("body").localScroll(t)};n.defaults={duration:1e3,axis:"y",event:"click",stop:!0,target:window,reset:!0},n.hash=function(o){if(location.hash){if((o=e.extend({},n.defaults,o)).hash=!1,o.reset){var r=o.duration;delete o.duration,e(o.target).scrollTo(0,o),o.duration=r}t(0,location,o)}},e.fn.localScroll=function(r){function i(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,"")==o&&(!r.filter||e(this).is(r.filter))}return(r=e.extend({},n.defaults,r)).lazy?this.bind(r.event,function(o){var n=e([o.target,o.target.parentNode]).filter(i)[0];n&&t(o,n,r)}):this.find("a,area").filter(i).bind(r.event,function(e){t(e,this,r)}).end().end()}}(jQuery),jQuery(function(e){e.localScroll({filter:".smoothScroll"})});