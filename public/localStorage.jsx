const getData = () => {
    const card = localStorage.getItem('card')
    if (card) {
        return JSON.parse(card)
    } return []
}

const saveData = (item) => {
    const saveProduct = JSON.stringify(item)
    localStorage.setItem('card', saveProduct)
}
const addData = (id) => {
    const card = getData();
    card.push(id)
    saveData(card)
}

const removeCard = (id) => {
    const card = getData()
    const filterValue = card.filter(p => p.id !== id)
    saveData(filterValue)
}

const editCard = (editedItem) => {
    const card = getData();
    const updatedCard = card.map(item => {
        if (item.id === editedItem.id) {
            return editedItem;
        }
        return item;
    });
    console.log(updatedCard)
    saveData(updatedCard);
}





export { addData, getData, removeCard, editCard }