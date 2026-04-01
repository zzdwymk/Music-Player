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
    controlsBg: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
    controlsBorder: "1rpx solid rgba(255,255,255,0.25)",
    controlsShadow: "0 8rpx 32rpx rgba(0,0,0,0.15), inset 0 1rpx 0 rgba(255,255,255,0.2)",
    
    // 播放模式：random(随机播放), sequence(顺序播放), single(单曲循环)
    playMode: 'sequence',
    playModeIcon: '顺序播放', // 播放模式图标名称

    // 是否显示歌词
    showLyric: true,
    showLyricIcon: '歌词', // 歌词图标名称

    // 是否显示播放模式菜单
    showPlayModeMenu: false,
    prevIconSvg: '',
    nextIconSvg: '',
    playIconSvg: '',
    pauseIconSvg: '',
    playModeBtnSvg: '',
    sequenceModeSvg: '',
    randomModeSvg: '',
    singleModeSvg: '',
    lyricIconSvg: '',

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
    const controlsBg = luminance > 0.5
      ? 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)';
    const controlsBorder = luminance > 0.5
      ? '1rpx solid rgba(0,0,0,0.35)'
      : '1rpx solid rgba(255,255,255,0.28)';
    const controlsShadow = luminance > 0.5
      ? '0 8rpx 32rpx rgba(0,0,0,0.25), inset 0 1rpx 0 rgba(255,255,255,0.08)'
      : '0 8rpx 32rpx rgba(0,0,0,0.15), inset 0 1rpx 0 rgba(255,255,255,0.2)';
    return { contrast, dim, btnBg, controlsBg, controlsBorder, controlsShadow };
  },

  buildSvgDataUri(paths, color) {
    const fillColor = color || '#ffffff';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${paths.map((d) => `<path d="${d}" fill="${fillColor}"/>`).join('')}</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  },

  svgToColorDataUri(svgRaw, color) {
    const fillColor = color || '#ffffff';
    const cleaned = (svgRaw || '')
      .replace(/<\?xml[\s\S]*?\?>/g, '')
      .replace(/<!DOCTYPE[\s\S]*?>/g, '')
      .replace(/\r?\n/g, '')
      .replace(/\s{2,}/g, ' ');
    const recolored = cleaned.replace(/fill=(["'])(?!none)(.*?)\1/g, `fill="${fillColor}"`);
    return `data:image/svg+xml;utf8,${encodeURIComponent(recolored)}`;
  },

  buildControlIcons(color, mode = this.data.playMode) {
    const playSvgRaw = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1774711473784" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="49564" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m0-938.666667C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333z" fill="#e6e6e6" p-id="49565"></path><path d="M426.666667 733.866667c-8.533333 0-12.8 0-21.333334-4.266667-12.8-8.533333-21.333333-25.6-21.333333-38.4V332.8c0-17.066667 8.533333-29.866667 21.333333-38.4 12.8-8.533333 29.866667-4.266667 42.666667 4.266667l256 179.2c12.8 8.533333 17.066667 21.333333 17.066667 34.133333s-8.533333 25.6-17.066667 34.133333l-256 179.2c-4.266667 4.266667-12.8 8.533333-21.333333 8.533334z m42.666666-320v192l140.8-98.133334L469.333333 413.866667z" fill="#e6e6e6" p-id="49566"></path></svg>';
    const pauseSvgRaw = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1774711950849" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2524" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512.862059 1023.999349A511.999674 511.999674 0 0 1 313.472753 40.078252a511.999674 511.999674 0 0 1 398.778611 942.840888 508.993805 508.993805 0 0 1-199.389305 41.080209z m0-943.842844C274.396457 80.156505 81.018889 273.534073 81.018889 511.999674s193.377568 431.84317 431.84317 431.84317 431.84317-194.379524 431.843169-431.84317S750.325704 80.156505 512.862059 80.156505z" fill="#e6e6e6" p-id="2525"></path><path d="M395.63317 754.473101a40.078252 40.078252 0 0 1-40.078252-40.078252V332.649495a40.078252 40.078252 0 0 1 80.156505 0v381.745354a40.078252 40.078252 0 0 1-40.078253 40.078252zM634.098772 754.473101a40.078252 40.078252 0 0 1-40.078252-40.078252V332.649495a40.078252 40.078252 0 0 1 80.156505 0v381.745354a40.078252 40.078252 0 0 1-40.078253 40.078252z" fill="#e6e6e6" p-id="2526"></path></svg>';
    const sequenceSvgRaw = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1774801003928" class="icon" viewBox="0 0 1037 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4776" xmlns:xlink="http://www.w3.org/1999/xlink" width="202.5390625" height="200"><path d="M962.60687773 779.93661464a29.1301418 29.1301418 0 0 0-40.66082226 1e-8 345.31355391 345.31355391 0 0 1-259.7437626 121.37558994H464.96695888a345.01011504 345.01011504 0 0 1 0-690.0202292h275.52258897v100.74173994a10.92380273 10.92380273 0 0 0 16.38570498 9.71004727l206.94538125-121.37558994a10.92380273 10.92380273 0 0 0 0-18.8132168L756.87525283 63.82063408a10.92380273 10.92380273 0 0 0-16.38570498 9.71004727v82.53540087H464.96695888a402.96695888 402.96695888 0 0 0 0 805.93391778h196.62845625a402.96695888 402.96695888 0 0 0 303.43897442-138.36817266 29.1301418 29.1301418 0 0 0-2.42751182-43.69521269z" p-id="4777" fill="#e6e6e6"></path></svg>';
    const randomSvgRaw = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1774866207351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6430" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M682.48 297.633333L332.666667 752.386667A149.333333 149.333333 0 0 1 214.306667 810.666667H64a21.333333 21.333333 0 0 1 0-42.666667h150.306667a107.333333 107.333333 0 0 0 84.546666-41.633333L648.666667 271.613333A149.333333 149.333333 0 0 1 767.026667 213.333333h141.473333l-48.92-48.913333a21.333333 21.333333 0 0 1 30.173333-30.173333l85.333334 85.333333a21.333333 21.333333 0 0 1 0 30.173333l-85.333334 85.333334a21.333333 21.333333 0 0 1-30.173333-30.173334l48.92-48.913333h-141.473333a107.333333 107.333333 0 0 0-84.546667 41.633333zM64 256h150.306667a107.333333 107.333333 0 0 1 84.546666 41.633333l109.26 142.04a21.333333 21.333333 0 0 0 33.82-26L332.666667 271.613333A149.333333 149.333333 0 0 0 214.306667 213.333333H64a21.333333 21.333333 0 0 0 0 42.666667z m825.753333 432.913333a21.333333 21.333333 0 0 0-30.173333 30.173334l48.92 48.913333h-141.473333a107.333333 107.333333 0 0 1-84.546667-41.633333L573.22 584.326667a21.333333 21.333333 0 0 0-33.82 26L648.666667 752.386667a149.333333 149.333333 0 0 0 118.36 58.28h141.473333l-48.92 48.913333a21.333333 21.333333 0 0 0 30.173333 30.173333l85.333334-85.333333a21.333333 21.333333 0 0 0 0-30.173333z" fill="#e6e6e6" p-id="6431"></path></svg>';
    const singleSvgRaw = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1774866170195" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5320" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z" p-id="5321" fill="#e6e6e6"></path><path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z" p-id="5322" fill="#e6e6e6"></path></svg>';
    const lyricSvgRaw = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1774872740229" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7690" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M816.3 121.7H85.9C52.2 121.7 25 149 25 182.6v780.5c0 33.6 27.2 60.9 60.9 60.9h730.4c33.6 0 60.9-27.3 60.9-60.9V182.6c0-33.6-27.3-60.9-60.9-60.9zM213.4 269.8c33.3 28.3 76 67.2 96.1 93.6l-28.3 28.9c-18.8-25.7-60.9-67.2-94.8-96.1l27-26.4z m20.7 533.1c-5-8.8-17-23.2-23.9-28.9 11.3-9.4 33.3-31.4 33.3-62.2v-226h-96.7v-40.2h136.3V715l66.6-46.5c3.1 10.7 9.4 26.4 12.6 34.5-103.7 75.4-119.4 88-128.2 99.9z m192.8-72.8h-37.7V488.3h183.4v198.4H426.9v43.4z m-63.5-307.7V386h240.5v36.4H363.4z m329.1 342.8c0 27.6-6.3 40.8-25.1 47.7-18.8 7.5-51.5 8.2-103 8.2-1.9-11.9-8.2-30.8-14.4-42.1 40.2 1.3 77.2 0.6 87.9 0.6 10.7-0.6 14.4-3.8 14.4-15.1V320.1H347.1v-38.9h345.3v484zM435.3 516.7h104v121.6h-104V516.7zM998.9 60.9v730.4c0 33.6-27.3 60.9-60.9 60.9V109.6c0-16.8-13.6-30.4-30.4-30.4H146.8c0-33.6 27.3-79.2 60.9-79.2h730.4c33.6 0 60.8 27.3 60.8 60.9z" fill="#e6e6e6" p-id="7691"></path></svg>';
    const nextSvgRaw = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1774712084761" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3796" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M753.28 80c-26.24 0-48 21.76-48 48v304.64L295.04 140.8c-19.84-14.08-45.44-16-66.56-5.12-21.76 10.88-35.2 32.64-35.2 56.96v638.72c0 24.32 13.44 46.08 34.56 56.96 9.6 4.48 19.2 7.04 29.44 7.04 12.8 0 26.24-3.84 37.12-12.16l410.88-291.84V896c0 26.24 21.76 48 48 48s48-21.76 48-48V128c0-26.24-21.12-48-48-48zM289.28 769.28V254.72L651.52 512l-362.24 257.28z" p-id="3797" fill="#e6e6e6"></path></svg>';

    return {
      // prev 使用与 next 同一图形，配合 .prev-btn 的 180deg 旋转
      prevIconSvg: this.svgToColorDataUri(nextSvgRaw, color),
      nextIconSvg: this.svgToColorDataUri(nextSvgRaw, color),
      playIconSvg: this.svgToColorDataUri(playSvgRaw, color),
      pauseIconSvg: this.svgToColorDataUri(pauseSvgRaw, color),
      sequenceModeSvg: this.svgToColorDataUri(sequenceSvgRaw, color),
      randomModeSvg: this.svgToColorDataUri(randomSvgRaw, color),
      singleModeSvg: this.svgToColorDataUri(singleSvgRaw, color),
      lyricIconSvg: this.svgToColorDataUri(lyricSvgRaw, color),
      playModeBtnSvg: this.svgToColorDataUri(
        mode === 'random'
          ? randomSvgRaw
          : mode === 'single'
            ? singleSvgRaw
            : sequenceSvgRaw,
        color
      )
    };
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
    var targetItem = parseInt(e.currentTarget.dataset.item);
    console.log('changeItem called, targetItem:', targetItem, 'current item:', this.data.item, 'type:', typeof targetItem, typeof this.data.item);
    if (targetItem === this.data.item) {
      console.log('Same item, returning');
      return;
    }
    console.log('Setting item to:', targetItem);
    this.setData({ item: targetItem }, () => {
      if (targetItem === 0 || targetItem === 2) {
        setTimeout(() => this.checkTitleScroll(), 80);
      }
    })
  },

  changeTab: function(e) {
    console.log('changeTab called, current:', e.detail.current, 'item:', this.data.item);
    this.setData({
      tab: e.detail.current,
      item: e.detail.current
    });
    if (e.detail.current === 0 || e.detail.current === 2) {
      setTimeout(() => this.checkTitleScroll(), 80);
    }
  },

  audioCtx: null,
  onReady: function() {
    this.audioCtx = wx.createInnerAudioContext()
    this.setData(this.buildControlIcons(this.data.contrastColor))
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
      const { contrast, dim, btnBg, controlsBg, controlsBorder, controlsShadow } = this.getContrastColor(color);
      this.setData({
        bgMainColor: color,
        contrastColor: contrast,
        lyricDimColor: dim,
        btnBgColor: btnBg,
        controlsBg,
        controlsBorder,
        controlsShadow,
        ...this.buildControlIcons(contrast)
      });
    })
  },

  play: function() {
    if (this.data.state === 'paused') {
      this.audioCtx.play()
      this.setData({ state: 'running' })
    } else {
      this.audioCtx.pause()
      this.setData({ state: 'paused' })
    }
  },

  pause: function() {
    this.audioCtx.pause();
    this.setData({ state: 'paused' });
  },

  next: function() {
    const wasRunning = this.data.state === 'running';
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
    if (wasRunning) {
      this.audioCtx.play();
      this.setData({ state: 'running' });
    }
  },

  // 上一首
  prev: function() {
    const wasRunning = this.data.state === 'running';
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
    if (wasRunning) {
      this.audioCtx.play();
      this.setData({ state: 'running' });
    }
  },

  // 切换播放模式
  togglePlayMode: function() {
    const modes = ['sequence', 'random', 'single'];
    const modeNames = ['顺序播放', '随机播放', '单曲循环'];
    const currentIndex = modes.indexOf(this.data.playMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    this.setData({
      playMode: nextMode,
      playModeIcon: modeNames[nextIndex],
      ...this.buildControlIcons(this.data.contrastColor)
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
      showPlayModeMenu: false,
      ...this.buildControlIcons(this.data.contrastColor)
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