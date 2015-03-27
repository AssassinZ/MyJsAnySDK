var agent = null;
var user_plugin = null;

var MySDK = cc.Class.extend({

        initAnySDK: function () {
            cc.log("initAnySDK");
            // 注意：这里appKey, appSecret,
            // privateKey，要替换成自己打包工具里面的值(登录打包工具，游戏管理界面上显示的那三个参数)。
            var appKey = "6B5360E0-2EAF-F231-1516-37C1CFA48057";
            var appSecret = "d87569b8d930928f152704caf87754f7";
            var privateKey = "0A73DF39F13F5270FB9980ED18E3C2D7";
            var oauthLoginServer = "http://oauth.anysdk.com/api/OauthLoginDemo/Login.php";
            agent = anysdk.AgentManager.getInstance();
            // init
            agent.init(appKey, appSecret, privateKey, oauthLoginServer);
            // load
            agent.loadALLPlugin();

            this.initLogin();
        },

        initLogin: function () {
            cc.log("initLogin");
            user_plugin = agent.getUserPlugin();
            if (user_plugin) {
                user_plugin.setActionListener(this.onUserLogin, this);
            }
        },

        onUserLogin: function (plugin, code, msg) {
            cc.log("on user result action.");
            cc.log("msg:" + msg);        //
            cc.log("code:" + code);        // 这里可以根据返回的 code和msg 做相应的处理
            cc.log("plugin:" + plugin);
//            switch (code) {
//                case UserActionResultCode.kLoginSuccess:
//                    // do something
//                    cc.log("login success!");
//                    break;
//                case UserActionResultCode.kLoginTimeOut://登陆失败回调
//                case UserActionResultCode.kLoginCancel://登陆取消回调
//                case UserActionResultCode.kLoginFail://登陆失败回调
//                    cc.log("login fail!");
////登陆失败后，游戏相关处理
//                    break;
//            }
        },

        login: function () {
            user_plugin.login();
        }
    }
);