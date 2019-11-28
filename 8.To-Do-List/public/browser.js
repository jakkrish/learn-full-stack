document.addEventListener("click",function(e){
    //Update Section
    if(e.target.id=="edit-me"){
        let oldValue = e.target.parentElement.parentElement.firstElementChild.innerHTML;
        let newValue = prompt("Edit below",oldValue);
        axios.post("/edit-value",{text:newValue,id:e.target.getAttribute("data-id")}).then(function(){
            if(newValue){
                e.target.parentElement.parentElement.firstElementChild.innerHTML = newValue;
            }
        }).catch(function(){
            console.log("Something went wrong.");
        });
    }

    //Delete Section
    if(e.target.id=="delete-me"){
        if(confirm("Do you really want to delete this item?")){
            axios.post("/delete-value",{id:e.target.getAttribute("data-id")}).then(function(){
                e.target.parentElement.parentElement.remove();
            }).catch(function(){
                console.log("Something went wrong.");
            });
        }
    }
});