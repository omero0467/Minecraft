function main () {
const size = 16
const grid = document.getElementById('gameBoard')
const axe = document.getElementById('axe')
const pickaxe = document.getElementById('pickaxe')
const shovel = document.getElementById('shovel')
let selectedTool = 'axe'
axe.addEventListener('click', (e)=>{
    selectedTool = 'axe'
    axe.classList.add('selected')
    shovel.classList.remove('selected')
    pickaxe.classList.remove('selected')
})
shovel.addEventListener('click', (e)=>{
    selectedTool = 'shovel' ;
    shovel.classList.add('selected')
    pickaxe.classList.remove('selected')
    axe.classList.remove('selected') 
})
pickaxe.addEventListener('click', (e)=>{
    selectedTool = 'pickaxe'
    pickaxe.classList.add('selected')
    axe.classList.remove('selected') 
    shovel.classList.remove('selected')
})
    function createGridItem(size) {
        for (let i = 0; i < size; i++) {
            for(let j=0; j< size; j++){
                let element = document.createElement("div");
                element.innerText = "";
                element.setAttribute("id", `gr${i}-${j}`);
                element.setAttribute("class", "grid-item");
                grid.appendChild(element);
                element.addEventListener("click", (e) => {
                    if(selectedTool === 'shovel'){
                        element.classList.remove('ground','grass')
                    } else if (selectedTool==='pickaxe') {
                        element.classList.remove('rock')
                    }else if (selectedTool==='axe') {
                        element.classList.remove('tree','leaves')
                    }
                });
            }
            }
    }
    createGridItem(size);

    let randomNum = randomNumHelper()

    function randomNumHelper() {
        return Math.floor(Math.random()*16)
    }

function fillCells () {
    const gridItems = document.querySelectorAll('.grid-item')
    for(let k =0; k<gridItems.length; k++) {
        let [i,j] = gridItems[k].getAttribute('id').slice(2).split('-')
        fillGround(k,i)
        fillGrass(k,i)
        fillTree(k,i,j)
        fillTreeCanopee(k,i,j)
    }
    function fillGround (k,i,j) {
        if (i>11) {
            gridItems[k].classList.add('ground')
        }
    }
    function fillGrass (k,i,j) {
        if (i==11) {
            gridItems[k].classList.add('grass')
        }
    }
    function fillTree (k,i,j) {
        if (7<i && i<11 && j == randomNum) {
            gridItems[k].classList.add('tree')
        }
    }
    function fillTreeCanopee (k,i,j) {
        if (3<i && i<8 && j == randomNum) {
            gridItems[k].classList.add('leaves')
            gridItems[k-1].classList.add('leaves')
            gridItems[k+1].classList.add('leaves')
            gridItems[k-2].classList.add('leaves')
            j==randomNum && i<7? gridItems[k-2].classList.add('leaves'):null
            j==randomNum && i<6? gridItems[k-2].classList.remove('leaves'):null
            j==randomNum && i<5? gridItems[k-1].classList.remove('leaves'):null
            gridItems[k+2].classList.add('leaves')
            j==randomNum && i<7? gridItems[k+2].classList.add('leaves'):null
            j==randomNum && i<6? gridItems[k+2].classList.remove('leaves'):null
            j==randomNum && i<5? gridItems[k+1].classList.remove('leaves'):null
        }
    }

    
}
    fillCells()
}

main();