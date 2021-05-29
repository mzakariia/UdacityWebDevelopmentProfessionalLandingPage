/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
 let navItems;
 let toTopAnchor;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNav(){
    let navElements = document.createDocumentFragment();
    for(let i=1;true;i++){ // iterate till a null is reached
        if( document.getElementById("section"+i)!==null){
            const li = document.createElement("li");
            li.id="li"+i;
            li.className="menu__link"
            li.innerHTML=`<a href="#section${i}">Section ${i}</a>`;// list item inner html
            navElements.appendChild(li);
            document.getElementById("navbar__list").appendChild(navElements);
        }
        else{
            break;
        }
    }
}


// Add class 'active' to section when near top of viewport

function setActive(){
    for(let i=1;true;i++){ // iterates over sections
        const section= document.getElementById("section"+i); //gets section for this iteration
        if(section===null){
            break;  
        }
        else{
            const topPosition= section.getBoundingClientRect().top; // obtains pixels from the top of the element to the top of the viewport
            const bottomPosition = section.getBoundingClientRect().bottom; // obtains pixels from the bottom of the element to the top of the viewport
            if(section.classList.contains("active")){ // checks if section is active
                // if yes checks if it should be active, if its bottom is less than 25% of the 
                //screen height away from the top of the viewing port then it should be inactive 
                if(bottomPosition< window.innerHeight*0.5 || topPosition>window.innerHeight*0.5){ 
                    section.classList.remove("active");
                    navItems[i-1].firstChild.classList.remove("active");
                }
            }
            else{
                // inactive sections should be set to active if the top of 
                //the element from the viewport is less than 50% of the viewport height & greater than 0
                // or if the bottom of the element is greater than 50% of the viewport height and
                // less than viewport height
                if((topPosition<window.innerHeight*0.5 && topPosition>0)|| 
                (bottomPosition>window.innerHeight*0.5 && bottomPosition<window.innerHeight)){ 
                    section.classList.add("active");                                                                                                      
                    navItems[i-1].firstChild.classList.add("active");
                }
            }
        }
    }
} 

// Scroll to anchor ID using scrollTO event

function scrollTO(anchor){ // takes navigation list anchor tag as input
    let targetId= anchor.getAttribute("href"); // gets href value
    let target= document.getElementById(targetId.substring(1,targetId.length)); //substring to remove the '#' then get target element
    target.scrollIntoView({behavior:"smooth"}); // scroll target into view
    console.log(target);
    console.log(targetId);
    
}

 

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
navItems=document.querySelectorAll("#navbar__list li");
for(const navItem of navItems){
    navItem.addEventListener('click',function(event){
        event.preventDefault();
        scrollTO(navItem.firstChild);
    });
}
// Set sections as active
document.addEventListener('scroll',function(){
    setActive();
}); 


// Scroll to top anchor at the bottom of the page
toTopAnchor= document.getElementById("toTop");
toTopAnchor.addEventListener('click', function(event){
    event.preventDefault();
    console.log(toTopAnchor);
    scrollTO(toTopAnchor);
})


