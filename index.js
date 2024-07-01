const inputSlider = document.querySelector("[data-lengthslider]");
const lenghtDisplay = document.querySelector("[deta-length-entry]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copy-msg]");
const copyBtn = document.querySelector("[data-copy]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]")
const generatBtn = document.querySelector("[generator]");
const allCheckBox= document.querySelectorAll("input[type=checkbox]")
const symbols = '";:.,/?><][\|}{=-+_)(*&^%$#@!~`)}';

let password = "";
let passwordLength = 10;
let checkCount =0;
//set strngth color to grey
handleslider();
setindicator("#ccc");

function handleslider(){
    inputSlider.value =passwordLength ;
    lenghtDisplay.innerText = passwordLength ;

}
function setindicator(color){
    indicator.style.backgroundColor = color;
}
function getRndInteger(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
function calcStrebgth(){
    let hasuppr = false;
    let haslower = false;
    let hasnum = false;
    let hassyb = false;
    if(upperCaseCheck.checked) hasuppr= true;
    if(lowerCaseCheck.checked) haslower= true;
    if(numbersCheck.checked) hasnum= true;
    if(symbolsCheck.checked) hassyb= true;
    if(hasuppr&&haslower&&(hasnum||hassyb)&&passwordLength>=8){
        setindicator("#0f0");
    }
    else if((haslower||hasuppr)&&(hasnum||hassyb)&&passwordLength>=6){
        setindicator("#ff0");
    }
    else{
        setindicator("#f00");
    }
}
//to copy on clipboard we have nav.writeText method , clipboard.writeText aur ye promise return krega it either resoolves or gets rejected 
// if resolve{
//coppy securely}    use await to show copied text 
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    
    }
    catch(e){
        copyMsg.innerText = "failed";
    }
    //to  make copy vala span visible
    copyMsg.classList.add("active");
    setTimeout( ()=>{
        copyMsg.classList.remove("active")
    },2000);
}

function shufflePassword(shufflethis){
    //Fisher eats method
    for(let i = shufflethis.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = shufflethis[i];
        shufflethis[i]=shufflethis[j];
        shufflethis[j]= temp;
    }
    let str = "";
    shufflethis.forEach((el)=>(str+=el));
    return str;
}
   


function handleCheckboxechange(){
    checkCount =0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleslider();
    }
}


allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckboxechange);
})

inputSlider.addEventListener("input",(e)=>{
    passwordLength = e.target.value;
    handleslider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})



generatBtn.addEventListener("click",()=>{
    if(checkCount==0)return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleslider();
    }
    console.log("starting the journe");
    password="";
    // if(upperCaseCheck.checked){
    //     password+=generateUpperCase;
    // }
    // if(lowerCaseCheck.checked){
    //     password+=generateLowerCase;
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber;
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol;
    // }
    let funarr=[];
    if(upperCaseCheck.checked){
        funarr.push(generateUpperCase);
    }
    if(lowerCaseCheck.checked){
        funarr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funarr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funarr.push(generateSymbol);
    }
    //jaruri
    for(let i  =0;i<funarr.length;i++){
        password += funarr[i]();
    }

    console.log("compulsary don");
    console.log(" length"+funarr.length);
    //apni marji lelo ab
    for(let i =0;i<passwordLength-funarr.length;i++){
        let randinx = getRndInteger(0,funarr.length-1);
        console.log("randinx"+randinx)
        password+=funarr[randinx]();
    }
    console.log("faltu don");
    //password shuffle krdunga oura
    password = shufflePassword(Array.from(password));
    console.log("shufle don");
    passwordDisplay.value = password;
    console.log("display don");
    //strngth
    calcStrebgth();

})