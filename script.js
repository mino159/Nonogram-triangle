print = console.log

const numAll="422,362320,442435,325432022320,012010332422445,430035410410,420012322,022320332440,355035340,010420025010,010432320030,010485,010010010,422,010;224,024330,014360,025234,320320344,010210020025030,010014225224,014010010320010,220224020034,224224225320220,034224340,325220035010,010024330030,325265,010010".split(";")
//const numAll="\\2\\,/6\\/2|,\\4\\\\3/,/2/\\3\\|2\\/2|,|1\\|1|/3\\\\2\\\\4/,\\3||3/\\1|\\1|,\\2||1\\/2\\,|2\\/2|/3\\\\4|,/5/|3//4|,|1|\\2||2/|1|,|1|\\3\\/2||3|,|1|\\8/,|1||1||1|,\\2\\,|1|;\\2\\,-2\\/3-,-1\\/6-,-2/\\3\\,/2-/2-/4\\,-1-\\1--2--2/-3-,-1--1\\\\2/\\2\\,-1\\-1--1-/2--1-,\\2-\\2\\-2--3\\,\\2\\\\2\\\\2//2-\\2-,-3\\\\2\\/4-,/2/\\2--3/-1-,-1--2\\/3--3-,/2/\\6/,-1--1-".split(";")

var numHor = numAll[0].split(",")
var numVer = numAll[1].split(",")

//image width and height

function getMaxLen(arr){
    max_length=0;
    numHor.forEach(num => {if (max_length<num.length){max_length=num.length}});
    return max_length;
}
const f_maxHor = getMaxLen(numHor);
const f_maxVer = getMaxLen(numVer);
const f_width  = numHor.length + f_maxHor;
const f_height = numVer.length + f_maxVer;
const i_width  = numHor.length;
const i_height = numVer.length;

numHorForm = []
numVerForm = []
numVerFormTemp = []
for(row in numHor) {numHorForm[row]=numHor[row].padStart(f_maxHor)};
for(row in numVer) {numVerFormTemp[row]=numVer[row].padStart(f_maxVer)};
for(col of Array(f_maxVer).keys()) {
    numVerForm[col]=""
    for (row of numVerFormTemp){
        if (row[col]!==undefined){
            numVerForm[col] += row[col]
        } else{
            numVerForm[col] += " ";
        }
    }
};

let field = Array(i_height).fill("0".repeat(i_width));
// container for storing whole grid
const container = document.querySelector('.container');
// history object
let history_arr = [];
let history_idx = 0;

/*

creating images and field

*/

function printField(){
    string="";
    field.forEach(row =>{
        for (char of row){
            string+=char+" "
        }
        string+="\n"
    });
    print(string)
}
function printFullField(){
    string="";
    full_field.forEach(row =>{
        for (char of row){
            string+=char+" "
        }
        string+="\n"
    });
    print(string)
}

function createFullField(){
    array_full = Array(f_height).fill("-".repeat(f_width))
    for (i_row in array_full){
        idx = parseInt(i_row)
        if (idx<f_maxVer){
            array_full[idx] = " ".repeat(f_maxHor) + numVerForm[i_row]
        } else {
            array_full[idx] = numHorForm[i_row-f_maxVer] + field[i_row-f_maxVer]
         }
        
    }
    return array_full
}

function setObjNum(x,y){
    numFromField = full_field[x][y]
    if (((x-1)%3===0 & x<f_maxHor) || ((y-1)%3===0 & y<f_maxVer)){
        obj = document.createElement("div");
        obj.style.width="30px";
        obj.textContent = numFromField
        obj.style.backgroundImage = "ng_none.png"
    }else{
        obj = new Image()
        obj.id = x+":"+y;    
        obj.src = "ng_" + numFromField + ".png";
        obj.add
    }
    if (numFromField === " "){
        obj.src = "ng_none.png";
    }
    obj.xcoor = x;
    obj.ycoor = y;
    return obj
}

function setImgObj(x,y){
    // x  -= f_maxHor
    // y  -= f_maxVer
    img = new Image()
    img.src = "ng_" + full_field[x][y] + ".png";
    img.id = x + ":" + y;
    img.addEventListener("click", changeImg);
    img.addEventListener("dragstart", changeImg);
    img.addEventListener("dragenter", changeImg);
    img.xcoor = x;
    img.ycoor = y;
    addStyling(img);
    return img
}

function setObj(x,y) {
    obj= new Image()
    obj.src = "ng_none.png"
    obj.xcoor = x;
    obj.ycoor = y;
    if (x>f_maxHor-1 & y>f_maxVer-1){
        //if it's in actual field
        obj=setImgObj(x,y)
        addStyling(obj)
    }else if (x<f_maxHor & y<f_maxVer){
        //if it's empty
        obj = document.createElement("div");
        obj.style.width="30px"
    } else if (x<f_maxHor || y<f_maxVer){
        obj=setObjNum(x,y)
    }
    return obj
    
}


function createImgs(w, h) {
    /*Function create whole field and retur all img objects*/
    x = 0; //value to increment
    y = 0; //-------||-------

    while (x < h) {
        //create row to store imgs in row
        row = document.createElement("div");
        row.id="row"+x;
        while (y < w) {
            //create img elem. and append to row
            row.appendChild(setObj(x,y));
            y++;
        }
        //append row to the container
        container.appendChild(row);
        y = 0;
        x++;
    }
    // console.log(field);
    // return document.querySelectorAll(".container img");
}

function addStyling(img) {
    if (img.ycoor === 0) {
        img.classList.add("y0");
    }
    if (img.xcoor === 0) {
        img.classList.add("x0");
    }
    if ((img.ycoor+1)%5 === 0) {
        img.classList.add("y5");
    }
    if ((img.xcoor+1)%5 === 0) {
        img.classList.add("x5");
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

    } else if (curr_selector == current_img) {
        return "no-action";

    } else {
        change_to = curr_selector;
    }
    //add event to history and increment history_idx
    to_history = [this,
        current_img];
    history_arr[history_idx] = (to_history);
    history_idx++;
    //console.log("history_idx ++");
    full_field[this.xcoor][this.ycoor] = change_to;
    //finally change src image
    this.src = "ng_"+change_to+".png";
}

function changeImgHist(object_img, idx) {
    //change image by saved history
    //console.log("history change, id,idx", object_img.id, idx);
    history_arr[history_idx] = [object_img,
        getImgIdx(object_img.src)];
    //change src image
    object_img.src = "ng_"+idx+".png";
    return;
}

function createSelectors() {
    selector_cont = document.querySelector(".selector");
    for (var i = 0; i <= 7; i++) {
        new_sel = new Image();
        new_sel.id = i;
        new_sel.src = "ng_"+i+".png";
        new_sel.addEventListener("click", selectorClicked);


        if (i === 1) {
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

function historyChange(change_to) {
    if (history_arr.length < 1) {
        return;
    }
    if (change_to == "F") {
        if (history_idx < history_arr.length) {
            history_idx++;
            //console.log("history_idx ++");
        } else {
            history_idx = history_arr.length;
        }
    }
    if (change_to == "B") {
        if (history_idx > 0) {
            history_idx--;
            //console.log("history_idx --");
        } else {
            history_idx = 0;
        }
    }

    //console.log("history_arr: ", history_arr,"history_idx: " + history_idx,"f_obj.id: " + history_arr[history_idx][0].id);
    f_obj = history_arr[history_idx][0];
    f_idx = history_arr[history_idx][1];
    history_arr[history_idx] = [f_obj,
        getImgIdx(f_obj.src)];
    //console.log(change_to+" clicked "+f_obj.id+" "+f_idx);
    full_field[f_obj.xcoor][f_obj.ycoor] = f_idx;
    changeImgHist(f_obj, f_idx);
}

function showHorNums(numHor) {
    test= document.getElementById("test");
    for (const row_i in numHor) {
        var this_row = document.getElementById("row"+row_i)
        for (const x in numHor[row_i]){
            if ((x-1)%3!==0){
                img = new Image();
                img.src = "ng_num_"+numHor[row_i][x]+".png";
                this_row.appendChild(img)
            }else{
                var div = document.createElement("div")
                div.textContent=numHor[row_i][x]
                this_row.appendChild(div)
            }
        }
        test.append(this_row)
    }
}

function showVerNums(numVer){
    test= document.getElementById("test");
    for (const col_i in numVer) {
        var this_row = document.getElementById("row"+row_i)
        for (const x in numHor[row_i]){
            if ((x-1)%3!==0){
                img = new Image();
                img.src = "ng_num_"+numHor[row_i][x]+".png";
                this_row.appendChild(img)
            }else{
                var div = document.createElement("div")
                div.textContent=numHor[row_i][x]
                this_row.appendChild(div)
            }
        }
        test.append(this_row)
    }
}

function showNums(numHor, numVer) {
    showHorNums(numHor);
    showVerNums(numVer);
}
/*
function getNums(num_arr) {
    //count numbers of array correctly
    //num_arr = [ 0, 3, 1, 2, 0 ]
    //return = "/3\"
    to_return = "";
    rec_count = 0;
    started = false;
    all_zero_row=(Array(num_arr.length).fill(0))
    if (num_arr==all_zero_row) {
        return "|0|"
    }
    for (let i = 0; i < num_arr.length; i++) {
        let num = num_arr[i];
        if (num === 6) { 
            num = 0;
        }

        if (started === false & num===0) {
            continue
        }
        if (num !== 0) {
            rec_count++;
            if (num===1){
                continue
            }
            switch (num) {
                case 2:
                    if (started === true){
                        to_return = rec_count;
                        to_return += "\\"
                    } else {
                        
                    }
                    break;
                case 3:
                    if (started === true) {
                        
                    }
                default:
                    break;
            }
            if (num==2){
                
            }
            if ([2,4].includes(num)) {

                //2 and 4 return \
                to_return += "\\";
            } else {
                //3 and 5 return /
                to_return +="/";
            }
            started = true;
        }
        
    }
    console.log(to_return);
    return to_return;
}

function getRow(idx) {
    row = field[idx];
    return getNums(row);
}

function getCol(idx) {
    var col = [];
    for (i = 0; i < i_height; i++) {
        col = field[i][idx];
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
    //clearField()

    showNums(numHor, numVer);

}*/

function createMenu() {
    menu = document.getElementById("menu");

    btn_back = new Image();
    btn_back.src = "ng_back.png";
    //btn_back.disabled=true;
    menu.appendChild(btn_back);

    btn_front = new Image();
    btn_front.src = "ng_front.png";
    menu.appendChild(btn_front);

    btn_back.addEventListener("click", historyChange.bind(null, "B"));

    btn_front.addEventListener("click", historyChange.bind(null, "F"));
/*
    btn_save = new Image();
    btn_save.src = "ng_save.png";
    btn_save.addEventListener("click", saveState);
    menu.appendChild(btn_save);*/
}

    // createImgs and store them

    var full_field= createFullField()
    const imgs = createImgs(f_width, f_height);


    const selectors = createSelectors();

    createMenu();

    // showNums(numHor, numVer);