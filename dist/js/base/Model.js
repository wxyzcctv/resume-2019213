'use strict';

window.Model = function (options) {
    var resourceName = options.resourceName;
    return {
        init: function init() {
            var APP_ID = 'TN76YHSImmdL721fkPag3Dj3-gzGzoHsz';
            var APP_KEY = 'k8yxHPMR2EapcM15glytfEQz';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        fetch: function fetch() {
            var query = new AV.Query(resourceName);
            // then()就是成功了就调用第一个函数，而失败了就调用第二个函数
            return query.find();
        },
        save: function save(object) {
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object);
        }
    };
};