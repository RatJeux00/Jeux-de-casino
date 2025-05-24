const barile = [0,1,2,3,4,5];

let balle = barile[Math.floor(Math.random() * barile.length)];
console.log(balle +1);

let conteur = 0 ;

function fire() {
    if (conteur == balle){
        console.log('mort');
    } else {
        balle -= 1;
        console.log("nest pas mort")
    }
};