$(document).on("ready",function(){$(window).load(function(){$(".preloader").fadeOut(1e3)}),$("#home").parallax("50%",.3);new LazyLoad({elements_selector:".lazy",load_delay:300});$(window).scroll(function(){$(this).scrollTop()>200?$(".go-top").fadeIn(200):$(".go-top").fadeOut(200)}),$(".go-top").click(function(o){o.preventDefault(),$("html, body").animate({scrollTop:0},300)})});