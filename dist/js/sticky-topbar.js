'use strict';

!function () {
    var model = {
        init: function init() {
            var APP_ID = 'TN76YHSImmdL721fkPag3Dj3-gzGzoHsz';
            var APP_KEY = 'k8yxHPMR2EapcM15glytfEQz';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },

        fetch: function fetch() {
            var query = new AV.Query('X');
            // then()就是成功了就调用第一个函数，而失败了就调用第二个函数
            return query.find();
        },
        save: function save(name) {
            var Message = AV.Object.extend('X');
            var message = new Message();
            return message.save({
                'name': name
            });
        }
    };
    var view = View('#topNavBar');
    var controller = {
        view: null,
        init: function init(view) {
            this.view = view;
            this.bindEvents();
            // this.bindEvents.call(this)
        },
        bindEvents: function bindEvents(view) {
            var _this = this;

            var view = this.view;
            window.addEventListener('scroll', function (x) {
                if (window.scrollY > 0) {
                    //   窗口滚动的时候获得一个高度
                    _this.active();
                } else {
                    _this.deactive();
                }
            });
            //箭头函数没有this
        },
        active: function active() {
            this.view.classList.add('sticky');
        },
        deactive: function deactive() {
            this.view.classList.remove('sticky');
        }
    };
    controller.init(view);
    // conroller.init.call(controller,view)
}.call();