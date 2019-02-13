'use strict';

!function () {
    var view = View('nav.menu');
    var controller = {
        view: null,
        aTags: null,
        init: function init(view) {
            this.view = view;
            this.initAnimation();
            this.bindEvents();
        },
        initAnimation: function initAnimation() {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function scrollToElement(element) {
            var top = element.offsetTop;
            // 得到元素距离页面顶部的绝对距离，这个距离不会随着页面的滑动而发生改变
            // 在得到锚点定位的元素之后就得到距离页面最上面的绝对距离，为页面的跳转做准备

            // window.scrollTo(0, top-80)
            // window.scrollTo()实现的是页面的跳转，其中主要有两个参数可以设置
            // 第一个参数是左右的移动距离，第二个参数就是上下的距离
            // console.log(a.href)
            // 上面这一句是直接得到经过浏览器处理的a的href的地址，前面是带有http前缀的
            var currenttop = window.scrollY;
            var targettop = top - 80;
            var s = targettop - currenttop;
            var t = Math.abs(s / 100 * 300);
            if (t > 500) {
                t = 500;
            }
            // 由于在跳转回上面的位置的时候，s的值就变为负数了，
            // 按照跳转的长度来计算跳转的时间，然而计算时间的时候就必须是正数，
            // 所以这个时候需要加绝对值，当距离太长了，跳转的时间就比较慢了，所以设置最长为5ms
            var coords = { y: currenttop };
            // 这个时候不能使用x了，因为改变的时候是改变的页面的上下
            // 设置的初始位置
            var tween = new TWEEN.Tween(coords).to({ y: targettop }, t)
            // 设置结束位置和动作时间
            .easing(TWEEN.Easing.Quadratic.InOut)
            // 至于这个函数是怎么调用的主要是在GitHub上面的例子找到的
            // 线性的发生变化，慢慢起步，加速，慢慢停止 
            .onUpdate(function () {
                window.scrollTo(0, coords.y);
                // coords中的y值就是从currenttop到targettop
            }).start();
        },
        bindEvents: function bindEvents() {
            var _this = this;

            var liTags = this.view.querySelectorAll('nav.menu > ul > li');
            //   上面这一句是为了获得某一个特定的标签
            // document.querySelectorAll，接收一个选择器，返回该选择器对应的所有的元素
            for (var i = 0; i < liTags.length; i++) {
                liTags[i].onmouseenter = function (x) {
                    // onmouseenter，当鼠标进入某一个元素的时候会触发一个函数
                    x.currentTarget.classList.add('active');
                };
                liTags[i].onmouseleave = function (x) {
                    // onmouseleave，当鼠标离开一个元素的时候会触发一个函数
                    x.currentTarget.classList.remove('active');
                };
            }
            var aTags = this.view.querySelectorAll('nav.menu > ul > li > a');
            for (var _i = 0; _i < aTags.length; _i++) {
                aTags[_i].onclick = function (x) {
                    x.preventDefault();
                    // 阻止浏览器执行a标签的默认跳转
                    var a = x.currentTarget;
                    // a.getAttribute('href')
                    // 上面这一句得到的只是a标签中所写的href的值
                    var href = a.getAttribute('href');
                    var element = document.querySelector(href);
                    // 只会获取选择器的的第一个元素，并不是所有的元素
                    // 在成功获取锚点之后，通过这个锚点来得到这个元素
                    _this.scrollToElement(element);
                };
            }
        }
    };
    controller.init(view);
}.call();