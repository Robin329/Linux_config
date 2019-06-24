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

5.
