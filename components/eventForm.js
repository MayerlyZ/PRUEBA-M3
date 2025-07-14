import { createEvent, updateEvent, getEventById } from '../js/api.js';
import { getCurrentUser } from '../js/auth.js';

export function createEventFormComponent({ onSubmit, mode = 'read', event = null } = {}) {
  const currentUser = getCurrentUser();
  const isAdmin = currentUser && currentUser.role === 'admin'; // Verifica rol 
  const isEditMode = (mode === 'edit' || mode === 'create') && isAdmin; // Verifica si el formulario debe de estar en modo edicion

  // Creacion del formulario 
  const container = document.createElement('div');
  container.innerHTML = `
    <h3>${isEditMode ? (mode === 'create' ? 'Create Event' : 'Edit Event') : 'View Event'}</h3>
    <form id="eventForm">
      <input type="text" id="title" placeholder="Título" value="${event.title || ''}" ${isEditMode ? '' : 'disabled'} required>
      <textarea id="description" placeholder="Descripción" ${isEditMode ? '' : 'disabled'} required>${event?.description || ''}</textarea>
      <input type="date" id="startDate" placeholder="Fecha del evento" value="${event?.startDate || ''}" ${isEditMode ? '' : 'disabled'} required>
      <input type="text" id="capacity" placeholder="Capacity" value="${event?.capacity || ''}" ${isEditMode ? '' : 'disabled'} required>
      ${isEditMode ? '<button type="submit">Save</button>' : ''}
    </form>
  `;

    //Referencias a los campos del form
  const form = container.querySelector('#eventForm');
  const titleInput = container.querySelector('#title');
  const descriptionInput = container.querySelector('#description');
  const startDateInput = container.querySelector('#startDate');
  const capacityInput = container.querySelector('#capacity');
  const message = container.querySelector('#formMessage');

  let editinId = event?.id || null; // si es null estamos agregando un curso y si no es null estamos editanto el curso con el id correspondiente

  if (isEditMode) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Referencia a los valores de los campos del form
      const title = titleInput.value.trim();
      const description = descriptionInput.value.trim();
      const startDate = startDateInput.value.trim();
      const capacity = capacityInput.value.trim();

        // Valida que todos los campos esten llenos
      if (!title || !description || !startDate || !capacity) {
        message.textContent = 'All fields are required';
        return;
      }

      // Si editinId pasa algun valor actualiza el evento, si no pasa ningun valor crea un nuevo evento
      try {
        const data = { title, description, startDate, capacity };
        if (editinId) {
          await updateEvent(editinId, data);
          message.textContent = 'Event updated successfully';
        // Si pasa null agrega el evento
        } else {
          await createEvent(data);
          message.textContent = 'Successfully created event';
        }
    
        // Reseteo de valores y de form
        form.reset();
        editinId = null;
        if (onSubmit) onSubmit();
      } catch (error) {
        console.error(error);
        message.textContent = error.message || 'Error saving event';
      }
    });
  }

  // Carga los datos al formulario
  async function loadEvent(id) {
    try {
      const item = await getEventById(id);
      if (item) {
        titleInput.value = item.title;
        descriptionInput.value = item.description;
        startDateInput.value = item.startDate;
        capacityInput.value = item.capacity;
        editinId = item.id;
        message.textContent = isAdmin ? `Editing event ID: ${item.id}` : `Viewing event ID: ${item.id}`;
      } else {
        message.textContent = 'Event not found';
      }
    } catch (error) {
      console.error(error);
      message.textContent = error.message || 'Error loading event data';
    }
  }

  return { element: container, loadEvent };
}