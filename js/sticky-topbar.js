!function(){
    var view = document.querySelector('#topNavBar')
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
