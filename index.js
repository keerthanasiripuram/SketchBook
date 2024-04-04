const canvas =document.getElementById("canvas")
canvas.width=window.innerWidth-100
canvas.height=400

let context=canvas.getContext("2d")
let start_background_color="white"
context.fillStyle=start_background_color
context.fillRect(0,0,canvas.width,canvas.height)

let draw_color="black"
let draw_width=1
var is_drawing=false
let restore_array=[]
let index=-1
var isDragging = false;
var offsetX, offsetY;
var textX=100;
var textY=150
var text = "Drag me!";
var textSize = 20;
var textColor = "#000";
var s=""
var fontstyle="Calibra"
//canvas.addEventListener("touchstart",start,false)
//canvas.addEventListener("touchmove",draw,false)
canvas.addEventListener("mousedown",start,false)
canvas.addEventListener("mousemove",draw,false)

//canvas.addEventListener("touchend",stop,false)
canvas.addEventListener("mouseup",stop,false)
canvas.addEventListener("mouseout",stop,false)
const canvasDownload=document.getElementById("canvasDownload")
function start(event)
{   
    
    if (isDragging && event.type=='mousedown') {

        var mouseX=event.clientX-canvas.offsetLeft
        var mouseY=event.clientY-canvas.offsetTop

        context.fillStyle='grey'
        context.fillRect(mouseX, mouseY, 40, 20);

        setTimeout(()=>
        {   
            
            input=prompt("Enter text")
            console.log(input)
            text_drag(mouseX,mouseY,input);
        },100)
        return;
    }
    is_drawing=true;
    context.beginPath()
    context.moveTo(event.clientX-canvas.offsetLeft,
    event.clientY-canvas.offsetTop)
    var mouseX = event.clientX - canvas.offsetLeft
    var mouseY = event.clientY - canvas.offsetTop
        
        
    
    event.preventDefault()
}

function draw(event)
{
    console.log(is_drawing,isDragging)
    if(is_drawing)
    {
        console.log("65")
        context.lineTo(event.clientX-canvas.offsetLeft,
        event.clientY-canvas.offsetTop)
        context.strokeStyle=draw_color
        console.log(40,draw_color,(+draw_width))        
        context.lineWidth=(+draw_width);
        context.lineCap="round"
        context.stroke()
        const pngDataUrl=canvas.toDataURL("image/png")
        canvasDownload.href=pngDataUrl
    }
    /*if(isDragging){
        console.log("80")
        var mouseX=event.clientX-canvas.offsetLeft
       var mouseY=event.clientY-canvas.offsetTop
        context.strokeRect(mouseX, mouseY, 40, 20);
        textX = mouseX - offsetX;
        textY = mouseY - offsetY;

        text_drag(mouseX,mouseY);
        isDragging=false;
        is_drawing=false
    }*/
    
}

function stop(event)
{   
    isDragging = false;
    if(is_drawing)
    {
        context.stroke()
        context.closePath()
        is_drawing=false;
    }
    event.preventDefault()
    if(event.type!='mouseout')
    {
        restore_array.push(context.getImageData(0,0,canvas.width,canvas.height))
        index+=1
    }
    console.log(restore_array)
}

function clear_canvas()
{
    context.fillStyle=start_background_color
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillRect(0,0,canvas.width,canvas.height)

    restore_array=[]
    index-=1
}
function undo()
{
    if(index<=0)
    {
        clear_canvas()
    }
    else{
        index-=1
        restore_array.pop()
        context.putImageData(restore_array[index],0,0)
    }
}
const reader = new FileReader()
const img=new Image()
const uploadImage=(e)=>
{
reader.onload=()=>
{
    img.onload=()=>
    {
        context.drawImage(img,0,0)
    }
    img.src=reader.result;
}
reader.readAsDataURL(e.target.files[0])
}
const imageloader=document.getElementById("uploader")
imageloader.addEventListener("change",uploadImage)

let id=document.getElementById("text")
console.log(id)
id.addEventListener('click',trial)
function trial(event)
{
    isDragging=true;
    is_drawing=false;
    console.log(isDragging,is_drawing)
    draw(event)
}
/*function enterText()
{
    s=prompt("Enter text")
    console.log(s)
    //let mouseposx = event.clientX - canvas.getBoundingClientRect().left;
        //let mouseposy= event.clientY - canvas.getBoundingClientRect().top;
        console.log(mouseX,mouseY)
        text_drag(s,mouseX,mouseY)
}*/

function text_drag(mouseposx,mouseposy,input)
{
    
    context.fillStyle=draw_color
    context.font = draw_width + `px ${fontstyle}`;
    context.fillText(input,mouseposx,mouseposy)
    context.fillStyle=start_background_color
    context.clearRect(mouseposx, mouseposy, 40, 20);
    context.fillRect(mouseposx,mouseposy,40,20)
    context.strokeStyle='transparent'
}

function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
    console.log("heeeeello")
  }
  
  function selectFontStyle(fontStyle) {
    fontstyle=fontStyle

    console.log("Selected font style: " + fontStyle);
    document.getElementById("myDropdown").classList.toggle("close");
  }