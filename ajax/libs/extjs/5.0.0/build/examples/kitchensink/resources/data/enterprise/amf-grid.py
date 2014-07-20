# coding=utf-8
# This script generates records in AMF0 and AMF3 format for the amf-grid example
# and saves the data as amf0-pangrams.amf and amf-3-pangrams.amf
from pyamf import remoting
from pyamf.remoting import Envelope
from pyamf.remoting import Response

records = [{
    "language": "Danish",
    "text": "Quizdeltagerne spiste jordbær med fløde, mens cirkusklovnen Wolther spillede på xylofon"
}, {
    "language": "German",
    "text": "Falsches Üben von Xylophonmusik quält jeden größeren Zwerg"
}, {
    "language": "Greek",
    "text": "Γαζέες καὶ μυρτιὲς δὲν θὰ βρῶ πιὰ στὸ χρυσαφὶ ξέφωτο"
}, {
    "language": "English",
    "text": "The quick brown fox jumps over the lazy dog"
}, {
    "language": "Spanish",
    "text": "El pingüino Wenceslao hizo kilómetros bajo exhaustiva lluvia y frío, añoraba a su querido cachorro",
}, {
    "language": "French",
    "text": "l'île exiguë Où l'obèse jury mûr Fête l'haï volapük, Âne ex aéquo au whist, Ôtez ce vœu déçu"
}, {
    "language": "Irish Gaelic",
    "text": "D'fhuascail Íosa, Úrmhac na hÓighe Beannaithe, pór Éava agus Ádhaimh"
}, {
    "language": "Hungarian",
    "text": "Árvíztűrő tükörfúrógép"
}, {
    "language": "Icelandic",
    "text": "Kæmi ný öxi hér ykist þjófum nú bæði víl og ádrepa"
}, {
    "language": "Japanese (Hiragana)",
    "text": "いろはにほへとちりぬるを わかよたれそつねならむ うゐのおくやまけふこえて あさきゆめみしゑひもせす"
}, {
    "language": "Japanese (Katakana)",
    "text": "イロハニホヘト チリヌルヲ ワカヨタレソ ツネナラム ウヰノオクヤマ ケフコエテ アサキユメミシ ヱヒモセスン"
}, {
    "language": "Hebrew",
    "text": "דג סקרן שט בים מאוכזב ולפתע מצא לו חברה איך הקליטה"
}, {
    "language": "Polish",
    "text": "Pchnąć w tę łódź jeża lub ośm skrzyń fig"
}, {
    "language": "Russian",
    "text": "В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!"
}] 

def write_envelope(version, filename):
    envelope = Envelope(amfVersion=version)
    message = Response(records)
    envelope.__setitem__('message', message);
    stream = remoting.encode(envelope)
    file = open(filename, 'w+')
    file.write(stream.getvalue())

write_envelope(0, 'amf0-pangrams.amf')
write_envelope(3, 'amf3-pangrams.amf')