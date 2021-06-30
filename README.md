1.修改颜色
echo $PS1   #获取当前的PS1值

①修改 `.bashrc` 和 `/root/.bashrc`文件，将原来的PS1注释掉，添加如下：
`PS1="\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$"`

②source  ~/.bashrc

2.快捷键
Ctrl+Shift+E 垂直分割窗口
Ctrl+Shift+O 水平分割窗口
F11 全屏
Ctrl+Shift+C 复制
Ctrl+Shift+V 粘贴
Ctrl+Shift+N 或者 Ctrl+Tab 在分割的各窗口之间切换
Ctrl+Shift+X 将分割的某一个窗口放大至全屏使用
Ctrl+Shift+Z 从放大至全屏的某一窗口回到多窗格界面

3.修改terminator config文件

`man terminator_config`查看支持哪些配置

4.修改右键打开terminator终端

https://blog.csdn.net/zhanghm1995/article/details/89419109

##### 5.Ubuntu16.04的系统无法更换背景图片
源码位置：https://launchpad.net/terminator
##### 安装步骤：

1、默认Terminator0.97是支持更换背景图片的

`sudo apt install gconf2 python-gobject python-gtk2 python-gnome2 python-vte python-keybinder python-notify`

`sudo apt --fix-broken install`

`sudo apt install gconf2 python-gobject python-gtk2 python-gnome2 python-vte python-keybinder python-notify`

`sudo dpkg -i terminator_0.97-2ubuntu0.1_all.deb`

##### 高效回退到特定目录
1.安装

`echo 'source ~/.config/up/up.sh' >> ~/.bashrc`

`source ~/.bashrc`

2.使用

`up`	默认返回上一层目录

`up [特定目录的首两个字母缩写（可以用Tab键）]`	返回特定目录

`up [num]`	表示返回上num层目录	


3.不更新
解决方法，先给gitlab写保护，让apt-get upgrade不更新它。

我们先要知道gitlab软件包的名称，通过查看当前的系统中所有软件包状态可以知道

- 查看当前的系统中所有软件包状态

sudo dpkg --get-selections | more

可以找到terminator软件包名为"treminator"

- 给gitlab-ce锁定当前版本不更新

sudo echo "terminator hold" | sudo dpkg --set-selections

- 查看当前己锁定的软件包：

sudo dpkg --get-selections | grep hold

可以看到gitlab-ce 己经hold了！
现在可以再执行apt-get upgrade了，gitlab不会被升级。

##### 好用的双面板文件管理器
1.安装
sudo apt-get install krusader

2.


##### 好用的Linux工具
简单地命令行说明工具：

1.npm install -g tldr

更强悍的命令行说明工具：

2.pip3 install cheat

如何安装samba

https://www.linuxidc.com/Linux/2018-11/155466.htm
如何安装gedit插件

$sudo apt-get install gedit-plugins 

2.
##### VScode插件

插件地址：https://marketplace.visualstudio.com/VSCode 

Linux ~/.vscode/extensions 

macOs ~/.vscode/extensions 

Windows %USERPROFILE%/.vscode/extensions

1.Auto import

2.ctags

3.cscope

4.vscode-icons

5.自动换行： "editor.wordWrap": "off",

6.c/c++

7.python

8.hihglight-word

9.close red line 搜索栏输入 squiggle， 将出现的 Error Squiggles 选项改为 Disabled

10.vscode #ifdef 区域变暗 在vscode的C/C++插件设置中 将C_Cpp: Dim Inactive Regions 勾选

或者在 setting中添加 "C_Cpp.dimInactiveRegions": true

11.关闭鼠标悬停提示： hover

12.Bookmarks

13.Code Runner

14.字体推荐：
'Courier New',

15.彩色括号
Bracket Pair Colorizer

16.头文件注释
Document This

17.路径提示
Path Intellisense

18.顶部注释
vscode-fileheader

19.显示空格和tab
renderWhitespace

20.保存时自动格式化
Format On Save

Ctrl + K, Ctrl + F 也可以格式化指定部分
21. 



=============vscode monokai配置==================
```
 {
    "editor.suggestSelection": "first",
    "editor.fontFamily": "Consolas, Source Code Pro, Monoca",
    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "entity.name.type",
                "settings": {
                    "foreground": "#FBDE4B",
                    "fontStyle": ""
                }
            },
            {
                "scope": "variable.other.global",
                "settings": {
                    "foreground": "#ee57c8",
                    "fontStyle": ""
                }
            },
            {
                "scope": "entity.name.label",
                "settings": {
                    "foreground": "#f1575c",
                    "fontStyle": ""
                }
            },
            {
                "scope": "variable.other.property",
                "settings": {
                    "foreground": "#f1575c",
                    "fontStyle": ""
                }
            },
            {
                "scope": "variable.other.enummember",
                "settings": {
                    "foreground": "#A6E22E",
                    "fontStyle": ""
                }
            },
            {
                "name": "Class/Constructor modifier",
                "scope": [
                    "storage.type"
                ],
                "settings": {
                    "fontStyle": ""
                }
            },
            {
                "scope": "variable.parameter",
                "settings": {
                    "fontStyle": ""
                }
            }
        ]
    },
    "highlightwords.colors": [
        {"dark": "yellow" },
        {"dark": "Cyan" },
        {"dark": "Pink" },
        {"dark": "LightGreen" },
        {"dark": "LightSteelBlue" },
        {"dark": "Plum" }
        ],
        "highlightwords.box": {
            "light": true,
            "dark": false
        },
"highlightwords.showSidebar": true,
"highlightwords.defaultMode": 1,
"workbench.colorCustomizations": {
        "editor.selectionBackground": "#757373"
    },
    "C_Cpp.inactiveRegionForegroundColor": "#ffffff",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "C_Cpp.dimInactiveRegions": false,
    "editor.wordWrap": "on",
    "C_Cpp.default.enableConfigurationSquiggles": false,
    "editor.minimap.enabled": false,
    "C_Cpp.updateChannel": "Insiders",
    "http.proxySupport": "off",
    "files.exclude": {
        "**/.classpath": true,
        "**/.factorypath": true,
        "**/.history": true,
        "**/.project": true,
        "**/.settings": true,
        "**/*.a": true,
        "**/*.apk": true,
        "**/*.bin": true,
        "**/*.o": true,
        "**/*.o.*": true,
        "**/*.so": true
    },
    "remote.SSH.remotePlatform": {
        "172.21.16.247": "linux"
    },
    "git.ignoreLegacyWarning": true,
    "remote.SSH.showLoginTerminal": true,
    "java.home": "/studio/robin.jiang/Doc/java/jdk/jdk-11.0.1",
    
    "files.associations": {
        "*.java": "java"
    },
    "java.requirements.JDK11Warning": false,
    "java.semanticHighlighting.enabled": true,
    "C_Cpp.workspaceParsingPriority": "low",
    "timeline.excludeSources": [],
    "terminal.integrated.fontFamily": "monospace",
    "numberedBookmarks.navigateThroughAllFiles": "replace",
    "editor.renderWhitespace": "all",
    "files.trimTrailingWhitespace": true,
    "files.autoSave": "afterDelay",
    "files.autoGuessEncoding": true,
    "workbench.iconTheme": "Monokai Classic Icons",
    "C_Cpp.debugger.useBacktickCommandSubstitution": true,
    "editor.formatOnType": true,
    "editor.formatOnSaveMode": "modifications",
    "editor.cursorStyle": "line-thin",
    "editor.fontSize": 13,
    "editor.formatOnSave": true,
    "gitlens.hovers.enabled": false,
    "gitlens.hovers.pullRequests.enabled": false,
    "gitlens.views.lineHistory.avatars": false,
    "gitlens.mode.statusBar.enabled": false,
    "gitlens.statusBar.enabled": false
    "clang-format.fallbackStyle": "Google",
    "clang-format.language.c.enable": true,
    "clang-format.language.cpp.enable": true,
    "clang-format.assumeFilename": "/studio/robin.jiang/Doc/vscode/.clang-format",
}

    
```
