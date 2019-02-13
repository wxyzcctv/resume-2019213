!function(){
    var model = Model({resourceName:'Message'})
    var view = View('section.message')
    var controller = Controller({
        messageList:null,
        form:null,
        init:function(view,model){
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')  
            this.loadMessages()
        },
        loadMessages:function(){
            this.model.fetch().then( (messages)=>{
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
            this.form.addEventListener('submit',(e)=>{
            // 监听提交事件就能防止在提交过程中只是通过点击按钮提交，还可以通过点击回车进行提交
            e.preventDefault()    //这一句是为了阻止点击按钮的时候网页自动进行刷新
            this.saveMessage()
            })
        },
        saveMessage: function(){
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save({
                'name':name,
                'content':content
            }).then(function(object){
                // window.location.reload()
                //上面一句的意思是当前面的动作完成之后就刷新页面进行显示
                //下面的内是当不需要刷新页面的时候就显示存在的内容的时候就是用下面的设置
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                console.log(object)
            })
        },
    })
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