import { getEvent, deleteItem } from "../js/api.js"; // Importamos funciones

export function createListComponent(onEdit){
    // crea una lista de los elementos de la bd
    const container = document.createElement('div');
    container.innerHTML = '<h2>User List</h2>';
    const listEL = document.createElement('ul');
    container.appendChild(listEL);

    async function loadItems() {
        try{
            const items = await getEvent(); // Obtiene los eventos de la bd
            listEL.innerHTML = '';

            if(items.length == 0){
                listEL.innerHTML = '<li>There are no records</li>';
                return;
            }

            items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                ID:<strong>${item.id}</strong>
                Name:<strong>${item.name}</strong>
                Email:<strong>${item.email}</strong>
                Phone:<strong>${item.phone}</strong>
                EnrollNumber:<strong>${item.enrollNumber}</strong>
                dateOfEvent:<strong>${item.dateOfEvent}</strong>
                <button data-edit="${item.id}"><img src="./src/img/lapiz.png"></button>
                <button data-delete="${item.id}">img src="./src/img/basura.png"></button>
                `;
                listEL.appendChild(li);
            });

            // Evento para el boton editar
            listEL.querySelectorAll('button[data-edit]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.dataset.edit);
                    onEdit(id);
                });
            });

            // Evento para el boton de eliminar
            listEL.querySelectorAll('button[data-delete]').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const id = parseInt(btn.dataset.delete);
                    if(confirm('Are you sure you want to delete the user??')){
                        try{
                            await deleteItem(id);
                            loadItems();
                        } catch (err) {
                            alert(`Alert when deleting item`);
                        }
                    }
                });
            });
        } catch (err) {
            listEL.innerHTML = '<li>Error loading data</li>';
            console.error(err);
        }
    }

    loadItems();

    return{
        element : container,
        reload : loadItems,
    };
};