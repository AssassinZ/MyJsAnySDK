var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        // ////////////////////////////
        // 1. super init first
        this._super();
        var my_sdk = new MySDK();
        my_sdk.initAnySDK();

        // ///////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the
        // program
        // you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("close is clicked!");
                my_sdk.end();
                cc.director.end();
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var loginItem = new cc.MenuItemImage(
            res.LoginNormal_png,
            res.LoginSelected_png,
            function () {
                cc.log("Login is clicked!");
                my_sdk.login();
            }, this);
        loginItem.attr({
            x: size.width / 3,
            y: size.height,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var loginItemPosX = size.width / 3;
        var loginItemPosY = size.height / 2;


        var seq = cc.Sequence(
                cc.MoveTo(2, cc.p(loginItemPosX, loginItemPosY)).easing(cc.easeElasticOut()),
                cc.CallFunc(function (loginItem) {
                    var shaking = cc.MoveTo(2, cc.p(loginItemPosX + 10, loginItemPosY)).easing(cc.easeBackInOut());
                    var shakingBack = cc.MoveTo(2, cc.p(loginItemPosX - 10, loginItemPosY)).easing(cc.easeBackInOut());
                    var shakingSeq = cc.Sequence(cc.DelayTime(0.1), shaking, shakingBack);
                    loginItem.runAction(shakingSeq.repeatForever());
                }, loginItem)
            )
            ;
        loginItem.runAction(seq);


        var user = new cc.LabelTTF("用户中心", "Arial", 38);
        var pay = new cc.LabelTTF("支付", "Arial", 38);

        var userItem = new cc.MenuItemLabel(
            user, function () {
                cc.log("点击用户中心");
                my_sdk.enterPlatform();
            }, this);
        userItem.attr({
            x: size.width * 2 / 3,
            y: size.height / 2 - 120,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var payItem = new cc.MenuItemLabel(
            pay, function () {
                cc.log("点击支付");
                var info = {
                    Product_Price: "1",
                    Product_Id: "monthly",
                    Product_Name: "gold",
                    Server_Id: "13",
                    Product_Count: "1",
                    Role_Id: "1001",
                    Role_Name: "asd"
                };
                my_sdk.pay(info);
            }, this);
        payItem.attr({
            x: size.width * 2 / 3,
            y: size.height / 2 - 50,
            anchorX: 0.5,
            anchorY: 0.5
        });


        var menu = new cc.Menu(closeItem, loginItem, userItem, payItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);


        //var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        //helloLabel.x = size.width / 2;
        //helloLabel.y = 0;
        //this.addChild(helloLabel, 5);

        //this.sprite = new cc.Sprite(res.HelloWorld_png);
        //this.sprite.attr({
        //    x: size.width / 2,
        //    y: size.height / 2,
        //    scale: 0.5,
        //    rotation: 180
        //});
        //this.addChild(this.sprite, 0);

        //this.sprite.runAction(
        //    cc.sequence(
        //        cc.rotateTo(2, 0),
        //        cc.scaleTo(2, 1, 1)
        //    )
        //);
        //helloLabel.runAction(
        //    cc.spawn(
        //        cc.moveBy(2.5, cc.p(0, size.height - 40)),
        //        cc.tintTo(2.5, 255, 125, 0)
        //    )
        //);
        return true;
    }


})


var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});




