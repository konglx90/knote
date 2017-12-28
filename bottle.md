# bottle

- 一个文件的框架bottle.py.
- 路由、模板、网络处理、服务器


### hello world
```
from bottle import route, run, template

@route('/hello/<name>')
def index(name):
    return template("<h1>Hello {{name}}</h1>", name=name)

run(host='localhost', port=8080)
```

### 路由

#### 可以绑定多个理由

```
@route('/')
@route('/hello/<name>')
def greet(name='Stranger'):
    return template('Hello {{name}}, how are you?', name=name)
```

#### 动态路由+验证
前文类似'<name>'的就是动态路由， 动态路由的验证格式<name:filter:config>
```
:int 匹配整型数
:float 与:int相似， 十进制
:path 匹配所有的字符， 可以匹配路径
:re 使用正则表达式
```

```
@route('/object/<id:int>')
def callback(id):
    assert isinstance(id, int)

# 匹配小写字母
@route('/show/<name:re:[a-z]+>')
def callback(name):
    assert name.isalpha()

@route('/static/<path:path>')
def callback(path):
    return static_file(path, ...)
```

请求路由的规则
The rule `/<action>/<item> `matches as follows:

|Path|	Result |
|--------|:--------------------------------------:|
|/save/123  | `{'action': 'save', 'item': '123'} `|
|/save/123/|	No Match |
/save/	| No Match |
//123	| No Match |


自定义url过滤器 # TODO 没有成功

You can add your own filters to the router. All you need is a function that returns three elements: A regular expression string, a callable to convert the URL fragment to a python value, and a callable that does the opposite. The filter function is called with the configuration string as the only parameter and may parse it as needed:

```
app = Bottle()

def list_filter(config):
    ''' Matches a comma separated list of numbers. '''
    delimiter = config or ','
    regexp = r'\d+(%s\d)*' % re.escape(delimiter)

    def to_python(match):
        return map(int, match.split(delimiter))

    def to_url(numbers):
        return delimiter.join(map(str, numbers))

    return regexp, to_python, to_url

app.router.add_filter('list', list_filter)

@app.route('/follow/<ids:list>')
def follow_users(ids):
    for id in ids:
        print id
```

除了采用灵活的装饰器， 还有一种常用的统一分配理由的方法

```
def setup_routing(app):
    app.route('/new', ['GET', 'POST'], form_new)
    app.route('/edit', ['GET', 'POST'], form_edit)

app = Bottle()
setup_routing(app)
```

#### 请求方法 
@route装饰器默认是HTTP请求里的get请求

```
from bottle import get, post, request # or route

@get('/login') # or @route('/login')
def login():
    return '''
        <form action="/login" method="post">
            Username: <input name="username" type="text" />
            Password: <input name="password" type="password" />
            <input value="Login" type="submit" />
        </form>
    '''

@post('/login') # or @route('/login', method='POST')
def do_login():
    username = request.forms.get('username')
    password = request.forms.get('password')
    if check_login(username, password):
        return "<p>Your login information was correct.</p>"
    else:
        return "<p>Login failed.</p>"
```

#### 错误页面

当应用抛出HTTPError时， 会触发
```
from bottle import error
@error(404)
def error404(error):
    return 'Nothing here, sorry'
```

### 生成内容

在纯粹的WSGI里， 你的应用能返回的数据类型是非常有限的。你的应用必须返回迭代生成的二进制字符串。你可以返回字符串， 但是服务器必须一个一个字节地将其转化。Unicode strings are not allowed at all. This is not very practical.

**Bottle** is much more flexible and supports a wide range of types. It even **adds a Content-Length header if possible and encodes unicode automatically, so you don’t have to.** What follows is a list of data types you may return from your application callbacks and a short description of how these are handled by the framework:


**Dictionaries**
As mentioned above, Python dictionaries (or subclasses thereof) are automatically transformed **into JSON strings** and returned to the browser with the **Content-Type** header set to **application/json**. 
**Empty Strings, False, None or other non-true values**:
These produce an empty output with the **Content-Length** header set to *0*.
**Unicode strings**
Unicode strings (or iterables yielding unicode strings) are automatically encoded with the codec specified in the **Content-Type header (utf8 by default)** and then treated as normal byte strings (see below).
**Byte strings**
**Instances of HTTPError or HTTPResponse**
**File objects**
Everything that has a .read() method is treated as a file or file-like object and passed to the wsgi.file_wrapper callable defined by the WSGI server framework. Some WSGI server implementations can make use of optimized system calls (sendfile) to transmit files more efficiently. In other cases this just iterates over chunks that fit into memory. Optional headers such as Content-Length or Content-Type are not set automatically. Use send_file() if possible. See Static Files for details.
**Iterables and generators**
You are allowed to use yield within your callbacks or return an iterable, as long as the iterable yields byte strings, unicode strings, HTTPError or HTTPResponse instances. Nested iterables are not supported, sorry. Please note that the HTTP status code and the headers are sent to the browser as soon as the iterable yields its first non-empty value. Changing these later has no effect.


#### 静态文件

使用`static_file`, 函数签名为`def static_file(filename, root, mimetype='auto', download=False, charset='UTF-8'):`
可以直接返回文件对象， 默认分配一个对应的mime-type...
下面是bottle框架为你做的
```
It automatically guesses a mime-type, adds a Last-Modified header, restricts paths to a root directory for security reasons and generates appropriate error responses (403 on permission errors, 404 on missing files). It even supports the If-Modified-Since header and eventually generates a 304 Not Modified response. 
```

其中有些参数可以自己指定
```
from bottle import static_file
@route('/images/<filename:re:.*\.png>')
def send_image(filename):
    return static_file(filename, root='/path/to/image/files', mimetype='image/png')

@route('/static/<filename:path>')
def send_static(filename):
    return static_file(filename, root='/path/to/static/files')
```

#### HTTP错误和重定向

快速抛出错误abort()
```
from bottle import route, abort
@route('/restricted')
def restricted():
    abort(401, "Sorry, access denied.")
```

*响应包含两部分*
Status Code, Response Headr

设置、添加头部
```
response.set_header('Set-Cookie', 'name=value')
response.add_header('Set-Cookie', 'name2=value2')
```

#### Cookies

获取和设置Cookies
```
@route('/hello')
def hello_again():
    if request.get_cookie("visited"):
        return "Welcome back! Nice to see you again"
    else:
        response.set_cookie("visited", "yes")
        return "Hello there! Nice to meet you"
```
一些常用的字段设置

- max_age: Maximum age in seconds. (default: None)
- expires: A datetime object or UNIX timestamp. (default: None)
- domain: The domain that is allowed to read the cookie. (default: current domain)
- path: Limit the cookie to a given path (default: /)
- secure: Limit the cookie to HTTPS connections (default: off).
- httponly: Prevent client-side javascript to read this cookie (default: off, requires Python 2.6 or newer).

关于cookies可能的坑

- cookies在大多数浏览器上的限制大小是4KB
- 有些人可能会禁用cookies, 大部分的搜索引擎不支持cookies，请确保的你的应用在没有cookies的时候能正常使用
- XSS 可能利用到cookies
- CSRF 可能利用到cookies
- Thus, never store confidential information in cookies.


表单支持WTFORM

#### request对象数据的获得

```
# cookies
from bottle import route, request, response
@route('/counter')
def counter():
    count = int( request.cookies.get('counter', '0') )
    count += 1
    response.set_cookie('counter', str(count))
    return 'You visited this page %d times' % count

# header

from bottle import route, request
@route('/is_ajax')
def is_ajax():
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return 'This is an AJAX request'
    else:
        return 'This is a normal request'

# 查询字符串 /forum?id=1&page=5

from bottle import route, request, response, template
@route('/forum')
def display_forum():
    forum_id = request.query.id
    page = request.query.page or '1'
    return template('Forum ID: {{id}} (page {{page}})', id=forum_id, page=page)

# 表单
@route('/login', method='POST')
def do_login():
    username = request.forms.get('username')
    password = request.forms.get('password')
    if check_login(username, password):
        return "<p>Your login information was correct.</p>"
    else:
        return "<p>Login failed.</p>"

# 上传文件
@route('/upload', method=['POST', 'GET'])
def do_upload():
    if request.method == 'POST':
        category   = request.forms.get('category')
        upload     = request.files.get('upload')
        name, ext = os.path.splitext(upload.filename)
        if ext not in ('.png','.jpg','.jpeg'):
            return 'File extension not allowed.'
        
        upload.save(STATIC_PATH) # appends upload.filename automatically
        return 'OK'
    else:
        return '''<form action="/upload" method="post" enctype="multipart/form-data">
                Category:      <input type="text" name="category" />
                Select a file: <input type="file" name="upload" />
                               <input type="submit" value="Start upload" />
                </form>'''
```

#### TODO 
>WSGI ENVIRONMENT
Each BaseRequest instance wraps a WSGI environment dictionary. The original is stored in BaseRequest.environ, but the request object itself behaves like a dictionary, too. Most of the interesting data is exposed through special methods or attributes, but if you want to access WSGI environ variables directly, you can do so:
```
@route('/my_ip')
def show_ip():
    ip = request.environ.get('REMOTE_ADDR')
    # or ip = request.get('REMOTE_ADDR')
    # or ip = request['REMOTE_ADDR']
    return template("Your IP is: {{ip}}", ip=ip)
```

### [Template](http://www.bottlepy.org/docs/dev/stpl.html)
template or @view

### 插件机制

[官网上推的插件](http://www.bottlepy.org/docs/dev/plugins/index.html?highlight=plugin)

>Bottle-Beaker
Beaker to session and caching library with WSGI Middleware
Bottle-Cork
Cork provides a simple set of methods to implement Authentication and Authorization in web applications based on Bottle.
Bottle-Extras
Meta package to install the bottle plugin collection.
Bottle-Flash
flash plugin for bottle
Bottle-Hotqueue
FIFO Queue for Bottle built upon redis
Macaron
Macaron is an object-relational mapper (ORM) for SQLite.
Bottle-Memcache
Memcache integration for Bottle.
Bottle-Mongo
MongoDB integration for Bottle
Bottle-Redis
Redis integration for Bottle.
Bottle-Renderer
Renderer plugin for bottle
Bottle-Servefiles
A reusable app that serves static files for bottle apps
Bottle-Sqlalchemy
SQLAlchemy integration for Bottle.
Bottle-Sqlite
SQLite3 database integration for Bottle.
Bottle-Web2pydal
Web2py Dal integration for Bottle.
Bottle-Werkzeug
Integrates the werkzeug library (alternative request and response objects, advanced debugging middleware and more).


`pip install bottle_sqlite`

```
from bottle import route, install, template
from bottle_sqlite import SQLitePlugin

install(SQLitePlugin(dbfile='/tmp/test.db'))

@route('/show/<post_id:int>')
def show(db, post_id):
    c = db.execute('SELECT title, content FROM posts WHERE id = ?', (post_id,))
    row = c.fetchone()
    return template('show_post', title=row['title'], text=row['content'])

@route('/contact')
def contact_page():
    ''' This callback does not need a db connection. Because the 'db'
        keyword argument is missing, the sqlite plugin ignores this callback
        completely. '''
    return template('contact')
```

为特定的routes装载插件
```
sqlite_plugin = SQLitePlugin(dbfile='/tmp/test.db')

@route('/create', apply=[sqlite_plugin])
def create(db):
    db.execute('INSERT INTO ...')
```

#### 自己动手写插件 [Plugin Development Guide](http://www.bottlepy.org/docs/dev/plugindev.html?highlight=plugin)

插件是怎么工作的

本质是给app中的每一个route加了一个装饰器，感觉和django的中间键差不多。
>The plugin API builds on the concept of decorators. To put it briefly, a plugin is a decorator applied to every single route callback of an application.

```
from bottle import response, install
import time

def stopwatch(callback):
    def wrapper(*args, **kwargs):
        start = time.time()
        body = callback(*args, **kwargs)
        end = time.time()
        response.headers['X-Exec-Time'] = str(end - start)
        return body
    return wrapper

install(stopwatch)
```

> Plugin is not a real class (you cannot import it from bottle) but an interface that plugins are expected to implement. Bottle accepts any object of any type as a plugin, as long as it conforms to the following API.

sqlite 插件的实现

```
import sqlite3
import inspect

class SQLitePlugin(object):
    ''' This plugin passes an sqlite3 database handle to route callbacks
    that accept a `db` keyword argument. If a callback does not expect
    such a parameter, no connection is made. You can override the database
    settings on a per-route basis. '''

    name = 'sqlite'
    api = 2

    def __init__(self, dbfile=':memory:', autocommit=True, dictrows=True,
                 keyword='db'):
         self.dbfile = dbfile
         self.autocommit = autocommit
         self.dictrows = dictrows
         self.keyword = keyword

    def setup(self, app):
        ''' Make sure that other installed plugins don't affect the same
            keyword argument.'''
        for other in app.plugins:
            if not isinstance(other, SQLitePlugin): continue
            if other.keyword == self.keyword:
                raise PluginError("Found another sqlite plugin with "\
                "conflicting settings (non-unique keyword).")

    def apply(self, callback, context):
        # Override global configuration with route-specific values.
        conf = context.config.get('sqlite') or {}
        dbfile = conf.get('dbfile', self.dbfile)
        autocommit = conf.get('autocommit', self.autocommit)
        dictrows = conf.get('dictrows', self.dictrows)
        keyword = conf.get('keyword', self.keyword)

        # Test if the original callback accepts a 'db' keyword.
        # Ignore it if it does not need a database handle.
        args = inspect.getargspec(context.callback)[0]
        if keyword not in args:
            return callback

        def wrapper(*args, **kwargs):
            # Connect to the database
            db = sqlite3.connect(dbfile)
            # This enables column access by name: row['column_name']
            if dictrows: db.row_factory = sqlite3.Row
            # Add the connection handle as a keyword argument.
            kwargs[keyword] = db

            try:
                rv = callback(*args, **kwargs)
                if autocommit: db.commit()
            except sqlite3.IntegrityError, e:
                db.rollback()
                raise HTTPError(500, "Database Error", e)
            finally:
                db.close()
            return rv

        # Replace the route callback with the wrapped one.
        return wrapper
```
使用
```
sqlite = SQLitePlugin(dbfile='/tmp/test.db')
bottle.install(sqlite)

@route('/show/:page')
def show(page, db):
    row = db.execute('SELECT * from pages where name=?', page).fetchone()
    if row:
        return template('showpage', page=row)
    return HTTPError(404, "Page not found")

@route('/static/:fname#.*#')
def static(fname):
    return static_file(fname, root='/some/path')

@route('/admin/set/:db#[a-zA-Z]+#', skip=[sqlite])
def change_dbfile(db):
    sqlite.dbfile = '/tmp/%s.db' % db
    return "Switched DB to %s.db" % db
```

