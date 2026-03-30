// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,

    slideCount:6,
    showView:6,
    totalLen:6,
    current:0,
    moveX:0,
    step:20,

    state: 'paused',
    bgMainColor: "#222222", // 默认兜底背景色
    
    // 播放模式：random(随机播放), sequence(顺序播放), single(单曲循环)
    playMode: 'sequence',
    playModeIcon: '顺序播放', // 播放模式图标名称

    playlist: [{
      id: 1,
      title: '爱就一个字',
      singer: '张信哲',
      src: 'https://music.gdstudio.org/cache/1167460613.256.m4a',
      coverImgUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/9b/84/7c/9b847cfa-fb3e-7ed0-fa67-2180a0c409ba/4716331013621.jpg/300x300bb.jpg',
      lrcUrl: 'http://localhost:3000/lrc/1167460613.lrc'
    }, {
      id: 2,
      title: '奏鸣曲',
      singer: '莫扎特',
      src: 'http://localhost:3000/2.mp3',
      coverImgUrl: '/images/cover.jpg',
      lrcUrl: ''
    }, {
      id: 3,
      title: '欢乐颂',
      singer: '贝多芬',
      src: 'http://localhost:3000/1.mp3',
      coverImgUrl: '/images/cover.jpg',
      lrcUrl: ''
    }, {
      id: 4,
      title: '爱之梦',
      singer: '李斯特',
      src: 'http://localhost:3000/2.mp3',
      coverImgUrl: '/images/cover.jpg',
      lrcUrl: ''
    }],
    state: 'paused',
    playIndex: 0,
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: '/images/cover.jpg',
    },
    lyricList: [],
    currentIndex: -1,
    scrollTop: 0,
    lineHeight: 50
  },

  // 根据图片url 获取画面显眼主色调
getCoverMainColor(imgUrl) {
  return new Promise((resolve) => {
    if(!imgUrl){
      resolve("#333333");
      return;
    }
    // 创建离屏canvas
    const query = this.createSelectorQuery();
    query.select('#colorCanvas')
    .fields({ node: true, size: true })
    .exec((res) => {
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      const img = canvas.createImage();
      // 小程序必须开启
      img.src = imgUrl;
      img.onload = () => {
        // 缩小绘制，提升取色速度
        canvas.width = 80;
        canvas.height = 80;
        ctx.drawImage(img,0,0,80,80);
        // 获取像素数据
        const imgData = ctx.getImageData(0,0,80,80).data;
        let colorMap = {};
        let maxCount = 0;
        let mainR = 80,mainG=80,mainB=80;

        // 遍历像素统计颜色
        for(let i=0;i<imgData.length;i+=4){
          let r = imgData[i];
          let g = imgData[i+1];
          let b = imgData[i+2];
          // 过滤过暗/过亮杂色
          if((r+g+b)<50 || (r+g+b)>700) continue;
          const key = `${Math.round(r/10)},${Math.round(g/10)},${Math.round(b/10)}`;
          if(!colorMap[key]) colorMap[key] = {r,g,b,count:0};
          colorMap[key].count++;
          if(colorMap[key].count > maxCount){
            maxCount = colorMap[key].count;
            mainR = colorMap[key].r;
            mainG = colorMap[key].g;
            mainB = colorMap[key].b;
          }
        }
        const hex = this.rgbToHex(mainR,mainG,mainB);
        resolve(hex);
      }
      img.onerror = ()=>{
        resolve("#222222");
      }
    })
})
},

// rgb 转 十六进制
rgbToHex(r,g,b){
  const toHex = (c)=> ("0"+c.toString(16)).slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
},

setMusic: function(index) {
  var music = this.data.playlist[index]
  this.audioCtx.src = music.src
  this.getNetLrc(music.lrcUrl || '')

  this.setData({
    playIndex: index,
    'play.title': music.title,
    'play.singer': music.singer,
    'play.coverImgUrl': music.coverImgUrl,
    'play.currentTime': '00:00',
    'play.duration': '00:00',
    'play.percent': 0
  });

  // ========= 自动提取封面主色更新背景 =========
  this.getCoverMainColor(music.coverImgUrl).then(color=>{
    this.setData({
      bgMainColor: color
    })
  })
},

  // 网络请求歌词
  getNetLrc(lrcUrl) {
    if (!lrcUrl) {
      this.setData({ lyricList: [], currentIndex: -1, scrollTop: 0 });
      return;
    }

    wx.request({
      url: lrcUrl,
      timeout: 3000,
      success: (res) => {
        const list = this.parseLrc(res.data || '');
        this.setData({ lyricList: list, currentIndex: -1, scrollTop: 0 });
      },
      fail: () => {
        this.setData({ lyricList: [], currentIndex: -1 });
      }
    });
  },

  // 绝对安全解析歌词
  parseLrc(lrc) {
    if (!lrc) return [];
    const list = [];
    const lines = lrc.split('\n');
    const reg = /\[(\d+):(\d+)\.(\d+)\]/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const m = line.match(reg);
      if (!m) continue;

      const time = parseInt(m[1]) * 60 + parseFloat(m[2] + '.' + m[3]);
      const text = line.replace(reg, '').trim();
      if (text) list.push({ time, text });
    }
    return list;
  },

  swiperChange(e){
    let cur = e.detail.current
    this.setData({ current:cur, moveX: -cur * this.data.step })
  },

  getDotStyle(index){
    const {current} = this.data
    let diff = Math.abs(index - current)
    let scale = 1 - diff * 0.25
    let opacity = 1 - diff * 0.3
    scale = Math.max(scale, 0.5)
    opacity = Math.max(opacity, 0.2)
    let bg = diff === 0 ? '#ffffff' : 'rgba(255,255,255,0.3)'
    let shadow = diff === 0 ? '0 0 8rpx rgba(255,255,255,0.8)' : 'none'
    return `transform:scale(${scale});opacity:${opacity};background:${bg};box-shadow:${shadow};`
  },

  getScale(index){
    const {current} = this.data
    let diff = Math.abs(index - current)
    let scale = 1 - diff * 0.25
    scale = Math.max(scale, 0.5)
    return scale
  },

  changeItem: function(e) {
    this.setData({ item: e.target.dataset.item })
  },

  changeTab: function(e) {
    this.setData({ 
      tab: e.detail.current,
      item: e.detail.current
    })
  },

  audioCtx: null,
  onReady: function() {
    this.audioCtx = wx.createInnerAudioContext()
    this.setMusic(0)
    var that = this

    this.audioCtx.onError(function() {
      console.log('播放失败')
    })

    this.audioCtx.onEnded(function() {
      that.next()
    })

    this.audioCtx.onTimeUpdate(function() {
      that.setData({
        'play.duration': formatTime(that.audioCtx.duration),
        'play.currentTime': formatTime(that.audioCtx.currentTime),
        'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
      });
    
      // 修复：解构出 lineHeight，删除重复声明
      const { lyricList, lineHeight } = that.data;
      if (!lyricList.length) return;
    
      const currentTime = that.audioCtx.currentTime;
      let targetIndex = -1;
    
      // 匹配当前播放行
      for (let i = 0; i < lyricList.length; i++) {
        if (currentTime >= lyricList[i].time) {
          targetIndex = i;
        }
      }
    
      // 没变就不刷新，防止乱滚
      if (targetIndex === that.data.currentIndex) return;

      // ===================== 修复：歌词绝对居中 + 无重复变量 =====================
      let scrollTop = 0;
      if (targetIndex !== -1) {
        const scrollViewHeight = 250; 
        // 核心：使用 data 中的 lineHeight，不重复定义
        scrollTop = targetIndex * lineHeight - (scrollViewHeight - lineHeight) / 2;
        // 边界防护
        scrollTop = Math.max(scrollTop, 0);
        const totalLyricHeight = lyricList.length * lineHeight;
        const maxScrollTop = totalLyricHeight - scrollViewHeight;
        scrollTop = Math.min(scrollTop, maxScrollTop);
      }
      // ==========================================================================
    
      that.setData({
        currentIndex: targetIndex,
        scrollTop: scrollTop
      });
    });

    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time) % 60
      return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
    }
  },

  setMusic: function(index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.getNetLrc(music.lrcUrl || '')

    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    });
  },

  play: function() {
    this.audioCtx.play()
    this.setData({ state: 'running' })
  },

  pause: function() {
    this.audioCtx.pause()
    this.setData({ state: 'paused' })
  },

  next: function() {
    var index;
    if (this.data.playMode === 'random') {
      // 随机播放
      index = Math.floor(Math.random() * this.data.playlist.length);
    } else if (this.data.playMode === 'single') {
      // 单曲循环
      index = this.data.playIndex;
    } else {
      // 顺序播放
      index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1;
    }
    this.setMusic(index)
    if (this.data.state === 'running') this.play()
  },

  // 上一首
  prev: function() {
    var index = this.data.playIndex <= 0 ? this.data.playlist.length - 1 : this.data.playIndex - 1
    this.setMusic(index)
    if (this.data.state === 'running') this.play()
  },

  // 切换播放模式
  togglePlayMode: function() {
    const modes = ['sequence', 'random', 'single'];
    const modeNames = ['顺序播放', '随机播放', '单曲循环'];
    const currentIndex = modes.indexOf(this.data.playMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    this.setData({
      playMode: modes[nextIndex],
      playModeIcon: modeNames[nextIndex]
    });
  },

  sliderChange: function(e) {
    var second = e.detail.value * this.audioCtx.duration / 100
    this.audioCtx.seek(second)
  },

  change: function(e) {
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  }
})