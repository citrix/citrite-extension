//console.log("loaded replace.js");

function clickable_links() {

    // see https://learn.jquery.com/using-jquery-core/avoid-conflicts-other-libraries/
    // this solves the problem of breaking Podio
    jQuery(function($){

    $('body *').linkify();

    $('body *').replaceText( /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})/gi, '<a href="mailto:$1">$1</a>' ); // valid email addresses
    $('body *').replaceText( /((https?|ftp):\/\/[^\s\/$.?#,\(\)].[^\s,]*)/gi, '<a href="$1">$1</a>' ); // complete urls

/*<>jQuery('body *').replaceText( /\\\\(([A-Z0-9])([^\s,]*)\.(com|be|co\.uk|net|org|edu|gov|ca|de|fr|us|ru|ch|it|nl|se|no|es|ly|am)([^\s,\(\)]*))/gi, '<a href="file://$1">\\\\$1</a>' ); // incomplete urls
*/

    $('body *').replaceText( /(^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$)/gi, '<a href="http://$1">$1</a>' ); // incomplete urls
/*
    jQuery('body *').replaceText( /(((www.)?)([A-Z0-9])([^\s,]*)\.(com|be|co\.uk|net|org|edu|gov|ca|de|fr|us|ru|ch|it|nl|se|no|es|ly|am)([^\s,\(\)]*))/gi, '<a href="http://$1">$1</a>' ); // incomplete urls
*/
//<>jQuery('body *').replaceText( /((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))/gi, '<a href="http://$1">$1</a>' ); // ip addresses

    $('body *').replaceText( /((?!:[\w])(SR)[#\s]+\d{8})/g, '<a href="http://oses.citrite.net:8080/OracleSES/siebel.do?serviceRequestNbr=$1">$1</a>' );

    $('body *').replaceText( /(\n=================\<br\/\>\n\d{8})/mg, '<a href="http://oses.citrite.net:8080/OracleSES/siebel.do?serviceRequestNbr=$1">$1</a>' );

/*
  how to get list of projects from jira:
  select array_to_string(array(select pkey from project order by pkey),'|');
*/

    $('body *').replaceText( /((?!:[\w])(CF|CA|CP|CR|JC|EA|DO|EXT|PR|PGM|SOM|TC|TR|WP|XRT|IT|XOP|SCTX|HFP|HFX)-\d+)/g, '<a href="https://issues.citrite.net/browse/$1">$1</a>' );
    $('body *').replaceText( /(BUG|TSK)(\d{7,9})/g, '<a href="http://onebug.citrite.net/tmtrack/tmtrack.dll?IssuePage&RecordId=$2&Template=view&TableId=1000">$1$2</a>' );
    $('body *').replaceText( /((?!:[\w])(XSO)-\d+)/g, '<a href="https://bugs.xensource.org/browse/$1">$1</a>' );
    $('body *').replaceText( /((?!:[\w])(SR)-\d+)/g, '<a href="http://wsjira.citrite.net//browse/$1">$1</a>' );
    $('body *').replaceText( /((?!:[\w])(ACER|AFRL|AMD|AMZ|AT|AVTM|BCH|BET|BIT|BR|BRO|CANL|CAR|CC|CER|CHE|CIS|CRD|CSC|CXD|CYB|DELL|DOC|EGEN|EMC|EMX|ER|FE|FUJ|GEMT|HCL|HDX|HIDG|HIT|HP|HUA|IBM|INTC|INTX|ISV|JAXC|LSI|LSIN|MAR|MLX|MS|MTHA|MTIT|NCSC|NEC|NETAPP|NIC|NICS|NTGR|NVHP|NVIDIA|NXS|ORCL|OSX|PC|QL|RAX|SCTXI|SF|SLS|SRVT|SS|STAR|STRA|SYN|TESCO|TST|UGIS|VRTA|XCAMD|XCEHP|XCEN|XCHP|XCSUP|XCT|XCWGP|XDELL|XHP|XSB|XWS|ZLIT|ZZ)-\d+)/g, '<a href="https://tracker.citrix.com/browse/$1">$1</a>' );

    $('body *').replaceText( /((?!:[\w])(JSP)-\d+)/g, '<a href="https://support.atlassian.com/browse/$1">$1</a>' );

    });

}

clickable_links();
