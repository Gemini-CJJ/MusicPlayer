var $ = window.Zepto;
var root = window.player;
var $scope =$(document.body); 
var songList;
var controlManger;
var audio = new root.audioControl();

    function bindEvent(){
        $scope.on("play:change",function(event,index,flag){
            audio.getAudio(songList[index].audio);
            if(audio.status == "play"||flag){
                audio.play();
                root.pro.start();
            }
                // root.pro.stop();
            root.pro.renderAllTime(songList[index].duration);
            root.render(songList[index]);
            root.pro.update(0);
        })
        $scope.on("click",".prev-btn",function(){
         var index = controlManger.prev();
            $scope.trigger("play:change",index);
        })
        $scope.on("click",".next-btn",function(){
          var index = controlManger.next();
            $scope.trigger("play:change",index);
        })
        $scope.on("click",".play-btn",function(){
            if(audio.status == "play"){ //暂停
                audio.pause();
                root.pro.stop();
            }else{                  //开始
                root.pro.start();
                audio.play();
            }
            $(this).toggleClass("pause");
        })
        $scope.on("click",".list-btn",function(){
            root.playList.show(controlManger);
        }) 
    }

    //实现拖拽
    function bindTouch() {
        var $slidePoint = $scope.find('.slider-point');
        var offset = $scope.find('.pro-bottom').offset();
        var left = offset.left;
        var width = offset.width;
        $slidePoint.on('touchstart',function(){
            root.pro.stop();
        }).on('touchmove',function(e){
            var x = e.changedTouches[0].clientX;
            var per = (x - left) / width;
            if(per > 1 || per < 0){
                per = 0;
            }
            root.pro.update(per);
        }).on('touchend',function(e){
            var x = e.changedTouches[0].clientX;
            var per = (x - left) / width;
            if(per > 1 || per < 0){
                per = 0;
            }
            var curTime = per * songList[controlManger.index].duration;
                audio.playTo(curTime);
                $scope.find('.play-btn').addClass('pause');
                root.pro.start(per);
        })
    }

   function getData(url){
       $.ajax({
           type: "GET",
            url: url,
            success: function(data){
                root.render(data[0]);
                songList = data;
                bindEvent();
                bindTouch();
                root.playList.renderList(data);
                controlManger =new root.controlManger(data.length);
                $scope.trigger("play:change",0);
            },
            error:function(){
                console.log("error");
            }
       })
   }
   getData("../mock/data.json");











