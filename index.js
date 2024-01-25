let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const saveLinks = JSON.parse(localStorage.getItem("myLeads"))
const deleteBtn = document.getElementById("delete-btn")
const saveTab = document.getElementById("saveTab")
const closeTab = document.getElementById("close-btn")


if (saveLinks) {
    myLeads = saveLinks
    render()
}

deleteBtn.addEventListener("click", function(event) {
    if (event.detail === 2) {
        localStorage.clear();
        myLeads = [];
        render();
    } else {
        if (myLeads.length > 0) {
            myLeads.pop();
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render();
        }
    }
});

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render()

})


saveTab.addEventListener("click", function(){ 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })

})

closeTab.addEventListener("click", function(){
    window.close();
})

function render() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems  
}