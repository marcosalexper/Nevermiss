let wishlistItems = [];

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


    const items =
        getWishlist();



    items.push(item);



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



};




// ==============================
// ADD ITEM MODAL
// ==============================


function openAddWishlistModal(){



    if(
        typeof window.openModal !== "function"
    ){

        console.error(
            "openModal não existe"
        );


        return;

    }




    window.openModal(

        "Add Wishlist Item",


        `


        <label>
            Item
        </label>


        <input
            id="wishlist-title"
            type="text"
        >



        <label>
            Price
        </label>


        <input
            id="wishlist-price"
            type="number"
        >



        <label>
            Category
        </label>


        <input
            id="wishlist-category"
            type="text"
        >



        `


    );



    setTimeout(()=>{


        const saveButton =
            document.getElementById(
                "confirm-modal"
            );



        if(saveButton){


            saveButton.onclick =
                saveWishlist;



        }



    },100);



}






// ==============================
// SAVE ITEM
// ==============================


function saveWishlist(){



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




    if(

        !title.value.trim()

    ){


        alert(
            "Enter item name."
        );


        return;


    }





    const item = {


        id:
            Date.now(),


        title:
            title.value.trim(),


        price:
            price.value,


        category:
            category.value,


        purchased:false


    };




    saveWishlistItem(item);



    renderWishlist();



    window.closeModal();


}







// ==============================
// RENDER
// ==============================


function renderWishlist(){


    const list =
        document.getElementById(
            "wishlist-list"
        );



    if(!list){

        console.error(
            "wishlist-list não encontrado"
        );

        return;

    }



    const items =
        getWishlist();



    list.innerHTML = "";




    if(items.length === 0){


        list.innerHTML = `

            <tr>

                <td colspan="3">

                    No wishlist items.
                    Add your first item.

                </td>

            </tr>

        `;


        return;

    }





    items.forEach(item=>{


        const row =
            document.createElement(
                "tr"
            );



        row.innerHTML = `


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