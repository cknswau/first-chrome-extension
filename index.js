
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const clearBtn = document.getElementById("clear-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")

inputBtn.addEventListener("click", function() {
    // onclick add new input value to myLeads array
    myLeads.push(inputEl.value)
    inputEl.value = ""
    render(myLeads)
})

clearBtn.addEventListener("dblclick", function() {
    // dblclick to delete all from localStorage and myLeads array
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let activeTab = tabs[0].url
        let activeTabId = activeTab.id
        myLeads.push(activeTab)
        render(myLeads)        
    })
})

function getStorage() {
    // get localStorage of JSON myLeads array
    myLeads = JSON.parse(localStorage.getItem("myLeads"))
    if (myLeads === null) { myLeads = [] }
    render(myLeads)
}

function storeLead() {
    // Store new JSON stringify myLeads array in localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
}

function render(e) {
    // render to the html, the current myLeads array
    let listItems = ""
    for ( let i = 0; i < e.length; i++ ) {
        listItems += `<li><a href=${e[i]} target=_blank>${e[i]}</a></li>`
    }
    ulEl.innerHTML = listItems
    storeLead()
}

// on page load get myLeads string from localStorage and store in myLeads array
getStorage()