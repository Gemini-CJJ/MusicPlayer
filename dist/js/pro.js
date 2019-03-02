(function($, root) {
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var startTime,
        lastPer = 0;
  //渲染每一首歌的总时间
    function renderAllTime(time) {
        lastPer = 0;
        curDuration = time;
        time = formatTime(time);
        $scope.find(".all-time").html(time);
    }
    //时间格式转换
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        if( m < 10) {
            m = '0' + m;
        }
        if( s < 10) {
            s = '0' + s;
        }
       
        return m + ':' + s
    }
    //开始时间
    function start(p) {
        lastPer = p === undefined ? lastPer : p;
        cancelAnimationFrame(frameId);  //没加会出现音乐停时间不停
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
           if(percent <= 1){
            frameId = requestAnimationFrame(frame);  //根据刷新频率执行
            update(percent);
           } else{
            cancelAnimationFrame(frameId);
            $scope.find('next-btn').trigger('click'); //自动触发下一首
           }
        }
        frame();
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
    }

    //更新区域  左侧时间 + 进度条运动
    function update(per) {
        var curTime = curDuration * per;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);
        var perX = (per - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform: 'translateX(' + perX + ')'
        })

    }

  root.pro = {
      renderAllTime: renderAllTime,
      start: start,
      stop: stop,
      update: update,
  }
})(window.Zepto, window.player || (window.player = {}));
