$('#main').contextmenu(function (e) {
    showContextmenu(e,data.menu.main);
    removeFilesActive()
});
$(document).mousedown(function () {
    hideContextMenu()
    hideRenameBox()
});
$('.create-folder').click(function () {
    addFileData('folder','新建文件夹');
    cancelPaste()
});
$('.view-mode .iconR').click(function () {
    toggleViewMode()
});
$('.check-all .icon-check').click(function () {
    $(this).toggleClass('icon-yes');
    if($(this).hasClass('icon-yes')){
        addFilesActive()
    } else {
        removeFilesActive()
    }
});
var nowId = 0;
viewId(nowId);
// 剪贴板
var pasteData = {
    father: [],
    children: [],
    type: ''
}