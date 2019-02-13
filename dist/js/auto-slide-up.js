'use strict';

!function () {
    var specialTags = document.querySelectorAll('[data-x]');
    for (i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset');
    }
    findClosestAndRemoveOffset();
    window.addEventListener('scroll', function (x) {
        findClosestAndRemoveOffset();
    });

    function findClosestAndRemoveOffset() {
        var specialTags = document.querySelectorAll('[data-x]');
        var minIndex = 0;
        for (i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i;
            }
        }
        //   这一段for循环得到的是离浏览器窗口上面距离最小的哪一个标签元素
        //   for(i=0; i<specialTags.length; i++){
        // 	  specialTags[i].classList.remove('active')
        //   }
        // //   这一个for循环是为了将所有的打上标签的元素的class都设置为非active
        // // 结合下面这一句就能实现将得到的最下标签添加active属性
        //   specialTags[minIndex].classList.add('active')
        //   以下程序实现的是当网页界面中出现在某个地方的时候，导航栏对应的那个标签能下面能变红
        specialTags[minIndex].classList.remove('offset');
        var id = specialTags[minIndex].id; //得到当前元素的id
        var a = document.querySelector('a[href="#' + id + '"]'); //通过得到的id得到同样id的a标签
        var li = a.parentNode; //得到a标签的父元素
        var broutherAndMe = li.parentNode.children; //通过得到li标签的父元素之后在得到子元素，也就是能得到包含li的所有的li标签
        for (i = 0; i < broutherAndMe.length; i++) {
            broutherAndMe[i].classList.remove('highlight');
        }
        //   for循环将得到的li标签消除active属性
        li.classList.add('highlight');
        //   此处不是给所有的li都加上active属性，而是将选择到的li加上active属性
    }
}.call();