//image width and height
const i_width = 8;
const i_height = 5;

// container for storing whole grid
const container = document.querySelector('.container');
// history object
let history_arr = [];
let history_idx=0;

function createImgs(w, h) {
    /*Function create whole field and retur all img objects*/
    x = 0; //value to increment
    y = 0; //-------||-------
    
    while (x < h) {
        //create row to store imgs in row
        row = document.createElement("div");
        row.class = "row";
        
        while (y < w) {
            //create img elem. and append to row
            img = new Image();
            img.src = "ng_0.png";
            img.id= "x:" + x + " y:" + y;
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
        return "no-action"
        
    }else {
        change_to = curr_selector;
    }
    //add event to history and increment history_idx
    to_history=[this,current_img];
    history_arr[history_idx]=(to_history);
    history_idx++;
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
// createImgs and store them
const imgs = createImgs(i_width, i_height);


const selectors = createSelectors();


function historyChange(change_to){
    if (history_arr.length<1) {
        return
    }
    if (change_to=="F") {
        if (history_idx<history_arr.length) {
            f_obj = history_arr[history_idx][0];
            f_idx = history_arr[history_idx][1];
            history_idx++;
            //console.log("history_idx ++")
        }else{
            history_idx=history_arr.length;
        }
    }
    if (change_to=="B") {
        if(history_idx >0){
            f_obj = history_arr[history_idx][0];
            f_idx = history_arr[history_idx][1];
            history_idx--;
            //console.log("history_idx --")
        }else{
            return;
        }
    }
    
    //console.log("history_arr: ", history_arr,"history_idx: " + history_idx,"f_obj.id: " + history_arr[history_idx][0].id);

    //console.log(change_to+" clicked "+f_obj.id+" "+f_idx);
    changeImgHist(f_obj, f_idx);
    
}

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