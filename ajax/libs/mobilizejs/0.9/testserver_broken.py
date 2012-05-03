#!/usr/bin/python
"""
    
    Test web server for mobilize.js

"""

import os
import SimpleHTTPServer
import SocketServer
import urllib
import Cookie
import urllib2
from urlparse import urlparse
import fnmatch

PORT = 8080

class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    base = SimpleHTTPServer.SimpleHTTPRequestHandler
    
    def send_head(self):
        """Common code for GET and HEAD commands.

        This sends the response code and MIME headers.

        Return value is either a file object (which has to be copied
        to the outputfile by the caller unless the command was HEAD,
        and must be closed by the caller under all circumstances), or
        None, in which case the caller has nothing further to do.

        """
        path = self.translate_path(self.path)
        f = None
        if os.path.isdir(path):
            for index in "index.html", "index.htm":
                index = os.path.join(path, index)
                if os.path.exists(index):
                    path = index
                    break
            else:
                return self.list_directory(path)
        ctype = self.guess_type(path)
        if ctype.startswith('text/'):
            mode = 'r'
        else:
            mode = 'rb'
        try:
            f = open(path, mode)
        except IOError:
            self.send_error(404, "File not found")
            return None
        self.send_response(200)
        self.send_header("Content-type", ctype)
        # Allow AJAXy from directly opened test files
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        return f
    
    def read_proxy_args(self):
        from urlparse import urlparse
        u =urlparse(self.path)
        args = dict([x.split("=") for x in u.query.split("&")])
        args["options"] = dict([x.split(":") for x in args.get("options",":").split(",")])
        return args

    def do_proxy(self):
        """
        GET parameters
        url       - Source url to get content from
        bundleurl - Url to load the initial mobilize.js
        options - Options set for mobilize.init([options])
                    <value>:<key>,<value>:<key>
        """
        args = self.read_proxy_args()
        url = args["url"]
         
        if "localhost:%d" % (PORT) in url:
            i = 0
            i = url.index("://",i) + 3
            i = url.index("/", i)
            #self.path = url[i:]
            url = url.split("?")[0]
            url  = "." + url[i:]
            f = open(url);data=f.read();f.close()
        else:
            print "url", url
            resp = urllib2.urlopen(url)
            data = resp.read();
        
        # TODO: Add support for overloading existing mobilize.
        if "mobilize.init" not in data:
            options = {
                "forceMobilize" : 1,
                "haveRemoteDebugLogging" : 1,
                "remoteDebugLogBaseUrl" : "http://localhost:%d/" % ( PORT )
            }
            
            options.update( args.get("options",{}))
            
            i = 0;
            i = data.index("head", i)
            i = data.index("body", i)
            i = data.index(">", i)
            i += 1
            
            injected = """
            
            <script type="text/javascript">
            function mobilize_init(){
                    mobilize.init(%(OPTIONS)s);
                mobilize.bootstrap();
            }
            </script>
            
            <script  class="mobilize-js-source" 
                      type="text/javascript" 
                       src="%(BUNDLEURL)s"
                       onload="mobilize_init();">
            </script>
            
            """ % {
                "OPTIONS" : options,
                "BUNDLEURL"  : args.get("bundleurl", "http://localhost:8080/js/mobilize.wordpress.min.js")
            }
            
            data = data[:i] + injected + data[i:]
            
        self.send_response(200)
         
        #self.response.headers.dict["cookie"] = cookies;
        self.send_header("Set-Cookie", "proxy-url=%s" % ( url ))
        
        self.end_headers()
        
        self.wfile.write(data)
        
        return 
    
    def do_cookie_altering(self):
        
        self.send_response(200)
        self.end_headers()
        self.wfile.write("""
        <html> 
        <head>
        
        <script>
        window.mobilizeAutoload = false;
        </script>
        
        <script src="/js/mobilize.js"></script>
        
        </head>
        <body>
        <pre>Page changed by server thanks to mobilize-mobile cookie and mobilize.options.reloadOnMobile = true        
        </pre>
        <a href='javascript:mobilize.eraseCookie("mobilize-mobile");window.location.href="/tests/cookie-test.html"'>Erase cookie</a>
        </body>
        </html>
        """)
        
    def do_GET(self):
        
        
        if "/log?msg" in self.path:
            msg = urllib.unquote(self.path.split("msg=")[-1])
            while msg.endswith("/"):
                msg = msg[:-1]
            print msg
            self.send_response(200)
            self.end_headers()
            return

        # Bundle to single file
        if "/proxy" not in self.path \
        and "mobile" not in self.path \
        and "mobilize" in self.path \
        and "js" in self.path:
            parts = self.path.split("/")
            filename = parts[-1]
            without_min = filename.replace(".min", "")
            f = open("js/mobilize.js"); data = f.read(); f.close()
            f = open("js/" + without_min); data += f.read(); f.close()
            
            ctype = self.guess_type("js/mobilize.js")
            self.send_response(200)
            self.send_header("Content-type", ctype)
            # Allow AJAXy from directly opened test files
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
                    
            #f = self.send_head()
            
            self.wfile.write(data)
            
            f.close()
            return
        elif fnmatch.fnmatch(self.path, "*mobilize*.mobile.*js"):
             f = open("js/jquery.js"); data = f.read(); f.close()
             data += "\n"
             f = open("js/jquery.mobile.js"); data += f.read(); f.close()
             
             ctype = self.guess_type("js/mobilize.js")
             self.send_response(200)
             self.send_header("Content-type", ctype)
             # Allow AJAXy from directly opened test files
             self.send_header("Access-Control-Allow-Origin", "*")
             self.end_headers()
             
             self.wfile.write(data)
             
             return
        elif fnmatch.fnmatch(self.path, "*mobilize*.mobile.*css"):
             data = ""
             f = open("css/jquery.mobile.css"); data += f.read(); f.close()
             
             custom = os.path.basename(self.path).split(".")
             custom = "css/%s.css" % ( custom[1])
             f = open(custom); data += f.read(); f.close()
             
             ctype = self.guess_type("css/jquery.mobile.css")
             self.send_response(200)
             self.send_header("Content-type", ctype)
             # Allow AJAXy from directly opened test files
             self.send_header("Access-Control-Allow-Origin", "*")
             self.end_headers()
             
             self.wfile.write(data)
             
             return
        
        # Don't proxy these as the proxied server doesn't have them. 
        if self.path.startswith("/js")  \
        or self.path.startswith("/css") \
        or self.path.startswith("/templates"):
            return self.base.do_GET(self);
         
        if "/proxy" in self.path:
            self.do_proxy()
            return
        
        
        #print "doGET", self.path
        #if "logo_238.png" in self.path:
        #    pass
        
        
        if "/noproxy" in self.path:
            self.send_response(200)
            self.send_header("Set-Cookie", "proxy-url=0")
            self.end_headers()
            
            return
        
        if "cookie" in self.headers.dict:
            cookies = Cookie.SimpleCookie()
            cookies.load(self.headers.dict["cookie"])       
            mobilize = cookies.get("mobilize-mobile",None)
            if mobilize:
                if mobilize.value == "1":
                    print "Cookie says client is mobile"
                    
                    if "cookie-test.html" in self.path:
                        self.do_cookie_altering()
                        return
                    
                    
            proxyurl = cookies.get("proxy-url",None)
            
            if proxyurl and proxyurl.value != "0":
                url = proxyurl.value + self.path
                print "Proxy:", url 
                
                resp = urllib2.urlopen(url)
                data = resp.read();
                self.send_response(200)
                self.end_headers()
                self.wfile.write(data)
                return;
        
        return self.base.do_GET(self)

    def log_request(self,code):
        if "/log" in self.path:
            return
        return self.base.log_request(self, code)
    
    

def main():
    global PORT
    from optparse import OptionParser
    parser = OptionParser()
    parser.add_option("-p", "--port",
                      help="Server port. Default: %default",
                      default = PORT )
    (options, args) = parser.parse_args()
    
    port = int(options.port)
    PORT = port
    
    SocketServer.TCPServer.allow_reuse_address = True
    SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map.update({
           ".png" : "image/png"
        })
    
    httpd = SocketServer.TCPServer(("", port), Handler)
    
    print "serving at port", port
    
    # This is handy if your terminal supports double clicking of the linkss
    testsdir = os.path.join(os.getcwd(), "tests")
    if os.path.exists(testsdir):
        for file in os.listdir(testsdir):
            if file.endswith(".html"):
                print "Open test page http://localhost:%d/tests/%s?mobilize=true" % (port, file)
    
    httpd.serve_forever()

if __name__ == "__main__":
    main()


