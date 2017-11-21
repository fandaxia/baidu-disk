// 主要函数（DOM）

/*
* 8-181行：右键菜单相关函数
* */
// 右键菜单项回调函数
var contextmenuCallback = {
    "reload" : function () {
        viewId(nowId)
        data.menu.main[2].disable = true
        $('.fresh-cover').show(0).delay(500).hide(0)
    },
    "openFolder" : function () {
        var id = $('.file').filter('.active').eq(0).data('item').id;
        viewId(id)
    },
    "createFolder": function () {
       addFileData('folder','新建文件夹');
       cancelPaste()
    },
    "delFiles": function () {
        $('.file').filter('.active').each(function () {
            delFileData($(this).data('item').id);
        });
        viewId(nowId);
        hideCheckInfo()
    },
    "thumbView" :function () {
        if($('.view-mode .iconR').hasClass('icon-list')){
            toggleViewMode()
        }
    },
    "listView" : function () {
        if($('.view-mode .iconR').hasClass('icon-thumb')){
            toggleViewMode()
        }
    },
    "rename": function () {
        var fileName = $('.file.active').find('.file-name');
        var renameBox = $('.file.active').children('.rename-box');
        var input = renameBox.children('.rename-text');
        renameBox.show()
        input.val(fileName.html()).focus();
        cancelPaste()
    },
    "copy" : function () {
        cancelPaste()
        addPasteData('copy')
        $('.file.active').addClass('move')
        removeFilesActive()
    },
    "cut" : function () {
        cancelPaste()
        addPasteData('cut')
        $('.file.active').addClass('move')
        removeFilesActive()
    },
    "paste" : function () {
        if(pasteData.type === 'copy'){
            var files = pasteData.father.concat(pasteData.children)
            var addNum = getMaxId() - getMinId(files) + 1;
            pasteData.father.forEach(function (item) {
                addFileData(item.type,item.name,item.id+addNum,item.ext)
            })
            pasteData.children.forEach(function (item) {
                addFileData(item.type,item.name,item.id+addNum,item.ext,item.pid+addNum)
            })
        }
        if(pasteData.type === 'cut'){
            pasteData.father.forEach(function (item) {
                $.each(data.file,function (index,value) {
                    if(value.id === item.id){
                        value.pid = nowId
                        value.time = $.now()
                    }
                })
            })
        }
        viewId(nowId)
        data.menu.main[2].disable = true
    }
};
// 生成右键菜单DOM
function addLis(father,menuData) {
    var ul = $('<ul class="list-box"></ul>');
    menuData.forEach( function(item) {
        var li;
        if(!!item.name&&item.disable){
            li = $('<li class="list disabled">'+item.name+'</li>');
        } else if(!!item.name){
            li = $('<li class="list usable">'+item.name+'</li>');
        } else {
            li = $('<li class="divider"><div class="line"></div></li>');
        }
        // 递归生成子菜单
        if(item.childMenu){
            addLis(li,item.childMenu);
        }
        // 给li添加事件
        !item.disable && setLiEv(li,item);
        ul.append(li);
    } );
    father.append(ul);
}
// 右键菜单项绑定事件
function setLiEv(li,item) {
    li.mouseenter(function () {
        var childList = $(this).children('ul').eq(0)
        if(!!childList.length){
            childList.show();
            resetChildMenuPos(childList)
        }
    });
    li.mouseleave(function () {
        var childList = $(this).children('ul').eq(0);
        !!childList.length && childList.hide()
    });
    li.mousedown(function (e) {
        e.stopPropagation()
    });
    if(!!item.callback){
        li.click(function () {
            hideContextMenu();
            contextmenuCallback[item.callback]();
        })
    }
}
function showContextmenu(e, menuData) {
    e.preventDefault();
    e.stopPropagation();
    var ctm = $('#contextmenu-box');
    ctm.show().html('');
    addLis(ctm,menuData);
    ctm.children().eq(0).show().css({
        'left' : e.clientX,
        'top' : e.clientY
    });
    resetMenuPos(ctm.children().eq(0));
}
function hideContextMenu() {
    $('#contextmenu-box').hide()
}
function showTypeMenu(e,type) {
    switch (type) {
        case 'files':
            showContextmenu(e,data.menu.filesMenu);
            break;
        case 'folder':
            showContextmenu(e,data.menu.folderMenu);
            break;
        default:
            showContextmenu(e,data.menu.otherMenu);
    }
}
// 右键菜单超出视区处理
function resetMenuPos(menu) {
    var x = parseInt(menu.css('left'));
    var y = parseInt(menu.css('top'));
    var maxX = $(window).width()- menu.outerWidth();
    var maxY = $(window).height() - menu.outerHeight();
    x = Math.min(x,maxX);
    y = y>maxY?y-menu.height():y;
    menu.css({
        'left' : x + 'px',
        'top' : y + 'px'
    })
}
// 子菜单超出视区处理
function resetChildMenuPos(childMenu) {
    var rect = childMenu.parent()[0].getBoundingClientRect();
    if(rect.right > $(window).width() - childMenu.outerWidth()){
        childMenu.css('left', -(childMenu.outerWidth() - 2) +'px')
    } else {
        childMenu.css('left', childMenu.parent().outerWidth() - 2 +'px')
    }
    if(rect.top > $(window).height() - childMenu.outerHeight()){
        childMenu.css('top', childMenu.parent().outerHeight() - childMenu.outerHeight() + 3 + 'px')
    } else {
        childMenu.css('top', '-3px')
    }
}

// 切换视图模式
function toggleViewMode() {
    viewId(nowId)
    $('.view-mode .iconR').toggleClass('icon-thumb icon-list');
    $('#thumb-viewBox').toggle();
    $('#list-viewBox').toggle();
    data.menu.main[2].disable = true
}
function changeLoadInfo() {
    var num = getChildren(nowId).length;
    $('.total-num').html(`全部加载共${num}个`)
}
function viewId(id) {
    nowId = id;
    createPath(id);
    var fileList = getChildren(id);
    view(fileList);
    changeLoadInfo()
}
// 文件DOM渲染
function view(data) {
    $('#thumb-viewBox .files-box').html('');
    $('#list-viewBox .files-box').html('');
    data.forEach(function(item) {
        var tDiv = $(`<div class="file ${item.type}">
                    <div class="bg"></div>
                    <div class="file-name-box"><span class="file-name">${item.name}</span><span>${item.ext}</span></div>
                    <i class="file-check icon-yes2"></i>
                    <div class="rename-box">
                        <input type="text" class="rename-text" value="">
                        <div class="rnc">
                            <i class="icon icon-yes"></i>
                        </div>
                        <div class="rnc">
                            <i class="icon icon-no"></i>
                        </div>
                    </div>
                    <div class="file-cover"></div>
                </div>`);
        setFilesEv(tDiv,item);
        $('#thumb-viewBox .files-box').append(tDiv);
        var lDiv = $(`<div class="file ${item.type}">
                    <div class="bg"></div>
                    <div class="file-name-box"><span class="file-name">${item.name}</span><span>${item.ext}</span></div>
                    <i class="file-check icon-yes"></i>
                    <div class="rename-box">
                        <input type="text" class="rename-text" value="">
                        <div class="rnc">
                            <i class="icon icon-yes"></i>
                        </div>
                        <div class="rnc">
                            <i class="icon icon-no"></i>
                        </div>
                    </div>
                    <div class="left"></div>
                    <div class="middle"><span class="size">-</span></div>
                    <div class="right"><span class="file-time">${formatDate(item.time)}</span></div>
                </div>`);
        setFilesEv(lDiv,item);
        $('#list-viewBox .files-box').append(lDiv)
    })
}
// 文件绑定事件
function setFilesEv(obj,item) {
    obj.data('item',item);
    obj.mouseenter(function () {
        obj.addClass('hover');
    });
    obj.mouseleave(function () {
        obj.removeClass('hover');
    });
    obj.children('.file-check').click(function (e) {
        e.stopPropagation();
        obj.toggleClass('active');
        !!$('.file').filter('.active').length? showCheckInfo(): hideCheckInfo()
    });
    obj.contextmenu(function (e) {
        var activeFiles = $('.file').filter('.active');
        if(obj.hasClass('active')){
            activeFiles.length >= 2? showTypeMenu(e,'files'): showTypeMenu(e,item.type)
        } else {
            activeFiles.removeClass('active');
            obj.addClass('active');
            showTypeMenu(e,item.type)
        }
        showCheckInfo()
    });
    if(item.type == 'folder'){
        obj.click(function () {
            viewId(item.id)
        })
    }
    var renameBox = obj.children('.rename-box');
    var input = renameBox.children('.rename-text');
    renameBox.bind('mousedown click',function (e) {
        e.stopPropagation()
    })
    renameBox.find('.icon-yes').click(function () {
        if(!!findNameSameTimes(item.type,input.val(),item.name)){
            alert("此目录下存在同名文件！")
        } else {
            $.each(data.file,function (index,value) {
                if(value.id === item.id){
                    value.name = input.val()
                    value.time = $.now()
                }
            })
            renameBox.hide()
            viewId(nowId)
        }
    });
    renameBox.find('.icon-no').click(function () {
        renameBox.hide()
    });
    obj.children('.file-cover').bind('mouseenter mouseleave click',function (e) {
        e.stopPropagation()
    }).contextmenu(function (e) {
        e.stopPropagation();
        showContextmenu(e,data.menu.main);
    })
}
function hideRenameBox() {
    $('.rename-box').filter(':visible').hide()
}
function removeFilesActive() {
    $('.file').removeClass('active');
    hideCheckInfo()
}
function addFilesActive() {
    if($('#thumb-viewBox').is(':visible')){
        $('#thumb-viewBox .file').addClass('active')
    } else {
        $('#list-viewBox .file').addClass('active')
    }
    showCheckInfo()
}
function showCheckInfo() {
    var num = $('.file').filter('.active').length;
    $('.check-info').html(`已选中${num}个文件/文件夹`).show()
}
function hideCheckInfo() {
    $('.check-info').hide()
}
// 渲染path路由DOM
function createPath(id) {
    if(id === 0){
        $('.main-path').eq(0).html('<span>全部文件</span>')
    } else {
        var info = getInfo(id);
        $('.main-path').eq(0).html('<a class="backBtn" href="javascript:;">返回上一级</a><span>|</span><a class="toMain" href="javascript:;">全部文件</a>');
        $('.backBtn').eq(0).click(function () {
            viewId(info.pid)
        });
        $('.toMain').eq(0).click(function () {
            viewId(0)
        });
        var ul = $('<ul class="path-list"></ul>');
        var pathList = getParents(id);
        if(pathList.length > 3){
            var overLi = $('<li><span>></span><span>...</span></li>');
            ul.append(overLi)
        }
        pathList.slice(-3).forEach(function (item) {
            var li = $('<li><span>></span><a href="javascript:;">'+item.name +'</a></li>');
            li.click(function () {
                viewId(item.id)
            });
            ul.append(li)
        });
        var lastLi = $('<li><span>></span><span>'+info.name +'</span></li>');
        ul.append(lastLi);
        $('.main-path').eq(0).append(ul)
    }
}
function cancelPaste() {
    $('.file').removeClass('move')
    data.menu.main[2].disable = true
}

// function createTree(father,id) {
//     var ul = $('<ul class="level-box"></ul>');
//     getChildren(id).forEach( function(item) {
//         var li;
//         li = $('<li class="tree-li">'+item.name+'</li>');
//         if(!!getChildren(item.id).length){
//             createTree(li,item.id);
//         }
//         ul.append(li);
//     } );
//     father.append(ul);
// }