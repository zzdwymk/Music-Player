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
    contrastColor: "#ffffff", // 高对比度前景色
    lyricDimColor: "rgba(255,255,255,0.5)", // 歌词淡化色
    btnBgColor: "rgba(255,255,255,0.15)", // 按钮背景色
    
    // 播放模式：random(随机播放), sequence(顺序播放), single(单曲循环)
    playMode: 'sequence',
    playModeIcon: '顺序播放', // 播放模式图标名称

    // 是否显示歌词
    showLyric: true,
    showLyricIcon: '歌词', // 歌词图标名称

    // 是否显示播放模式菜单
    showPlayModeMenu: false,

    playlist: [{
      id: 1,
      title: '爱就一个字',
      singer: '张信哲',
      src: 'http://localhost:3000/music/Jeff Chang - 愛就一個字.m4a',
      coverImgUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/9b/84/7c/9b847cfa-fb3e-7ed0-fa67-2180a0c409ba/4716331013621.jpg/300x300bb.jpg',
      lrcUrl: 'http://localhost:3000/lrc/Jeff Chang - 愛就一個字.lrc'
    }, {
      id: 2,
      title: "Nothing's Gonna Change My Love for You",
      singer: 'George Benson',
      src: "http://localhost:3000/music/George Benson - Nothing's Gonna Change My Love for You.mp3",
      coverImgUrl: 'https://p3.music.126.net/tds001mQz4CkkGajAzh1IQ==/109951163903775215.jpg',
      lrcUrl: "http://localhost:3000/lrc/George Benson - Nothing's Gonna Change My Love for You.lrc"
    }, {
      id: 3,
      title: '青苹果乐园',
      singer: '小虎队',
      src: 'http://localhost:3000/music/小虎队 - 青苹果乐园.mp3',
      coverImgUrl: 'https://p3.music.126.net/s_71yG6rMSyxEbhhnrrG8w==/109951172027755684.jpg',
      lrcUrl: 'http://localhost:3000/lrc/小虎队 - 青苹果乐园.lrc'
    }, {
      id: 4,
      title: '日夕回味',
      singer: '林姗姗',
      src: 'http://localhost:3000/music/林姗姗 - 日夕回味.mp3',
      coverImgUrl: 'https://p3.music.126.net/WIsoeHHkUpRKGPgQIm-kew==/109951163941164048.jpg',
      lrcUrl: 'http://localhost:3000/lrc/林姗姗 - 日夕回味.lrc'
    }, {
      id: 5,
      title: 'LUV',
      singer: 'Apink',
      src: 'http://localhost:3000/music/Apink - LUV.mp3',
      coverImgUrl: 'https://p3.music.126.net/3pgRf5zaReXpQySFqOTFaw==/109951170927813358.jpg',
      lrcUrl: 'http://localhost:3000/lrc/Apink - LUV.lrc'
    }, {
      id: 6,
      title: 'レイニーブルー',
      singer: '德永英明',
      src: 'http://localhost:3000/music/德永英明 - レイニーブルー.mp3',
      coverImgUrl: 'https://p3.music.126.net/XR9uOchiC1jtxypqqcEctQ==/109951169976421500.jpg',
      lrcUrl: 'http://localhost:3000/lrc/德永英明 - レイニーブルー.lrc'
    }, {
      id: 7,
      title: '最爱',
      singer: '周慧敏',
      src: 'http://localhost:3000/music/周慧敏 - 最爱.mp3',
      coverImgUrl: 'https://p3.music.126.net/Sw5YcfgqO7V4IVq306hL8w==/109951166563037658.jpg',
      lrcUrl: 'http://localhost:3000/lrc/周慧敏 - 最爱.lrc'
    }, {
      id: 8,
      title: '不必勉强',
      singer: '齐秦',
      src: 'http://localhost:3000/music/齐秦 - 不必勉强.mp3',
      coverImgUrl: 'https://p3.music.126.net/h6oZNyUgMuyarJOYMO8uxg==/109951166655546649.jpg',
      lrcUrl: 'http://localhost:3000/lrc/齐秦 - 不必勉强.lrc'
    }, {
      id: 9,
      title: '時に愛は',
      singer: '小田和正',
      src: 'http://localhost:3000/music/小田和正 - 時に愛は.mp3',
      coverImgUrl: 'https://p3.music.126.net/BwvRPgzjBm65ipWNsOpqbw==/109951166198221057.jpg',
      lrcUrl: 'http://localhost:3000/lrc/小田和正 - 時に愛は.lrc'
    }, {
      id: 10,
      title: '安妮',
      singer: '王杰',
      src: 'http://localhost:3000/music/王杰 - 安妮.mp3',
      coverImgUrl: 'https://p3.music.126.net/cHOZJgBznifZfTT9NwlaWA==/109951170602036713.jpg',
      lrcUrl: 'http://localhost:3000/lrc/王杰 - 安妮.lrc'
    }, {
      id: 11,
      title: '口是心非',
      singer: '张雨生',
      src: 'http://localhost:3000/music/张雨生 - 口是心非.mp3',
      coverImgUrl: 'https://p3.music.126.net/1Agq_8L-YdAtr56DaZz1ng==/109951172325720333.jpg',
      lrcUrl: 'http://localhost:3000/lrc/张雨生 - 口是心非.lrc'
    }, {
      id: 12,
      title: '无名份的浪漫',
      singer: '黎明',
      src: 'http://localhost:3000/music/黎明 - 无名份的浪漫.mp3',
      coverImgUrl: 'https://p3.music.126.net/thXkupdKJtuSswDv4u-sow==/68169720928612.jpg',
      lrcUrl: 'http://localhost:3000/lrc/黎明 - 无名份的浪漫.lrc'
    }, {
      id: 13,
      title: '月半小夜曲',
      singer: '李克勤',
      src: 'http://localhost:3000/music/李克勤 - 月半小夜曲.mp3',
      coverImgUrl: 'https://p3.music.126.net/SIFuIDfMNbuY9-IQcbTz5w==/109951166890517973.jpg',
      lrcUrl: 'http://localhost:3000/lrc/李克勤 - 月半小夜曲.lrc'
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
    scrollLeft: 0,
    lineHeight: 50,
    lyricFontSize: 32,
    shouldScrollTitle: false
  },

  checkTitleScroll(title) {
    const query = wx.createSelectorQuery();
    query.select('.title-scroll').boundingClientRect();
    query.select('.title-text').boundingClientRect();
    query.exec((res) => {
      console.log('title-scroll check:', res);
      if (res[0] && res[1]) {
        const containerWidth = res[0].width;
        const textWidth = res[1].width;
        console.log('containerWidth:', containerWidth, 'textWidth:', textWidth);
        this.setData({ shouldScrollTitle: textWidth > containerWidth });
      }
    });
  },

  // 根据背景色计算高对比度前景色
  getContrastColor(bgColor) {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const contrast = luminance > 0.5 ? '#000000' : '#ffffff';
    const dim = luminance > 0.5 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
    const btnBg = luminance > 0.5 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
    return { contrast, dim, btnBg };
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
        canvas.width = 20;
        canvas.height = 20;
        ctx.drawImage(img,0,0,50,50);
        // 获取像素数据
        const imgData = ctx.getImageData(0,0,20,20).data;
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
      if (!text) continue;

      const parts = this.splitChineseEnglish(text);
      list.push({ time, parts });
    }
    return list;
  },

  // 分离中英文（保留原始顺序）
  splitChineseEnglish(text) {
    const parts = [];
    const regex = /[\u4e00-\u9fa5]+|[^\u4e00-\u9fa5]+/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      parts.push({
        text: match[0],
        isChinese: /[\u4e00-\u9fa5]/.test(match[0])
      });
    }
    return parts;
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
    var targetItem = parseInt(e.target.dataset.item);
    console.log('changeItem called, targetItem:', targetItem, 'current item:', this.data.item, 'type:', typeof targetItem, typeof this.data.item);
    if (targetItem === this.data.item) {
      console.log('Same item, returning');
      return;
    }
    console.log('Setting item to:', targetItem);
    this.setData({ item: targetItem })
  },

  changeTab: function(e) {
    console.log('changeTab called, current:', e.detail.current, 'item:', this.data.item);
    this.setData({
      tab: e.detail.current,
      item: e.detail.current
    });
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
      if (that.data.playMode === 'single') {
        that.audioCtx.seek(0);
        that.audioCtx.play();
      } else {
        that.next();
      }
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
        scrollTop: scrollTop,
        scrollLeft: 0
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

    setTimeout(() => this.checkTitleScroll(), 200);

    this.getCoverMainColor(music.coverImgUrl).then(color => {
      const { contrast, dim, btnBg } = this.getContrastColor(color);
      this.setData({ bgMainColor: color, contrastColor: contrast, lyricDimColor: dim, btnBgColor: btnBg });
    })
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
      do {
        index = Math.floor(Math.random() * this.data.playlist.length);
      } while (index === this.data.playIndex && this.data.playlist.length > 1);
    } else if (this.data.playMode === 'single') {
      index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1;
    } else {
      index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1;
    }
    this.setMusic(index)
    if (this.data.state === 'running') this.play()
  },

  // 上一首
  prev: function() {
    var index;
    if (this.data.playMode === 'random') {
      do {
        index = Math.floor(Math.random() * this.data.playlist.length);
      } while (index === this.data.playIndex && this.data.playlist.length > 1);
    } else if (this.data.playMode === 'single') {
      index = this.data.playIndex <= 0 ? this.data.playlist.length - 1 : this.data.playIndex - 1;
    } else {
      index = this.data.playIndex <= 0 ? this.data.playlist.length - 1 : this.data.playIndex - 1;
    }
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

  // 切换歌词显示
  toggleLyric: function() {
    this.setData({
      showLyric: !this.data.showLyric
    });
  },

  // 切换播放模式菜单显示
  togglePlayModeMenu: function() {
    this.setData({
      showPlayModeMenu: !this.data.showPlayModeMenu
    });
  },

  closePlayModeMenu: function() {
    if (this.data.showPlayModeMenu) {
      this.setData({
        showPlayModeMenu: false
      });
    }
  },

  // 选择播放模式
  selectPlayMode: function(e) {
    const mode = e.currentTarget.dataset.mode;
    const modeNames = { 'sequence': '顺序播放', 'random': '随机播放', 'single': '单曲循环' };
    this.setData({
      playMode: mode,
      playModeIcon: modeNames[mode],
      showPlayModeMenu: false
    });
  },

  // 阻止事件冒泡
  preventBubble: function(e) {
    console.log('preventBubble called on page:', this.data.item);
    e.stopPropagation && e.stopPropagation();
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