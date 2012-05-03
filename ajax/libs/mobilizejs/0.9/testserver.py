#!/usr/bin/python
"""
    
    Test web server for mobilize.js

"""

import os
import SimpleHTTPServer
import SocketServer
import urllib
import Cookie

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
    
    def do_GET(self):
        #print "doGET", self.path
            
        if "cookie" in self.headers.dict:
            cookies = Cookie.SimpleCookie()
            cookies.load(self.headers.dict["cookie"])       
            mobilize = cookies.get("mobilize-mobile",None)
            if mobilize:
                if mobilize.value == "1":
                    print "Cookie says client is mobile"                                            
                                
        if "/log?" in self.path:
            msg = urllib.unquote(self.path.split("msg=")[-1])
            while msg.endswith("/"):
                msg = msg[:-1]
            print msg
            self.send_response(200)
            self.end_headers()
            return
        
            
        
        return self.base.do_GET(self)

    def log_request(self,code):
        if "/log" in self.path:
            return
        return self.base.log_request(self, code)

httpd = SocketServer.TCPServer(("", PORT), Handler)
httpd.allow_reuse_address = True

print "serving at port", PORT

# This is handy if your terminal supports double clicking of the linkss
for file in os.listdir(os.path.join(os.getcwd(), "tests")):
    if file.endswith(".html"):
        print "Open test page http://localhost:%d/tests/%s?mobilize=true" % (PORT, file)

httpd.serve_forever()
