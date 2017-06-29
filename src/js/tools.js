$(document).ready(function() {
    // 声明函数handleToolsData，处理服务端成功返回的数据
    var handleAjaxData = (data, element, className) => {
        $(element).empty();
        const len = data.length;
        data.forEach((d, index) => {
            const isLastItem = len > 0 && index === len - 1;
            const css = isLastItem ? className : '';
            const html = createHtml(d, css);
            $(element).append(html);
        });
    };

    // 声明函数createHtml, 生成数据模版
    var createHtml = (data, css) => {
        return `<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="tool-box ${css}">
          <div class="tool-header">
            <div class="tool-header-title">
              <h1>${data.title}</h1>
              <p>发布时间：<span>${data.time}</span></p>
            </div>
            <div class="tool-header-icon">
              <span class="icon-img-mac">
                <img src="../assets/mac.png" alt="MAC" />
              </span>
              <span class="icon-txt">
                <a href="${data.downloadAddrMac}" target="_blank">MAC版下载</a>
              </span>
            </div>
            <div class="tool-header-icon">
              <span class="icon-img-win">
                <img src="../assets/win.png" alt="WIN" />
              </span>
              <span class="icon-txt">
                <a href="${data.downloadAddrWin}" target="_blank">WIN版下载</a>
              </span>
            </div>
          </div>
          <div class="tool-content">
            <img src="${data.imgUrl}" alt="${data.alt}"/>
            <p>${data.content}</p>
          </div>
        </div>
        </div>`;
    };

    // 声明函数handleActive, 处理按钮活动状态的切换展现，并提供callback函数处理额外需求
    var handleActive = (element, className, callback) => {
        $(element).click(function () {
            if ($(this).hasClass(className)) {
                return;
            }
            $(element).removeClass(className);
            $(this).addClass(className);
            if (callback) {
                callback.bind(this)();
            }
        });
    };

    // 页面刷新时，获取数据来展现
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:3000/data?pageIndex=0',
        success: (results, status) => {
            handleAjaxData(results, '#tools', 'lastClass');
        },
        error: () => { }
    });

    // 点击工具栏按钮，切换活动状态
    handleActive('.wraper ul.banner li', 'active');

    // 点击分页按钮，切换活动状态，并发送请求获取该页数据来展现
    handleActive('li.page', 'active-page', function () {
        const pageIndex = $(this).text() - 1;
        $.ajax({
            type: 'get',
            url: `http://127.0.0.1:3000/data?pageIndex=${pageIndex}`,
            success: (results, status) => {
                handleAjaxData(results, '#tools', 'lastClass');
            },
            error: () => { }
        });
    });
});
