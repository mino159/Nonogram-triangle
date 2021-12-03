//image width and height
const i_width = 5;
const i_height = 5;

let field=[]
// container for storing whole grid
const container = document.querySelector('.container');
// history object
let history_arr = [];
let history_idx=0;

/*

creating images and field

*/

function createImgs(w, h) {
    /*Function create whole field and retur all img objects*/
    x = 0; //value to increment
    y = 0; //-------||-------
    
    while (x < h) {
        //create row to store imgs in row
        row = document.createElement("div");
        row.class = "row";
        field.push([]);
        while (y < w) {
            //create img elem. and append to row
            field[x].push(0);
            img = new Image();
            img.src = "ng_0.png";
            img.id= "x:" + x + " y:" + y;
            img.xcoor=x;
            img.ycoor=y;
            addStyling(img)
            img.addEventListener("click",changeImg)
            img.addEventListener("dragstart",changeImg)
            img.addEventListener("dragenter",changeImg)
            row.appendChild(img);
            y++;
        }
        //append row to the container
        container.appendChild(row);
        y = 0;
        x++;
    }
    console.log(field);
    return document.querySelectorAll(".container img");
}

function addStyling(img){
    if (y===0) {
        img.classList.add("y0")
    }
    if (x===0) {
        img.classList.add("x0")
    }
    if ((y+1)%5===0) {
        img.classList.add("y5")
    }
    if ((x+1)%5===0) {
        img.classList.add("x5")
    }

}

/*

Handling game functions

*/

function getImgIdx(str_img_src) {
    /* helper function to get image index*/
    return parseInt(str_img_src.slice(-5, -4));
}

function changeImg() {
    // big function to change imgs need to split
    curr_sel_obj = document.querySelector('.selected');
    var curr_selector = getImgIdx(curr_sel_obj.src);
    var current_img = getImgIdx(this.src);
    
    if (curr_selector == 7) {
        var next = current_img +1;
        if (next > 6) {
            next = 0;
        }
        change_to = next;
        
    } else if(curr_selector==current_img){
        return "no-action";
        
    }else {
        change_to = curr_selector;
    }
    //add event to history and increment history_idx
    to_history=[this,current_img];
    history_arr[history_idx]=(to_history);
    history_idx++;
    //console.log("history_idx ++");
    field[this.xcoor][this.ycoor]=change_to;
    //finally change src image
    this.src = "ng_"+change_to+".png";
}

function changeImgHist(object_img,idx) {
    //change image by saved history 
    //console.log("history change, id,idx", object_img.id, idx);
    history_arr[history_idx]=[object_img,getImgIdx(object_img.src)]
    //change src image
    object_img.src = "ng_"+idx+".png";
    return;
}

function createSelectors() {
    selector_cont = document.querySelector(".selector");
    for (var i = 0; i <= 7; i++) {
        new_sel=new Image();
        new_sel.id = i;
        new_sel.src="ng_"+i+".png";
        new_sel.addEventListener("click",selectorClicked);

        
        if (i===1) {
            new_sel.classList.add("selected");
        }
        selector_cont.appendChild(new_sel);
    }
    
    return document.querySelectorAll(".selector img");
}

function selectorClicked() {
    selected = document.querySelector(".selected");
    selected.classList.remove("selected");
    this.classList.add("selected");
}

function historyChange(change_to){
    if (history_arr.length<1) {
        return
    }
    if (change_to=="F") {
        if (history_idx<history_arr.length) {
            history_idx++;
            //console.log("history_idx ++");
        }else{
            history_idx=history_arr.length;
        }
    }
    if (change_to=="B") {
        if(history_idx >0){
            history_idx--;
            //console.log("history_idx --");
        }else{
            history_idx=0;
        }
    }
    
    //console.log("history_arr: ", history_arr,"history_idx: " + history_idx,"f_obj.id: " + history_arr[history_idx][0].id);
    f_obj = history_arr[history_idx][0];
    f_idx = history_arr[history_idx][1];
    history_arr[history_idx]=[f_obj,getImgIdx(f_obj.src)];
    //console.log(change_to+" clicked "+f_obj.id+" "+f_idx);
    field[f_obj.xcoor][f_obj.ycoor]=f_idx;
    changeImgHist(f_obj, f_idx);
}

function addHorNums(numHor) {
    for (character in numHor) {
        img = new Image
        //TODO
    }
}

function showNums(numHor,numVer) {
    addHorNums(numHor)
    addVerNums(numVer)
}

function getNums(num_arr) {
    //count numbers of array correctly
    //num_arr = [ 0, 3, 1, 2, 0 ]
    //return = "/3\"
    to_return=""
    for (let i = 0; i < num_arr.length; i++) {
        num = num_arr[i];
        if (num!==0) {
            //TODO
        }

        
    }
}

function getRow(idx){
    row=field[idx];
    return getNums(row);
}

function getCol(idx){
    var col=[];
    for (i = 0; i < i_height; i++) {
        col= field[i][idx];
    }
    return getNums(col);
}


function saveState() {
    var numHor = "";
    var numVer = "";

    for (num = 0; num < i_height; num++) {
        numHor += getRow(num)+",";
    };
    for (num = 0; num < i_width; num++) {
        numVer += getCol(num)+",";
    }

    showNums(numHor,numVer);

}

function createMenu(){
menu = document.getElementById("menu");

btn_back = new Image();
btn_back.src = "ng_back.png";
//btn_back.disabled=true;
menu.appendChild(btn_back);

btn_front = new Image();
btn_front.src = "ng_front.png";
menu.appendChild(btn_front);

btn_back.addEventListener("click", historyChange.bind(null,"B"));

btn_front.addEventListener("click", historyChange.bind(null,"F"));

btn_save = new Image();
btn_save.src = "ng_save.png";
btn_save.addEventListener("click",saveState);
menu.appendChild(btn_save);
}

// createImgs and store them

const imgs = createImgs(i_width, i_height);


const selectors = createSelectors();

createMenu();

var numHor = "/3\,/1||1||1\,|2||2|,\1||1||1/,\3/";
var numVer = "/3\,/1||1||1\,|2||2|,\1||1||1/,\3/";

showNums(numHor, numVer);