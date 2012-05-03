""" Wrapper for invoking jslint and filtering ignored errors 

node and pylint module required

# Install pylint via node package manager
npm install pylint

"""

import os
import sys
import glob
from subprocess import *
import fnmatch

IGNORE_MARKER = "jslint:ignore"

def call(command):
    output = Popen(command, stdout=PIPE, shell = True).communicate()[0]
    return output

class LintResult(object):
    def __init__(self, row, col, msg):
        self.row = row
        self.col = col
        self.msg = msg
        
def jslint(source):
    
    has_errors = False
    output = call("jslint %s" % source)
    
    lintresults = []
    lintlines = output.split(os.linesep)
    for line in lintlines:
        #import pdb;pdb.set_trace()
        try:
            number, msg = line.strip().split(" ", 1)
            pos, msg = msg.split(":", 1)
            row, col = map(int, pos.split(",",1))
    
            lintresults.append(LintResult(row, col, msg))
        except ValueError:
            pass
        
    
    f = open(source);jsdata = f.read();f.close()
    jslines = jsdata.split(os.linesep)
    
    for lintresult in  lintresults:
        row = lintresult.row - 1
        if IGNORE_MARKER not in jslines[row]:
            has_errors = True
            print "%d,%d: %s" % ( lintresult.row, lintresult.col, lintresult.msg)
        
    return has_errors
    
def main(files):
    #files = [x for x in files if x.endswith(".js")]
    if len(files) == 0:
        raise SystemExit("Usage jslint.py [files]\n> python jslint.py js/*.js")

    print files
    failure = 0
    for x in files:
        parts = x.split("-")
        ignored = ""
        path = parts[0]
        if len(parts):
            ignored = parts[1]
            
        ignored = ignored.split(",")
        for source in glob.glob(path):
            folder = os.path.dirname(source)
            for i in ignored:
                i = os.path.join(folder,i)
                if fnmatch.fnmatch(source, i):
                    print
                    print "== Ignored:", source
                    break
            else:
                print
                print "-- Checking:", source
                if jslint(source):
                    failure += 1 
        
    sys.exit(failure)

if __name__ == "__main__":
    main(sys.argv[1:])
    
