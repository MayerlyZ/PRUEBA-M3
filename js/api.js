import { getCurrentUser } from "./auth.js";
const API_URL = 'http://localhost:3000';

// Funciones para users

// Funcion para obtener todos los datos de la API
export async function getUsers(){
    const res = await fetch(`${API_URL}/users`);
    if(!res.ok) throw new Error('Error getting users');
    return await res.json();
};

// Funcion para obtener un dato por id
export async function getElementById(id) {
    const res = await fetch(`${API_URL}/users/${id}`);
    if(!res.ok) throw new Error('User not found');
    return await res.json();
}

// Funcion para crear un nuevo usuario
export async function createItem(data) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Only admins can create users');
    }
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data),
    });
    if(!res.ok) throw new Error('Error creating user');
    return await res.json();
}

// Funcion para actualizar por id un usuario
export async function updateItem(id, data) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Only admins can update users');
    }
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Error updating user');
    return await res.json();
}

// Funcion para eliminar por id
export async function deleteItem(id) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Only admins can delete users');
    }
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'Delete',
    });
    if(!res.ok) throw new Error('Error deleting user');
    return await res.json();
}

// Funciones para eventos

// Funcion para obtener los eventos
export async function getEvent(){
    const res = await fetch(`${API_URL}/events`);
    if(!res.ok) throw new Error('Event not found');
    return await res.json();
};

// Funcion para obtener un evento por id
export async function getEventById(id) {
    const res = await fetch(`${API_URL}/events/${id}`);
    if(!res.ok) throw new Error('Event not found');
    return await res.json();
}

// Funcion para crear un nuevo evento
export async function createEvent(data) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Only admins can create events');
    }
    const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data),
    });
    if(!res.ok) throw new Error('Error al crear evento');
    return await res.json();
}

// Funcion para actualizar por id un evento
export async function updateEvent(id, data) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Only admins can update events');
    }
    const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Error updating events');
    return await res.json();
}

// Funcion para eliminar un evento por id
export async function deleteEvent(id) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Only admins can delete events');
    }
    const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'Delete',
    });
    if(!res.ok) throw new Error('Error deleting event');
    return await res.json();
}

// Funciones para Enrollments

export async function enrollInEvent(userId, eventId) {
    const user = getCurrentUser();
    if(!user || user.role == 'userId') {
        throw new Error('You can only book with your account');
    }
    const res = await fetch(`${API_URL}/enrollments`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({ userId: parseInt(userId), eventId: parseInt(eventId) }),
    });
    if(!res.ok) throw new Error('Error booking the event');
    return await res.json();
}

export async function getEnrollmentsByUser(userId) {
    const res = await fetch(`${API_URL}/enrollments?userId=${userId}`);
    if(!res.ok) throw new Error('Error getting reserved events');
    return await res.json();
}