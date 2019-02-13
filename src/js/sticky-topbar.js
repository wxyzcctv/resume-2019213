!function(){
    var model = {
        init(){
            var APP_ID = 'TN76YHSImmdL721fkPag3Dj3-gzGzoHsz';
            var APP_KEY = 'k8yxHPMR2EapcM15glytfEQz';
            AV.init({appId: APP_ID,appKey: APP_KEY})
        },
        fetch:function(){
            var query = new AV.Query('X');
            // then()就是成功了就调用第一个函数，而失败了就调用第二个函数
            return query.find()
        },
        save:function(name){
            var Message = AV.Object.extend('X');
            var message = new Message();
            return message.save({
                'name':name
            })
        }
    }
    var view = View('#topNavBar')
    var controller = {
        view: null,
        init: function(view){
            this.view = view
            this.bindEvents()
            // this.bindEvents.call(this)
        },
        bindEvents: function(view){
            var view = this.view
            window.addEventListener('scroll', (x) => {
                if(window.scrollY > 0){
                    //   窗口滚动的时候获得一个高度
                    this.active()
                }else{
                    this.deactive()
                }
            })
            //箭头函数没有this
        },
        active:function(){
            this.view.classList.add('sticky')
        },
        deactive:function(){
            this.view.classList.remove('sticky')
        }
    }
    controller.init(view)
    // conroller.init.call(controller,view)
}.call()
