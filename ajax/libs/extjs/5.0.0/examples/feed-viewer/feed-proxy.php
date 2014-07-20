<?php
// this is an example server-side proxy to load feeds
$feed = $_REQUEST['feed'];
if ($feed != '' && strpos($feed, 'http') === 0) {
    header('Content-Type: text/xml');
    $xml = file_get_contents($feed);

    // Clean up our own RSS feeds
    if (strPos($feed, 'feeds.feedburner.com/extblog') || strPos($feed, 'sencha.com/forum')) {
        // Cut out extraneous whitespace to aid in checking for existing CDATA tags below
        $xml = preg_replace('/[\\n\\r]/', '', $xml);
        $xml = preg_replace('/>\s+</', '><', $xml);

        // Make textual items XML safe by enclosing them with CDATA sections unless it's already been done
        $xml = preg_replace('/<title>(?!<\\!\\[CDATA\\[)/',         '<title><![CDATA[', $xml);
        $xml = preg_replace('/([^\\]][^\\]][^>])<\\/title>/',       '$1]]></title>', $xml);
        $xml = preg_replace('/<author>(?!<\\!\\[CDATA\\[)/',        '<author><![CDATA[', $xml);
        $xml = preg_replace('/([^\\]][^\\]][^>])<\\/author>/',      '$1]]></author>', $xml);
        $xml = preg_replace('/<description>(?!<\\!\\[CDATA\\[)/',   '<description><![CDATA[', $xml);
        $xml = preg_replace('/([^\\]][^\\]][^>])<\\/description>/', '$1]]></description>', $xml);
        $xml = preg_replace('/<link>(?!<\\!\\[CDATA\\[)/',          '<link><![CDATA[', $xml);
        $xml = preg_replace('/([^\\]][^\\]][^>])<\\/link>/',        '$1]]></link>', $xml);
    }

    $xml = str_replace('<content:encoded>', '<content>', $xml);
    $xml = str_replace('</content:encoded>', '</content>', $xml);
    $xml = str_replace('</dc:creator>', '</author>', $xml);
    echo str_replace('<dc:creator', '<author', $xml);
    return;
}
