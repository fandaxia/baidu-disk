// 数据操作
function getInfo(id) {
    return data.file.filter(function (item) {
        return item.id === id;
    })[0];
}
function getChildren(id){
    return data.file.filter(function(item) {
        return item.pid === id;
    })
}
// 获取所有子数据
function getTree(id) {
    var children = getChildren(id);
    var data = [];
    children.forEach(function (item) {
        data.push(item);
        data = data.concat( getTree(item.id));
    });
    return data;
}
function getParent(id) {
    var info = getInfo(id);
    return getInfo(info.pid);
}
function getParents(id) {
    // 保存所有父级数据
    var parents = [];

    // 获取父级
    var parentInfo = getParent(id);
    // 如果父级信息存在
    if (parentInfo) {
        // 把当前父级的信息保存到parents里面
        parents.push(parentInfo);
        var more = getParents(parentInfo.id);
        parents = more.concat(parents);
    }
    return parents;
}
// 找出指定类型，文件名的同名次数
function findNameSameTimes(type,str,exclude) {
    var exclude = exclude || '';
    var nameArr = [];
    var nub = 0;
    var thisStr = str;
    data.file.forEach(function (item) {
        if(item.pid == nowId&&item.type == type&&item.name != exclude){
            nameArr.push(item.name);
        }
    });
    function ifSameaddNub(str) {
        for(var i = 0; i < nameArr.length; i++){
            if(str == nameArr[i]){
                nub++;
                str = thisStr+`(${nub+1})`;
                nameArr.splice(i,1);
                ifSameaddNub(str);
                break;
            }
        }
    }
    ifSameaddNub(str);
    return nub;
}
function getMaxId() {
    var maxId = 0;
    data.file.forEach(function (item) {
        if (item.id > maxId) {
            maxId = item.id;
        }
    });
    return maxId;
}
function getMinId(array) {
    var minId = 999999;
    array.forEach(function (item) {
        if(item.id < minId) {
            minId = item.id
        }
    });
    return minId
}
// 新建文件数据
function addFileData(type,name,id,ext,pid) {
    var newfile = {};
    var num = findNameSameTimes(type,name);
    newfile.type = type;
    newfile.name = num?name+`(${num+1})`:name;
    newfile.id = id || getMaxId()+1;
    newfile.ext = ext || "";
    newfile.pid = pid || nowId;
    newfile.time = $.now()
    data.file.push(newfile);
    viewId(nowId);
}
function delFileData(id){
    for(var i = 0; i < data.file.length; i++){
        if(data.file[i].id === id){
            data.file.splice(i,1);
        }
    }
}
function formatDate(ms) {
    var time = new Date(ms);
    var y = time.getFullYear();//年
    var m = addZero(time.getMonth() + 1);//月
    var d = addZero(time.getDate());//日
    var h = addZero(time.getHours());//时
    var mm = addZero(time.getMinutes());//分
    return y+"-"+m+"-"+d+" "+h+":"+mm
}
function addZero(num) {
    return num<10? '0'+num: num
}
function addPasteData(type) {
    var father = [];
    var children = [];
    $('.file.active').each(function () {
        father.push($(this).data('item'))
        children = children.concat(getTree($(this).data('item').id))
    })
    pasteData.father = father;
    pasteData.children = children;
    pasteData.type = type;
    data.menu.main[2].disable = false
}