# coding=utf-8
import datetime
import pyamf
from pyamf import remoting
from pyamf.remoting import Envelope
from pyamf.remoting import Response
from pyamf.remoting import HeaderCollection
from xml.etree.cElementTree import Element, SubElement
from array import *

# create an xml document
xmlDocument = Element('root')
parent = SubElement(xmlDocument, 'parent')
child1 = SubElement(parent, 'child')
child1.text = "foo"
child1.set('id', 'c1')
child2 = SubElement(parent, 'child')
child2.text = "bar"
child2.set('id', 'c2')

# create a typed object
class Foo:
    class __amf__:
        dynamic = False
        static = ('bar',)

pyamf.register_class(Foo, 'Foo');

foo = Foo()
foo.bar = 'baz'

# create an associative array (ECMA Array)
ecmaArray = pyamf.MixedArray({
    'a': 'b',
    'c': 'd',
})

#-----------------------------------------------
# AMF0 all data types
#-----------------------------------------------

envelope = Envelope(amfVersion=0)

message0 = Response({
    'integer': 42,
    'dbl': 90.01,
    'tru': True,
    'fls': False,
    'str': 'sencha',
    'obj': { 'a': 1, 'b': 2 },
    'none': None,
    'undef': pyamf.Undefined,
    'ecmaArray': pyamf.MixedArray(a='1', b='2', c='3'),
    'strictArray': [ 1, 2, 3 ],
    'date': datetime.date(2012, 12, 31),
    'xmlDocument': xmlDocument,
    'typedObject': foo,
})

message1 = Response({
    'text': 'hello'
})

envelope.headers['a'] = 'b';
envelope.headers['c'] = 'd';
envelope.headers['e'] = 'f';

envelope.__setitem__('msg1', message0)
envelope.__setitem__('msg2', message1)

stream = remoting.encode(envelope)

file = open('amf0-all.amf', 'w+')
file.write(stream.getvalue())

#-----------------------------------------------
# AMF0 recordset
#-----------------------------------------------

envelope = Envelope(amfVersion=0)

records = [
    { 'id': 1, 'name': 'Phil' },
    { 'id': 2, 'name': 'Don' },
    { 'id': 3, 'name': 'Kevin' }
] 

message = Response(records)

envelope.__setitem__('message', message);

stream = remoting.encode(envelope)

file = open('amf0-records.amf', 'w+')
file.write(stream.getvalue())

#-----------------------------------------------
# AMF3 all data types
#-----------------------------------------------

envelope = Envelope(amfVersion=3)

message0 = Response({
    'undef': pyamf.Undefined,
    'none': None,
    'fls': False,
    'tru': True,
    'integer': 42,
    'dbl': 90.01,
    'str': 'sencha',
    'xmlDocument': xmlDocument,
    'date': datetime.date(2012, 12, 31),
    'array': [ 1, 2, 3 ],
    'obj': { 'a': 1, 'b': 2 },
    'xml': xmlDocument
})

message1 = Response({
    'text': 'hello'
})

envelope.headers['a'] = 'b';
envelope.headers['c'] = 'd';
envelope.headers['e'] = 'f';

envelope.__setitem__('message0', message0)
envelope.__setitem__('message1', message1)

stream = remoting.encode(envelope)

file = open('amf3-all.amf', 'w+')
file.write(stream.getvalue())

#-----------------------------------------------
# AMF3 recordset
#-----------------------------------------------

envelope = Envelope(amfVersion=3)

records = [
    { 'id': 1, 'name': 'Phil' },
    { 'id': 2, 'name': 'Don' },
    { 'id': 3, 'name': 'Kevin' }
] 

message = Response(records)

envelope.__setitem__('message', message);

stream = remoting.encode(envelope)

file = open('amf3-records.amf', 'w+')
file.write(stream.getvalue())