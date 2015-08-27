onload = function(){
	win.show();
	win.maximize();
}



var html;
var js;
var css;
var try1;
var i=0;


  	//codemirror info
    js = CodeMirror.fromTextArea(document.getElementById('jsyo'), {
        mode: "javascript",
        theme: 'monokai',
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true

    });


    html = CodeMirror.fromTextArea(document.getElementById('htmlyo'), {
        mode: "text/html",
        theme: 'monokai',
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true
    });
    


    css = CodeMirror.fromTextArea(document.getElementById('cssyo'), {
        mode: "text/css",
        theme: 'monokai',
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true
    });
    
    html.setSize("102%", "93vh");
    css.setSize("102%", "93vh");
    js.setSize("102%", "93vh");

    $('#css').click(function (e) {
		 $(this).tab('show');
		 css.refresh();
	});

	$('#js').click(function (e) {
		 $(this).tab('show');
		 js.refresh();
	})



	var iframe = document.getElementsByTagName('iframe')[0].contentWindow.document;
	var iframe_head = (iframe).getElementsByTagName('head')[0];
	var iframe_body = (iframe).getElementsByTagName('body')[0];

	//append style tag to hold custom styles
	iframe_style = (iframe_head).appendChild((iframe).createElement('style'));

	//append jQuery
	var jquery_script = (iframe).createElement('script');
	jquery_script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";
	(iframe_head).appendChild(jquery_script);

	var iframe_script = (iframe_head).appendChild((iframe).createElement('script'));



	








	var	contents = $('iframe').contents(),
		body = contents.find('body'),
		styleTag = $('<style></style>').appendTo(contents.find('head'));
		
		

		  	body.html(html.getValue());
		    styleTag.text(css.getValue());

		    iframe_script.textContent = '//<![CDATA['+"\n"+js.getValue()+"\n"+'//]]>';



		var css_default = "*{margin: 0 0 0 0}";

		html.on('change', function(html, change){
			body.html(html.getValue());
			
		});

		css.on('change', function(css, change){
			styleTag.text(css_default+css.getValue());

		});

		/*-------------------------------*/


	js.on('change', function(js, change){		
		update(js.getValue());
		body.html(html.getValue());
	});

	function update(str){
		iframe_head.removeChild(iframe_script);
		iframe_script = iframe_head.appendChild(iframe.createElement('script'));
		iframe_script.textContent = '//<![CDATA['+"\n"+str+"\n"+'//]]>';
	}


var conn;
var peer = new Peer({key: '5epsbpawj3df5hfr'});
var displayId;

peer.on('open', function(id){
	//pretty self explanatory
	displayId = id;
});



peer.on('connection', connect);

function connect(c){
	//doing the connection
	conn = c;
	console.log('connected!');

	conn.on('data', function(data){
		if(data[0]==0){
			html.setValue(data[1]);
		}
		else if(data[0]==1){
			css.setValue(data[1]);
		}
		else if(data[0]==2){
			js.setValue(data[1]);
		}
	});//end if else block
}

function submit(){
	var c = peer.connect(document.getElementById('otherid').value);
	c.on('open', function(){
		connect(c);
	});
}








html.on('keypress', function(instance, event){
	//
	window.setTimeout(function (){conn.send([0, html.getValue()]); }, 100);
		
});

css.on('keypress', function(instance, event){
	window.setTimeout(function (){conn.send([1, css.getValue()]); }, 100);
});

js.on('keypress', function(instance, event){
	window.setTimeout(function (){conn.send([2, js.getValue()]); }, 100);
});


    



function startconf(){
	document.getElementById('peerid').innerHTML = displayId;
}

