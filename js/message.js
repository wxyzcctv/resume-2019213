!function(){
    var view = document.querySelector('section.message')

    var model = {
        //初始化
        init:function(){
            var APP_ID = 'TN76YHSImmdL721fkPag3Dj3-gzGzoHsz';
            var APP_KEY = 'k8yxHPMR2EapcM15glytfEQz';
            AV.init({appId: APP_ID,appKey: APP_KEY})
        },
        // 获取数据
        fetch:function(){
            var query = new AV.Query('Message');
            // then()就是成功了就调用第一个函数，而失败了就调用第二个函数
            return query.find()
        },
        // 创建数据
        save:function(name,content){
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                'name':name,
                'content':content
            })
        }
    }
    var controller = {
        view:null,
        model:null,
        messageList:null,
        init:function(view){
            this.view = view
            this.model = model
            this.messageList = document.querySelector('#messageList')
            this.form = document.querySelector('#postMessageForm')  
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages:function(){
            this.model.fetch.then( (messages)=>{
                let array = messages.map((item)=>item.attributes)
                // 上面这一句得到的是数组中attributes中的内容
                array.forEach((item)=>{
                    let li = document.createElement('li')
                    li.innerText = `${item.name}:${item.content}`
                    this.messageList.appendChild(li)
                })
                }
            )
        },
        bindEvents:function(){

            this.form.addEventListener('submit',function(e){
            // 监听提交事件就能防止在提交过程中只是通过点击按钮提交，还可以通过点击回车进行提交
            e.preventDefault()    //这一句是为了阻止点击按钮的时候网页自动进行刷新
            this.saveMessage()
        })
        },
        saveMessage:function(){
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name,content).then(function(object){
                // window.location.reload()
                //上面一句的意思是当前面的动作完成之后就刷新页面进行显示
                //下面的内是当不需要刷新页面的时候就显示存在的内容的时候就是用下面的设置
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messagaList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                console.log(content)
            })
        },

    }
    controller.init(view,model)
}.call()


// //创建TestObject表
// var TestObject = AV.Object.extend('TestObject');
// //在表中创建一行数据
// var testObject = new TestObject();
// // 数据内容是words: 'Hello World!' 保存
// // 如果保存成功就运行alert('')
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })