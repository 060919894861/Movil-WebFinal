import React from 'react';

const Widgets = ({ user }) => {
  return (
    <aside className="bg-white w-80 p-4">
      <div className="mb-4">
        {user ? (
          <p className="font-bold text-lg text-blue-500">Bienvenido, {user.name || user.email}</p>
        ) : (
          <p className="font-bold text-lg text-blue-500">Bienvenid@ Michell!!!</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar palabras en los tweets"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
    </aside>
  );
}

export default Widgets;



