let editingId = null;

const WISHLIST_KEY = "nevermiss-wishlist";


// ==============================
// STORAGE
// ==============================

function getWishlist() {

    const items = localStorage.getItem(WISHLIST_KEY);

    return items
        ? JSON.parse(items)
        : [];

}

function saveWishlist(items) {

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(items)
    );

}


// ==============================
// INITIALIZE WISHLIST
// ==============================

window.initializeWishlist = function () {

    console.log("Wishlist initialized");

    renderWishlist();

    const addButton =
        document.getElementById(
            "add-wishlist-button"
        );

    if (addButton) {

        addButton.onclick = function () {

            editingId = null;

            openAddWishlistModal();

        };

    }

};


// ==============================
// ADD / EDIT MODAL
// ==============================

function openAddWishlistModal(item = null) {

    if (typeof window.openModal !== "function") {

        console.error("openModal not found");

        return;

    }

    const editing = item !== null;

    window.openModal(

        editing
            ? "Edit Wishlist Item"
            : "Add Wishlist Item",

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

    setTimeout(() => {

        const saveButton =
            document.getElementById(
                "confirm-modal"
            );

        if (saveButton) {

            saveButton.onclick =
                saveWishlistItem;

        }

    }, 100);

}


// ==============================
// SAVE ITEM
// ==============================

function saveWishlistItem() {

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

    const items =
        getWishlist();

    if (editingId !== null) {

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

        }

        editingId = null;

    } else {

        items.push({

            id: Date.now(),

            title: title.value.trim(),

            price: price.value,

            category: category.value,

            purchased: false

        });

    }

    saveWishlist(items);

    renderWishlist();

    window.closeModal();

}

// ==============================
// RENDER
// ==============================

function renderWishlist() {

    const list =
        document.getElementById(
            "wishlist-list"
        );

    if (!list) {

        console.error(
            "wishlist-list not found"
        );

        return;

    }

    const items =
        getWishlist();

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

        const row =
            document.createElement("tr");

        row.dataset.id = item.id;

        if (item.purchased) {

            row.classList.add(
                "purchased"
            );

        }

        row.addEventListener(
            "click",
            function (e) {

                if (
                    e.target.classList.contains(
                        "wishlist-check"
                    )
                ) {

                    return;

                }

                openEditItem(item.id);

            }
        );

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

// ==============================
// EDIT ITEM
// ==============================

function openEditItem(id) {

    const items =
        getWishlist();

    const item =
        items.find(
            item => item.id === id
        );

    if (!item) {

        return;

    }

    editingId = id;

    openAddWishlistModal(item);

}


// ==============================
// DELETE ITEM
// ==============================

function deleteItem() {

    if (editingId === null) {

        return;

    }

    const confirmDelete =
        confirm(
            "Delete this item?"
        );

    if (!confirmDelete) {

        return;

    }

    const items =
        getWishlist().filter(
            item => item.id !== editingId
        );

    saveWishlist(items);

    editingId = null;

    renderWishlist();

    window.closeModal();

}