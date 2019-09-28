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


##### 好用的双面板文件管理器
1.安装
sudo apt-get install krusader

2.


##### 好用的Linux工具

简单地命令行说明工具：

1.npm install -g tldr


更强悍的命令行说明工具：

2.pip3 install cheat

3.


##### 如何安装samba
1.
https://www.linuxidc.com/Linux/2018-11/155466.htm


##### 如何安装gedit插件
1.
`
$sudo apt-get install gedit-plugins
`
2.

##### VScode插件
插件地址：https://marketplace.visualstudio.com/VSCode
 Linux ~/.vscode/extensions
 macOs ~/.vscode/extensions
 Windows %USERPROFILE%\.vscode\extensions

1.Auto import

2.ctags

3.cscope

4.vscode-icons

5.自动换行：
"editor.wordWrap": "off",

6.c/c++

7.python

8.hihglight-word

9.close red line
搜索栏输入 squiggle， 将出现的 Error Squiggles 选项改为 Disabled

10.vscode #ifdef 区域变暗
在vscode的C/C++插件设置中 将C_Cpp: Dim Inactive Regions 勾选

或者在 setting中添加 "C_Cpp.dimInactiveRegions": true

11.关闭鼠标悬停提示：
hover

12.Bookmarks

13.Code Runner

14.
