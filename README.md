## puppeteer demo

npm install

在 src/demo 目录下通过 node 执行各个脚本

- Puppeteer是一个node库，他提供了一组用来操纵Chrome的API，理论上使用它可以做任何Chrome可以做的事
- 有点类似于PhantomJS，但Puppeteer由Chrome官方团队进行维护，前景更好
- Puppeteer的应用场景会非常多，就爬虫领域来说，远比一般的爬虫工具功能更丰富，性能分析、自动化测试也不在话下

[puppeteer api](https://zhaoqize.github.io/puppeteer-api-zh_CN/)

[使用参考](https://github.com/zhentaoo/puppeteer-deep)

### 阿里云服务器使用 pm2 部署 puppeteer 应用需要注意

在阿里云的Centos 7.3上，安装puppeteer之后，会发现并不能启动应用，报错如下：

...node_modules/puppeteer/.local-chromium/linux-496140/chrome-linux/chrome: error while loading shared libraries: libpangocairo-1.0.so.0: cannot open shared object file: No such file or directory

原来puppet虽然帮你下了一个Chromium，但并没有帮你把依赖都装好。于是你要自己把那些so都装好。

官方给的是Ubuntu版本的各个so包的apt-get安装方式，centos版本居然没有放！于是遍历了各个issue之后，终于发现还是有人给出了centos的库名，相关 issue 参考：https://github.com/GoogleChrome/puppeteer/issues/560#issuecomment-325224766

根据以上 issue，安装依赖库

yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y

安装字体：

yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y

安装完以上依赖之后，重启应用，就可以了。