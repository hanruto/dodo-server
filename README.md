首先很开心你可以看到这个后端的代码，这是一个前端开发写的，所以如果你是一个后端的话，那么可以略带一些轻蔑的去看，如果你是一个前端的话，那么这个可能是你能看到的最好的解决你不了解后端这个问题的一个项目了。  
ok，废话少数，打起精神看这份 Readme 如何带你学习后端。  
首先，最重要的一件事，在右上角小星星的位置点一下，满足一下这个无私的项目唯一的一点小私心 --- 多一个 star。  
项目的文件夹相对于前端的 config build src 来说目录结构还是略微比较多的。因为这个后端是没有打包这个环节的，所以代码少了最外边的一层目录。

### config

是配置项目的基本功能的，其中只有三个文件。  
包括连接数据库的 mongoose.js  
启动 koa 和用到的中间件以及初始化路由和统一错误处理的 koa.js  
以及一个 app.js 这个文件只做一件事情就是启动项目

### modules

各个模块，每个模块负责独立的功能，模块内部会有 route, model, controller 就是传说中的 mvc。  
项目初始化的时候会执行目录下的 passport 和 route，可以在/config/koa.js 里边看到，加载所有的 model，会在/config/mongoose.js 里看到。  
除了以上的介绍之外，module 中还会出现 passport 文件和多个的 model 或者多个 controller 的情况。这是因为有的模块需要权限验证比如 admin 和 user。有的模块需要多个 model 协作，比如 article 模块需要 article-tag 即分类这个 model。

### tools

工具库，目前只有一个工具文件 acl 做权限检查的，里边也只有一个函数 checkRoles 用来检查身份。

### migration

数据迁徙，跑里边的脚本可以初始化这个后端运行需要的数据

### deploy

部署，这个文件夹其实和这个网站没什么关系，因为他其实也用来部署其他的项目

### 根目录其他文件

.eslintrc

.gitignore

.prettierrc

deploy.sh

index.js

package.json

package-lock.json 和 yarn.lock

README.md
