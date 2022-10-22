function createRockElement(gridArr) { 
     for (let i = 0; i < 17; i++) {
         let mid = (size/2).toFixed();
        for (let j = 0; j < 17; j++) {
            if(j == mid && i==0){
                gridArr[[i]*[j]].classList.add(    'rock')
                gridArr[[i+1]*[j+1]].classList.add('rock')
                gridArr[[i+2]*[j]].classList.add(  'rock')
                gridArr[[i+2]*[j+1]].classList.add('rock')
                gridArr[[i+2]*[j+2]].classList.add('rock')
                gridArr[[i+2]*[j-3]].classList.add('rock')

            }else if (j==mid) {
                gridArr[[i]*[j]].classList.add(    'rock')
                gridArr[[i]*[j-1]].classList.add(  'rock')
                gridArr[[i]*[j-2]].classList.add(  'rock')
            }
        }
        
    }
} 

createRockElement()