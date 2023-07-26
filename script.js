const myTable = document.getElementById("myTable");
let currentCell;;
let cutCell={};


let tr = document.createElement("tr");
myTable.append(tr);
let th = document.createElement("th");
th.id = "blankCell";
tr.appendChild(th);
for(let col=0;col<26;col++){
    let th = document.createElement("th");
    th.innerText = String.fromCharCode(col+65);
    tr.appendChild(th);
}

for(let row=1;row<=100;row++){
    let tr = document.createElement("tr");
    myTable.append(tr);

    // Adding blank cell front of A
    let th =  document.createElement("th");
    th.innerText = row;
    tr.appendChild(th);
    
    // Adding blank cells
    for(let col=0;col<26;col++){
        let td = document.createElement("td");
        td.setAttribute('contenteditable','true');
        td.setAttribute('id',`${String.fromCharCode(col+65)}${row}`)
        tr.appendChild(td);

        td.addEventListener("input",function(e){
            updateMatrix(e.target);
        })

        td.addEventListener("focus",function(e){
            document.getElementById("blankCell").innerText = `${String.fromCharCode(col+65)}${row}`
            currentCell = e.target;
        })
    }
}

let matrix = new Array(100);
for(let row=0;row<100;row++){
    matrix[row] = new Array(26);
}
// console.log(matrix);

function updateMatrix(){
    let tempObj = {
        style:currentCell.style.cssText,
        text:currentCell.innerText,
        id:currentCell.id,
    }
    let id = currentCell.id;
    console.log(currentCell.style);
    matrix[id.substr(1)-1][id[0].charCodeAt(0)-65] = tempObj;
}
(document.getElementById("btnBold")).addEventListener("click",function(){
    if(currentCell.style.fontWeight == 'bold'){
        currentCell.style.fontWeight = 'normal';
    }else{
        currentCell.style.fontWeight = 'bold';
    }
    updateMatrix();
});
(document.getElementById("btnItalic")).addEventListener("click",function(){
    if(currentCell.style.fontStyle == 'italic'){
        currentCell.style.fontStyle = 'normal';
    }else{
        currentCell.style.fontStyle = 'italic';
    }
    updateMatrix();
});
(document.getElementById("btnUnderline")).addEventListener("click",function(){
    if(currentCell.style.textDecoration == 'underline'){
        currentCell.style.textDecoration = 'none';
    }else{
        currentCell.style.textDecoration = 'underline';
    }
    updateMatrix();
});
(document.getElementById("fSize")).addEventListener("change",function(e){
    currentCell.style.fontSize = `${e.target.value}px`;
    updateMatrix();
});
(document.getElementById("font")).addEventListener("change",function(e){
    currentCell.style.fontFamily = `${e.target.value}`;
    updateMatrix();
});
(document.getElementById("btnLeft")).addEventListener("click",function(){
    currentCell.style.textAlign = "left";
    updateMatrix();
});
(document.getElementById("btnCenter")).addEventListener("click",function(){
    currentCell.style.textAlign = "center";
    updateMatrix();
});
(document.getElementById("btnRight")).addEventListener("click",function(){
    currentCell.style.textAlign = "right";
    updateMatrix();
});
(document.getElementById("iColor")).addEventListener("input",function(e){
    currentCell.style.color = e.target.value;
    document.getElementById("color").style.color= e.target.value;
    updateMatrix();
});
(document.getElementById("ibColor")).addEventListener("input",function(e){
    currentCell.style.backgroundColor = e.target.value;
    document.getElementById("bcolor").style.color= e.target.value;
    updateMatrix();
});
(document.getElementById("btnCopy")).addEventListener("click",function(){
    cutCell.style = currentCell.style.cssText;
    cutCell.text = currentCell.innerText;
});
(document.getElementById("btnCut")).addEventListener("click",function(){
    cutCell.style = currentCell.style.cssText;
    cutCell.text = currentCell.innerText;
    currentCell.innerText = "";
    updateMatrix();
});
(document.getElementById("btnPaste")).addEventListener("click",function(){
    currentCell.style.cssText = cutCell.style;
    currentCell.innerText = cutCell.text;
    updateMatrix();
});
(document.getElementById("btnDownload")).addEventListener("click",function(){
    let matrixString = JSON.stringify(matrix);

    let blob = new Blob([matrixString],{type:'application/json'});
    let a = document.createElement('a');
    a.download = 'Excel.json';
    console.log(URL.createObjectURL(blob));
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
(document.getElementById("btnUpload")).addEventListener("click",function(e){
    e.target.style.display = 'none';
    document.getElementById("iFile").style.display = "block";
});
(document.getElementById("iFile")).addEventListener("input",function(event){
    const file = event.target.files[0]
    if(file){
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e){
            const fileContent = e.target.result;
            try{
                matrix = JSON.parse(fileContent);
                matrix.forEach(function(row){
                    row.forEach(function(cell){
                        if(cell.id){
                            let cellToBeEdited = document.getElementById(cell.id);
                            cellToBeEdited.innerText = cell.text;
                            cellToBeEdited.style.cssText = cell.style;
                        }
                    })
                })
            }catch(err){
                console.log(err);
            }
        }
    }
})
