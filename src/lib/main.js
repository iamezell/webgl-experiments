define(['game','jQuery'], function(game) {

	 var canvas = null, glProgram = null, fragmentShader = null,
  vertexShader = null,
  vertexPositionAttribute = null,
  trianglesVerticeBuffer = null;
  var canvas = document.getElementById("game");
  // now lets get the context
  var glCtx = canvas.getContext && canvas.getContext("experimental-webgl");
  // find out if theere is a mobile device?

	var initialize = function ()
  {


    var handleResize = function(){
      var w = window.innerWidth, h = window.innerHeight, newDim;

      // make sure the content is bigger than the page .
      if(w <= maxWidth && touchDevice){

        $("#container").css({height: h * 2});

      }
      window.scrollTo(0, 1);

      // get the height again scrollTo may have changed its setting

      h = window.height;
    }

    if(!glCtx){
    			// no 2d context available, let the user know
    			alert("Please update your browser");
    		}else{
    			// setInterval(startGame, 30);
          alert("we have a webgl context");

        setupWebgl();
        initShaders();
        setupBuffers();
        drawScene();
      }


//////////////////////////////////////////////end/////////////////////////////////////////////////////////////////////////////
};

function setupWebgl(){
  glCtx.clearColor(0.1, 0.5, 0.1, 1.0);
  glCtx.clear(glCtx.COLOR_BUFFER_BIT);
}
function makeShader(src, type)
{
  //compile the vertex shader
  var shader = glCtx.createShader(type);
  glCtx.shaderSource(shader, src);
  glCtx.compileShader(shader);
  if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
    alert("Error compiling shader: " + glCtx.getShaderInfoLog(shader));
  }
  return shader;
}



function initShaders(){
  var fs_source = document.getElementById('shader-fs').innerHTML;
  var vs_source = document.getElementById('shader-vs').innerHTML;

  //compile shaders
  vertexShader = makeShader(vs_source, glCtx.VERTEX_SHADER);
  fragmentShader = makeShader(fs_source, glCtx.FRAGMENT_SHADER);
  //create program
  glProgram = glCtx.createProgram();
  //attach and link shaders to the program
  glCtx.attachShader(glProgram, vertexShader);
  glCtx.attachShader(glProgram, fragmentShader);
  glCtx.linkProgram(glProgram);
  if (!glCtx.getProgramParameter(glProgram, glCtx.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }
  //use program
  glCtx.useProgram(glProgram);


}

function setupBuffers(){
  var triangleVertices = [
//left triangle
-0.5, 0.5, 0.0,
0.0, 0.0, 0.0,
-0.5, -0.5, 0.0,
//right triangle
0.5, 0.5, 0.0,
0.0, 0.0, 0.0,
0.5, -0.5, 0.0
];
trianglesVerticeBuffer = glCtx.createBuffer();
glCtx.bindBuffer(glCtx.ARRAY_BUFFER, trianglesVerticeBuffer);
glCtx.bufferData(glCtx.ARRAY_BUFFER, new Float32Array(triangleVertices), glCtx.STATIC_DRAW);

}

function drawScene(){
  vertexPositionAttribute = glCtx.getAttribLocation(glProgram,"aVertexPosition");
  glCtx.enableVertexAttribArray(vertexPositionAttribute);
  glCtx.bindBuffer(glCtx.ARRAY_BUFFER, trianglesVerticeBuffer);
  glCtx.vertexAttribPointer(vertexPositionAttribute, 3, glCtx.FLOAT, false, 0, 0);
  glCtx.drawArrays(glCtx.TRIANGLES, 0, 6);

}

  	initialize();
  	

})