echo $PS1   #获取当前的PS1值
①修改 `.bashrc` 和 `/root/.bashrc`文件，将原来的PS1注释掉，添加如下：
`PS1="\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$"`

②source  ~/.bashrc
