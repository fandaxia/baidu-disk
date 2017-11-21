// 虚拟数据
var data = {
    // 右键菜单数据
    menu: {
        main: [
            {
                name: "查看",
                childMenu: [
                    {
                        name: "列表",
                        callback: "listView"
                    },
                    {
                        name: "缩略图",
                        callback: "thumbView"
                    }
                ]
            },
            {
                name: "排序方式",
                childMenu: [
                    {
                        name: "名称"
                    },
                    {
                        name: "类型"
                    },
                    {
                        name: "修改日期"
                    }
                ]
            },
            {
                name: "粘贴",
                disable: true,
                callback: "paste"
            },
            {
                name: ""
            },
            {
                name: "刷新",
                callback: "reload"
            },
            {
                name: "新建文件夹",
                callback: "createFolder"
            }
        ],
        folderMenu: [
            {
                name: "打开",
                callback: "openFolder"
            },
            {
                name: "下载",
                disable: true
            },
            {
                name: ""
            },
            {
                name: "复制",
                callback: "copy"
            },
            {
                name: "剪切",
                callback: "cut"
            },
            {
                name: ""
            },
            {
                name: "重命名",
                callback: "rename"
            },
            {
                name: "删除",
                callback: "delFiles"
            },
        ],
        filesMenu: [
            {
                name: "打开",
                disable: true
            },
            {
                name: "下载",
                disable: true
            },
            {
                name: ""
            },
            {
                name: "复制",
                callback: "copy"
            },
            {
                name: "剪切",
                callback: "cut"
            },
            {
                name: ""
            },
            {
                name: "重命名",
                disable: true
            },
            {
                name: "删除",
                callback: "delFiles"
            },
        ],
        otherMenu: [
            {
                name: "打开",
                disable: true
            },
            {
                name: "下载",
                disable: true
            },
            {
                name: ""
            },
            {
                name: "复制",
                callback: "copy"
            },
            {
                name: "剪切",
                callback: "cut"
            },
            {
                name: ""
            },
            {
                name: "重命名",
                callback: "rename"
            },
            {
                name: "删除",
                callback: "delFiles"
            },
        ]

    },
    // 文件数据
    file: [
        {
            id: 1,
            pid: 0,
            type: "folder",
            name: "技术",
            ext: "",
            time: 1511115201605
        },
        {
            id: 2,
            pid: 0,
            type: "folder",
            name: "电影",
            ext: "",
            time: 1511125201605
        },
        {
            id: 3,
            pid: 0,
            type: "folder",
            name: "音乐",
            ext: "",
            time: 1511135201605
        },
        {
            id: 4,
            pid: 0,
            type: "folder",
            name: "图片",
            ext: "",
            time: 1511145201605
        },
        {
            id: 5,
            pid: 0,
            type: "folder",
            name: "小说",
            ext: "",
            time: 1511155201605
        },
        {
            id: 14,
            pid: 0,
            type: "folder",
            name: "NeteaseCloudMusic",
            ext: "",
            time: 1510655201605
        },
        {
            id: 15,
            pid: 14,
            type: "folder",
            name: ".git",
            ext: "",
            time: 1510655201605
        },
        {
            id: 16,
            pid: 14,
            type: "folder",
            name: ".idea",
            ext: "",
            time: 1510655201605
        },
        {
            id: 17,
            pid: 14,
            type: "folder",
            name: "build",
            ext: "",
            time: 1510655201605
        },
        {
            id: 18,
            pid: 14,
            type: "folder",
            name: "config",
            ext: "",
            time: 1510655201605
        },
        {
            id: 19,
            pid: 14,
            type: "folder",
            name: "dist",
            ext: "",
            time: 1510655201605
        },
        {
            id: 20,
            pid: 14,
            type: "folder",
            name: "node_modules",
            ext: "",
            time: 1510655201605
        },
        {
            id: 21,
            pid: 14,
            type: "folder",
            name: "src",
            ext: "",
            time: 1510655201605
        },
        {
            id: 22,
            pid: 14,
            type: "folder",
            name: "static",
            ext: "",
            time: 1510655201605
        },
        {
            id: 23,
            pid: 14,
            type: "unKnow",
            name: ".babelrc",
            ext: "",
            time: 1510655201605
        },
        {
            id: 24,
            pid: 14,
            type: "unKnow",
            name: ".editorconfig",
            ext: "",
            time: 1510655201605
        },
        {
            id: 25,
            pid: 14,
            type: "txt",
            name: "",
            ext: ".gitignore",
            time: 1510655201605
        },
        {
            id: 26,
            pid: 14,
            type: "unKnow",
            name: ".postcssrc",
            ext: ".js",
            time: 1510655201605
        },
        {
            id: 27,
            pid: 14,
            type: "web",
            name: "index",
            ext: ".html",
            time: 1510655201605
        },
        {
            id: 28,
            pid: 14,
            type: "txt",
            name: "package",
            ext: ".json",
            time: 1510655201605
        },
        {
            id: 29,
            pid: 14,
            type: "unKnow",
            name: "README",
            ext: ".md",
            time: 1510655201605
        },
        {
            id: 30,
            pid: 15,
            type: "folder",
            name: "hooks",
            ext: "",
            time: 1510655201605
        },
        {
            id: 31,
            pid: 15,
            type: "folder",
            name: "info",
            ext: "",
            time: 1510655201605
        },
        {
            id: 32,
            pid: 30,
            type: "unKnow",
            name: "commit-msg",
            ext: ".sample",
            time: 1510655201605
        },
        {
            id: 33,
            pid: 17,
            type: "unKnow",
            name: "dev-server",
            ext: ".js",
            time: 1510655201605
        },
        {
            id: 34,
            pid: 17,
            type: "unKnow",
            name: "webpack.base.conf",
            ext: ".js",
            time: 1510655201605
        },
        {
            id: 35,
            pid: 21,
            type: "folder",
            name: "api",
            ext: "",
            time: 1510655201605
        },
        {
            id: 36,
            pid: 21,
            type: "folder",
            name: "assets",
            ext: "",
            time: 1510655201605
        },
        {
            id: 37,
            pid: 21,
            type: "folder",
            name: "components",
            ext: "",
            time: 1510655201605
        },
        {
            id: 38,
            pid: 21,
            type: "folder",
            name: "router",
            ext: "",
            time: 1510655201605
        },
        {
            id: 39,
            pid: 21,
            type: "unKnow",
            name: "App",
            ext: ".vue",
            time: 1510655201605
        },
        {
            id: 6,
            pid: 0,
            type: "txt",
            name: "README",
            ext: ".txt",
            time: 1510155201605
        },
        {
            id: 7,
            pid: 1,
            type: "folder",
            name: "前端",
            ext: "",
            time: 1510155201605
        },
        {
            id: 8,
            pid: 1,
            type: "folder",
            name: "后端",
            ext: "",
            time: 1510255201605
        },
        {
            id: 9,
            pid: 7,
            type: "folder",
            name: "javascript",
            ext: "",
            time: 1510355201605
        },
        {
            id: 10,
            pid: 9,
            type: "folder",
            name: "ECMAScript",
            ext: "",
            time: 1510111201605
        },
        {
            id: 11,
            pid: 10,
            type: "folder",
            name: "ECMAScript2015",
            ext: "",
            time: 1510155201605
        },
        {
            id: 12,
            pid: 0,
            type: "pdf",
            name: "技术",
            ext: ".pdf",
            time: 1510455201605
        },
        {
            id: 13,
            pid: 0,
            type: "zip",
            name: "技术",
            ext: ".rar",
            time: 1510555201605
        },
        {
            id: 40,
            pid: 7,
            type: "folder",
            name: "webpack",
            ext: "",
            time: 1510355201605
        },
        {
            id: 41,
            pid: 7,
            type: "folder",
            name: "JQuery",
            ext: "",
            time: 1510355201605
        },
        {
            id: 42,
            pid: 7,
            type: "folder",
            name: "css3",
            ext: "",
            time: 1510355201605
        },
        {
            id: 43,
            pid: 7,
            type: "folder",
            name: "Ajax",
            ext: "",
            time: 1510355201605
        },
        {
            id: 44,
            pid: 7,
            type: "folder",
            name: "Vue.js",
            ext: "",
            time: 1510355201605
        },
        {
            id: 45,
            pid: 2,
            type: "video",
            name: "战狼2",
            ext: ".mp4",
            time: 1510355201605
        },
        {
            id: 46,
            pid: 2,
            type: "video",
            name: "追龙",
            ext: ".mkv",
            time: 1510355201605
        },
        {
            id: 47,
            pid: 2,
            type: "video",
            name: "Vue2.0高级教程",
            ext: ".avi",
            time: 1510355201605
        },
        {
            id: 48,
            pid: 3,
            type: "music",
            name: "远走高飞",
            ext: ".mp3",
            time: 1510355201605
        },
        {
            id: 49,
            pid: 3,
            type: "music",
            name: "我不会爱",
            ext: ".flac",
            time: 1510355201605
        },
        {
            id: 50,
            pid: 5,
            type: "txt",
            name: "笑傲江湖",
            ext: ".txt",
            time: 1510355201605
        },
    ]
};
