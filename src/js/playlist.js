(function($,root) {
    var $scope = $(document.body);
    var control;
    var $playList = $("<div class = 'play-list'>"+
    "<div class = 'play-header'>播放列表</div>"+
    "<ul class = 'list-wrapper'></ul>"+
    "<div class ='close-btn'>关闭</div>"+
    "</div>")

    function renderList(songList) {
        var html ='';
        for(var i = 0; i < songList.length; i++){
            html += "<li><h3>"+songList[i].song+"-<span>"+songList[i].singer+"</span></h3></li>"
        }
        $playList.find('ul').html(html);
        $scope.append($playList);
        bindEvent();
    };
    function show(controlManager) {
        control = controlManager;
        $playList.addClass("show");
        singSong(control.index);
    }
    function bindEvent() {
      $playList.on('click',".close-btn",function(){

          $playList.removeClass("show");
      })
      $playList.find('li').on('click',function(){
          var index = $(this).index();
          singSong(index);
          control.index = index;
          $scope.trigger("play:change",[index,true]);
          $scope.find(".play-btn").addClass("pause");
          setTimeout(function(){
              $playList.removeClass("show")
          },200);
      })
    }
        function singSong(index) {
            $playList.find(".sign").removeClass("sign");
            $playList.find("ul li").eq(index).addClass("sign");
        }
    root.playList = {
        renderList : renderList,
        show: show
    }

})(window.Zepto, window.player || (window.player = {}));