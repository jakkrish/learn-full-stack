function template(item){
    return `<div class="row u-full-width" style="display:inline-block; border:1px solid #eee;padding: 15px;border-radius: 10px;">
    <div class="ten columns">${item.item}</div>
    <div class="two columns">
        <i data-id="${item._id}" id="edit-me" style="cursor:pointer;" class="material-icons">edit</i>
        <i data-id="${item._id}" id="delete-me" style="cursor:pointer;padding-left:30px;" class="material-icons">close</i>
    </div>
</div>`;
}

document.getElementById("add-form").addEventListener("submit",function(e){
    e.preventDefault();
    let newValue = document.getElementById("new-value");
    axios.post("/add-value",{text:newValue.value}).then(function(response){
        document.getElementById("list-container").insertAdjacentHTML("beforeend",template(response.data));
        newValue.value = "";
        newValue.focus();
    }).catch(function(){
        console.log("Something went wrong.");
    });
});

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