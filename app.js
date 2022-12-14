const start = document.getElementById('start') 
const startContainer = document.querySelector('.startContainer') 
start.addEventListener('click', (e)=>{
    startContainer.classList.add('hidden')
    main()
    
})

function main() {
    const closeBtn = document.getElementById('close')
    const reset = document.getElementById('reset')
    const grid = document.getElementById('gameBoard')
    const inventory = {
        grass: 0,
        leaves: 0,
        tree: 0,
        ground: 0,
        rock: 0,
    }
    const overlayBp = document.getElementById('overlay')
    const backpack =  document.getElementById('backpack').children
    const size = 16
    const axe = document.getElementById('axe')
    const pickaxe = document.getElementById('pickaxe')
    const shovel = document.getElementById('shovel')
    let selectedTool = ''
    const docInventory = document.getElementById('inventory')
    //Tools ------------------------------------
    axe.addEventListener('click', (e) => {
        selectedTool = 'axe'
        axe.classList.add('selected')
        shovel.classList.remove('selected')
        pickaxe.classList.remove('selected')
    })
    shovel.addEventListener('click', (e) => {
        selectedTool = 'shovel';
        shovel.classList.add('selected')
        pickaxe.classList.remove('selected')
        axe.classList.remove('selected')
    })
    pickaxe.addEventListener('click', (e) => {
        selectedTool = 'pickaxe'
        pickaxe.classList.add('selected')
        axe.classList.remove('selected')
        shovel.classList.remove('selected')
    })
    //Board---------------------------------------
    function createGridItem(size) {
    for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
    let element = document.createElement("div");
    element.innerText = "";
    element.setAttribute("id", `gr${i}-${j}`);
    element.setAttribute("class", "grid-item");
    grid.appendChild(element);
    // Tools Funcionality-----------------------------------
    // element.addEventListener("click", (e) => {
    //     if (selectedTool === 'shovel') {
    //         element.classList.remove('ground', 'grass')
    //     } else if (selectedTool === 'pickaxe') {
    //         element.classList.remove('rock')
    //     } else if (selectedTool === 'axe') {
    //         element.classList.remove('tree', 'leaves')
    //     }
    // });
    }
    }
    }
    // --????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    createGridItem(size);

    let randomNum = randomNumHelper()
    function randomNumHelper() {
        return Math.floor(Math.random() * size)
    }
    function selected(el) {
       
        el.classList.add('selected')
            // el.nextElementSibling.classList.remove('selected')
            // el.previousElementSibling.classList.remove('selected')
        
    }

    //Board Elements-----------------------------------
    const gridItems = document.querySelectorAll('.grid-item')
    function fillCells() {
        for (let k = 0; k < gridItems.length; k++) {
            let [i, j] = gridItems[k].getAttribute('id').slice(2).split('-')
            fillGround(k, i)
            fillGrass(k, i)
            fillTree(k, i, j)
            fillTreeCanopee(k, i, j)
            if (k > 166) { fillRocks(k, i, j) }
        }
        // Ground  ------------------------------------------------------
        function fillGround(k, i, j) {
            if (i > 11) {
                gridItems[k].classList.add('ground')
            }
        }
        // Grass  ------------------------------------------------------
        function fillGrass(k, i, j) {
            if (i == 11) {
                gridItems[k].classList.add('grass')
            }
        }
        // Tree  ------------------------------------------------------
        function fillTree(k, i, j) {
            if (7 < i && i < 11 && j == randomNum) {
                gridItems[k].classList.add('tree')
            }
        }
        // Tree Leaves ------------------------------------------------------
        function fillTreeCanopee(k, i, j) {
            if (3 < i && i < 8 && j == randomNum) {
                gridItems[k].classList.add('leaves')
                gridItems[k - 1].classList.add('leaves')
                gridItems[k + 1].classList.add('leaves')
                gridItems[k - 2].classList.add('leaves')
                j == randomNum && i < 7 ? gridItems[k - 2].classList.add('leaves') : null
                j == randomNum && i < 6 ? gridItems[k - 2].classList.remove('leaves') : null
                j == randomNum && i < 5 ? gridItems[k - 1].classList.remove('leaves') : null
                gridItems[k + 2].classList.add('leaves')
                j == randomNum && i < 7 ? gridItems[k + 2].classList.add('leaves') : null
                j == randomNum && i < 6 ? gridItems[k + 2].classList.remove('leaves') : null
                j == randomNum && i < 5 ? gridItems[k + 1].classList.remove('leaves') : null
            }
        }
        // Rocks------------------------------------------------------
        function fillRocks(k, i, j) {
            for (let i = 0; i < size; i++) {
                let random = randomNumHelper()
                if (j == random && i > 11)
                    gridItems[k].classList.add('rock')
            }
        }
    }
    fillCells()

    // Inventory------------------------------------------------------
    let selectedFromInventory = ''
    function updateDocInventory() {
     for (let element of backpack) {
        if (element.classList.contains('rock')) {
            element.innerText = `${inventory.rock}`
        }
        else if (element.classList.contains('ground')) {
            element.innerText = `${inventory.ground}`
        }
        else if (element.classList.contains('grass')) {
            element.innerText = `${inventory.grass}`
        }
        else if (element.classList.contains('tree')) {
            element.innerText = `${inventory.tree}`
        }
        else if (element.classList.contains('leaves')) {
            element.innerText = `${inventory.leaves}`
        }
     }
    }
    
    grid.addEventListener('click', e=>{
        if(selectedFromInventory.length>0 && selectedTool===''&& inventory[selectedFromInventory]>0){
            e.target.classList.add(selectedFromInventory)
            inventory[selectedFromInventory]--
            updateDocInventory()
        }
        if(e.target.classList.contains('rock') && selectedTool =='pickaxe'){ 
            e.target.classList.remove('rock')
            inventory.rock++
            updateDocInventory()
        }
        else if(e.target.classList.contains('grass') && selectedTool =='shovel'){ 
            e.target.classList.remove('grass')
            inventory.grass++
            updateDocInventory()
        }
        else if(e.target.classList.contains('ground') && selectedTool =='shovel'){ 
            e.target.classList.remove('ground')
            inventory.ground++
            updateDocInventory()
        }
        else if(e.target.classList.contains('leaves') && selectedTool =='axe' ){ 
            e.target.classList.remove('leaves')
            inventory.leaves++
            updateDocInventory()
        }
        else if(e.target.classList.contains('tree')&& selectedTool =='axe'){ 
            e.target.classList.remove('tree')
            inventory.tree++ 
            updateDocInventory()
        }
        
    })
    // BackPack------------------------------------------------------
    closeBtn.addEventListener('click', ()=>{
        overlayBp.classList.toggle('hidden')
    })
    docInventory.addEventListener('click', ()=>{
        overlayBp.classList.remove('hidden')
    })
    
    function backpackSelect() {
        for (let el of backpack) {
            el.addEventListener('click',()=>{
                overlayBp.classList.toggle('hidden')
                selectedFromInventory = el.getAttribute('class')
                selectedTool=''
            })}
    }
    backpackSelect()
    reset.addEventListener('click', ()=>{
    grid.childNodes.forEach(element => {
        element.classList.remove('rock','tree','ground','grass','leaves')
    });
    // inventory.grass =0
    // inventory.leaves =0
    // inventory.tree =0
    // inventory.rock =0
    // inventory.ground =0
    // updateDocInventory()
        main()
    })
    
}
