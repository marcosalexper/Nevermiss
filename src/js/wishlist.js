let wishlistItems = [];
let editingId = null;

const WISHLIST_KEY = "nevermiss-wishlist";



// ==============================
// STORAGE
// ==============================


function getWishlist(){


    const items =
        localStorage.getItem(
            WISHLIST_KEY
        );


    return items
        ? JSON.parse(items)
        : [];


}



function saveWishlistItem(item){


const items = getWishlist();

if(editingId){

    const index =
        items.findIndex(i => i.id === editingId);

    items[index] = {

        ...items[index],

        title: title.value.trim(),

        price: price.value,

        category: category.value

    };

    editingId = null;

}else{

    items.push({

        id: Date.now(),

        title: title.value.trim(),

        price: price.value,

        category: category.value,

        purchased:false

    });

}

saveWishlist(items);

renderWishlist();

closeModal();



    localStorage.setItem(

        WISHLIST_KEY,

        JSON.stringify(items)

    );


}




// ==============================
// INITIALIZE WISHLIST
// ==============================


window.initializeWishlist = function(){


    console.log(
        "Wishlist inicializada"
    );


    renderWishlist();



    const addButton =
        document.getElementById(
            "add-wishlist-button"
        );



    if(addButton){



        addButton.onclick = function(){



            openAddWishlistModal();



        };


    }

    const deleteButton =
    document.getElementById("delete-item");

if(deleteButton){

    deleteButton.onclick = function(){

        deleteItem();

    };

}



};




// ==============================
// ADD ITEM MODAL
// ==============================


function openAddWishlistModal(item = null){

    if(typeof window.openModal !== "function"){

        console.error("openModal não existe");

        return;

    }

    const editing = item !== null;

    window.openModal(

        editing ? "Edit Wishlist Item" : "Add Wishlist Item",

        `

        <label>
            Item
        </label>

        <input
            id="wishlist-title"
            type="text"
            value="${editing ? item.title : ""}"
        >

        <label>
            Price
        </label>

        <input
            id="wishlist-price"
            type="number"
            value="${editing ? item.price : ""}"
        >

        <label>
            Category
        </label>

        <input
            id="wishlist-category"
            type="text"
            value="${editing ? item.category : ""}"
        >

        

        `

    );

    setTimeout(()=>{

        const saveButton =
            document.getElementById("confirm-modal");

        if(saveButton){

            saveButton.onclick = saveWishlist;

        }

    },100);

}




        console.error(
            "openModal não existe"
        );


 


// ==============================
// SAVE ITEM
// ==============================


function saveWishlist() {

    const title =
        document.getElementById(
            "wishlist-title"
        );

    const price =
        document.getElementById(
            "wishlist-price"
        );

    const category =
        document.getElementById(
            "wishlist-category"
        );

    if (!title.value.trim()) {

        alert("Enter item name.");

        return;

    }

    if (editingId !== null) {

        const items = getWishlist();

        const index =
            items.findIndex(
                item => item.id === editingId
            );

        if (index !== -1) {

            items[index] = {

                ...items[index],

                title: title.value.trim(),

                price: price.value,

                category: category.value

            };

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(items)
            );

        }

        editingId = null;

    } else {

        const item = {

            id: Date.now(),

            title: title.value.trim(),

            price: price.value,

            category: category.value,

            purchased: false

        };

        saveWishlistItem(item);

    }

    renderWishlist();

    window.closeModal();

}






// ==============================
// RENDER
// ==============================


function renderWishlist() {

    const list =
        document.getElementById("wishlist-list");

    if (!list) {

        console.error("wishlist-list não encontrado");

        return;

    }

    const items = getWishlist();

    list.innerHTML = "";

    if (items.length === 0) {

        list.innerHTML = `

            <tr>

                <td colspan="4">

                    No wishlist items.
                    Add your first item.

                </td>

            </tr>

        `;

        return;

    }

    items.forEach(item => {

        const row = document.createElement("tr");

        row.dataset.id = item.id;

        if (item.purchased) {

            row.classList.add("purchased");

        }

        // Clique na linha para editar
        row.addEventListener("click", function (e) {

            // Não abre edição ao clicar no checkbox
            if (e.target.classList.contains("wishlist-check")) {

                return;

            }

            openEditItem(item.id);

        });

        row.innerHTML = `

            <td class="check-column">

                <input
                    type="checkbox"
                    class="wishlist-check"
                    data-id="${item.id}"
                    ${item.purchased ? "checked" : ""}
                >

            </td>

            <td>

                ${item.title}

            </td>

            <td>

                $ ${item.price || "0"}

            </td>

            <td>

                ${item.category || "No category"}

            </td>

        `;

        list.appendChild(row);

    });

}

function openEditItem(id){

    const items = getWishlist();

    const item = items.find(i => i.id === id);

    if(!item)
        return;

    editingId = id;

    openAddWishlistModal(item);

}

function deleteItem(){

    if(editingId === null)
        return;

    if(!confirm("Delete this item?"))
        return;

    let items = getWishlist();

    items =
        items.filter(item => item.id !== editingId);

    saveWishlist(items);

    editingId = null;

    renderWishlist();

    closeModal();

}